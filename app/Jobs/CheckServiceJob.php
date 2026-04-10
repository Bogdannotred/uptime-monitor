<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\MonitorService; 
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;


class CheckServiceJob implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public \Illuminate\Support\Collection $services
    ){}

    public $timeout = 30;

    /**
     * Execute the job.
     */
    public function handle(MonitorService $monitorService): void
    {
        $responses = Http::pool(fn($pool)=>
            $this->services->map(fn($s) => $pool->as($s->id)->withOptions(['allow_redirects' => true])->timeout(15)->connectTimeout(10)->get($s->url))
        );

        $results = [];
        foreach($this->services as $service){
            $res = $responses[$service->id] ?? null;
            $isUp = ($res instanceof \Illuminate\Http\Client\Response) && $res->successful();
            
            $results[] = [
                'service'     => $service,
                'status_code' => ($isUp) ? $res->status() : 500, 
                'duration'    => ($res instanceof \Illuminate\Http\Client\Response) ? (int)($res->handlerStats()['total_time_us'] / 1000) : 0,
                'is_up'       => $isUp,
            ];
        }
        $monitorService->processBulkResults($results);
    }
}

