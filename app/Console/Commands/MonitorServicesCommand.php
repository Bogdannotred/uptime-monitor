<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use App\Models\Service;

#[Signature('monitor:check')]
#[Description('Iterating and checking all services')]

class MonitorServicesCommand extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): void {
        $timestamp = now()->timestamp;
        
        $maxId = Service::max('id') ?? 0;
        $chunkSize = 1000;

        for ($i = 1 ; $i <= $maxId ; $i += $chunkSize){
            dispatch(new \App\Jobs\ScanServiceRangeJob($i, $i + $chunkSize - 1, $timestamp));
        }

    }
} 
