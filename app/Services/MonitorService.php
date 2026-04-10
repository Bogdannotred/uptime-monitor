<?php

namespace App\Services;

use App\Models\Service;
use App\Models\CheckLog;
use App\Notifications\ServiceDownNotification;
use Illuminate\Support\Facades\DB;


class MonitorService
{

    public function processBulkResults(array $results): void
    {
        $logData = [];
        $serviceUpdates = [];
        $alerts = [];
        $now = now();

        foreach($results as $result){
            $service = $result['service'];
            $newStatus = $result['is_up'] ? 'up' : 'down';
            $logData[] = [
                'service_id'    => $service->id,
                'status_code'   => $result['status_code'],
                'response_time' => $result['duration'],
                'is_online'     => $result['is_up'],
                'created_at'    => $now
            ];

            $serviceUpdates[] = [
                'id'              => $service->id,
                'name'            => $service->name,
                'url'             => $service->url, 
                'user_id'         => $service->user_id, 
                'status'          => $newStatus,
                'last_checked_at' => $now,
            ];

            if ($service->status !== 'unknown' && $service->status !== $newStatus) {
                $alerts[] = ['service' => $service, 'is_up' => $result['is_up']];
            }
        }

        DB::transaction(function () use ($logData, $serviceUpdates) {
            CheckLog::insert($logData);
            Service::upsert($serviceUpdates, ['id'], ['status', 'last_checked_at']);
        });

        foreach ($alerts as $alert) {
            $this->sendAlert($alert['service'], $alert['is_up']);
        }
    }

    public function sendAlert(Service $service, bool $isUp): void
    {
        $service->user->notify(new ServiceDownNotification($service, $isUp)); 
    }


    public function destroy(Service $service): bool
    {
        return $service->delete();
    }
}