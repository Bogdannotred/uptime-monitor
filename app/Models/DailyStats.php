<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyStats extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'service_id',
        'date',
        'uptime_percentage',
        'avg_latency'
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}