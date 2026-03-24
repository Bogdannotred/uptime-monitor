<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use App\Models\Service;
use App\Services\MonitorService;

#[Signature('monitor:check')]
#[Description('Iterating and checking all services')]

class MonitorServicesCommand extends Command
{
    /**
     * Execute the console command.
     */
public function handle(MonitorService $monitorService): void
{
    $currentTimeStamp = now()->timestamp;

    $services = \App\Models\Service::all()->filter(function ($service) use ($currentTimeStamp) {
        return $service->check_interval > 0 && ($currentTimeStamp % $service->check_interval === 0);
    });

    if ($services->isEmpty()) {
        $this->info("No services to check at timestamp $currentTimeStamp.");
        return;
    }

    foreach ($services as $service) {
        $this->info("Checking: {$service->url} (Interval: {$service->check_interval}seconds)");
        $monitorService->check($service);
    }
}
}
