<?php

namespace App\Services;

use App\Models\Service;
use App\Notifications\ServiceDownNotification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class MonitorService
{

    public function check(Service $service): void
    {
        $startTime = microtime(true);

        try {
        
            $response = Http::timeout(10)->get($service->url);
        
            $duration = (int) ((microtime(true) - $startTime) * 1000);
            
     
            $isUp = $response->successful();
            $statusCode = $response->status();

            $this->processResult($service, $statusCode, $duration, $isUp);

        } catch (\Exception $e) {
            Log::error("Error checking service {$service->id}: " . $e->getMessage());
            
            $this->processResult($service, 500, 0, false);
        }
    }


    private function processResult(Service $service, int $statusCode, int $duration, bool $isUp): void
    {
        $oldStatus = $service->status;
        $newStatus = $isUp ? 'up' : 'down';
        $service->logs()->create([
            'status_code'   => $statusCode,
            'response_time' => $duration,
            'is_online'     => $isUp, 
        ]);
        $service->update([
            'status'          => $newStatus,
            'last_checked_at' => now(), 
        ]);

        if ($oldStatus !== $newStatus) {
            $this->sendAlert($service, $isUp);
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