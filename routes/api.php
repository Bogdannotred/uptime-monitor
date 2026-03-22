<?php

use App\Http\Controllers\Api\MonitorController;
use Illuminate\Support\Facades\Route;

Route::post('/check-service', [MonitorController::class, 'verify']);