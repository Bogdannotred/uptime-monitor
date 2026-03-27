<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\MonitorController;
use Illuminate\Http\Request;
use App\Services\MonitorService;


Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request, MonitorService $monitor) {
    $services = $request->user()->services()->latest()->get();

    // Ping all websites live right now (serverless, no background worker needed)
    foreach ($services as $service) {
        $monitor->check($service);
    }

    // Fetch the freshly updated statuses
    $liveServices = $request->user()->services()->latest()->get();

    return Inertia::render('Dashboard' , [
        'services' => $liveServices,
        'flash' => [ 'message' => $request->session()->get('message')],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/check-service', [MonitorController::class, 'verify'])->name('service.check');
    Route::delete('/services/{service}', [MonitorController::class, 'destroy'])->name('destroy');
    Route::post('/services/{service}/update-check-interval', [MonitorController::class, 'updateCheckInterval'])->name('updateCheckInterval');
});

require __DIR__.'/auth.php';
