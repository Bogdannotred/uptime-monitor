<?php

namespace App\Services;

use App\Models\Service;
use App\Models\CheckLog;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class MonitorService
{
    public function check(Service $service): void
    {
        $startTime = microtime(true);
        try {
            $response = Http::timeout(10)->get($service->url);
            $duration = (int) ((microtime(true) - $startTime) * 1000);

            $this -> saveResult($service , $response-> status() , $duration);
        }

        catch (\Exception $e) {
            $this -> saveResult($service , 500 , 0);
            Log::error("Error checking service {$service->id}: " . $e->getMessage());
        }
    }

    public function saveResult(Service $service, int $statusCode, int $duration): void
    {
        $service->logs()->create([
            'status_code' => $statusCode,
            'response_time' => $duration,
        ]);

        $isUp = $statusCode >= 200 && $statusCode <= 300;

        $service->update([
            'status' => $isUp ? 'up' : 'down',
            'last_checked_at' => DB::RAW("NOW()")
        ]);

        
    }
}