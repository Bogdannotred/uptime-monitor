<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{

    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'name',
        'url',
        'check_interval',
        'last_checked_at',
        'status'
    ];

    public function logs() : HasMany
    {
        return $this->hasMany(CheckLog::class);
    }
    public function lastLog(): HasOne
    {
        return $this->hasOne(CheckLog::class)->latestOfMany();
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function dailyStats(): HasMany
    {
        return $this->hasMany(DailyStats::class);
    }
}
