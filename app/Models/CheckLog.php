<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Service;
use Illuminate\Database\Eloquent\Prunable;


class CheckLog extends Model
{
    use Prunable;

    public $timestamps = false;
    protected $fillable = [
        'service_id',
        'status_code',
        'response_time',
        'is_online'
    ];
    public function prunable()
    {
        // Delete logs older than 30 days
        return $this->where('created_at', '<=', now()->subDays(30));
    }

    # Cast created_at to a datetime object
    protected $casts = [
        'created_at' => 'datetime',
    ];
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
