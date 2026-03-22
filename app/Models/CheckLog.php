<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Service;


class CheckLog extends Model
{
    public $timestamps = true;

    protected $fillable = [
        'service_id',
        'status_code',
        'response_time'
    ];

    # Cast created_at to a datetime object
    protected $casts = [
        'created_at' => 'datetime',
    ];
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
