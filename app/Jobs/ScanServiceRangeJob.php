<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Service;

class ScanServiceRangeJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $startId,
        public int $endId,
        public int $timestamp
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Service::whereBetween('id' , [$this->startId, $this->endId])
        ->where('check_interval' ,  '>' , 0)
        ->select(['id' , 'url' , 'check_interval', 'status', 'name', 'user_id'])
        ->chunk(50 , function($services) {
            $toCheck = $services -> filter(fn($s) => $this->timestamp % $s->check_interval === 0);
            if($toCheck -> isNotEmpty()){
                dispatch(new CheckServiceJob($toCheck));
            }
        });
    }
}
