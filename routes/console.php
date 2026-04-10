<?php

use Illuminate\Support\Facades\Schedule;
use App\Models\Service;
use Illuminate\Support\Facades\Artisan;

Schedule::command('monitor:check')->everyMinute();

Schedule::call(function () {
    $yesterday = now()->subDay()->toDateString();

    Service::all()->each(function ($service) use ($yesterday) {
    
        $stats = $service->logs()
            ->whereDate('created_at', $yesterday)
            ->selectRaw('AVG(is_online) as uptime_ratio, AVG(response_time) as avg_latency')
            ->first();

        if ($stats && $stats->uptime_ratio !== null) {
            $service->dailyStats()->create([
                'date' => $yesterday,
                'uptime_percentage' => round($stats->uptime_ratio * 100, 2),
                'avg_latency' => (int) $stats->avg_latency,
            ]);
        }
    });

    Artisan::call('model:prune');

})->dailyAt('00:00');