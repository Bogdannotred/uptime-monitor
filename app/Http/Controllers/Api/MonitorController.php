<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Services\MonitorService;
use Illuminate\Http\Request;

class MonitorController extends Controller
{
public function verify(Request $request, MonitorService $monitorService)
{
    $request->validate([
        'url' => 'required|url',
        'name' => 'required|string'
    ]);

 
    $service = Service::firstOrCreate(
        ['url' => $request->url],
        ['name' => $request->name] 
    );

    $monitorService->check($service);

    return response()->json([
        'message' => 'Succes!',
        'service' => $service
    ]);
}
}