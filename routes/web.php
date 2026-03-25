<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\MonitorController;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    return Inertia::render('Dashboard' , [
        'services' => $request->user()->services()->latest()->get(),
        'flash' => [ 'message' => $request->session()->get('message')],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::delete('/services/{service}', [MonitorController::class, 'destroy'])->name('destroy');

Route::post('/services/{service}/update-check-interval', [MonitorController::class, 'updateCheckInterval'])->name('updateCheckInterval');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/check-service', [MonitorController::class, 'verify'])->name('service.check');
});

require __DIR__.'/auth.php';
