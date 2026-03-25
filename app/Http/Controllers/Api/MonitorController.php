<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MonitorService;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class MonitorController extends Controller
{
    public function verify(Request $request, MonitorService $service)
    {

    $validated = $request->validate([
        'url' => 'required|url',
        'name' => 'required|string'
    ]);
    
    $service = $request->user()->services()->create($validated);

    return redirect()->route('dashboard')->with('message', 'Service created successfully!');
    }   

    public function updateCheckInterval(Request $request, Service $service)
    {
        if ($service->user_id !== Auth::id()) {
            abort(403 , 'Unauthorized action.');
        }
        $validated = $request->validate([
            'check_interval' => 'required|integer|min:1'
        ]);

        $service->update($validated);

        return back()->with('message', 'Check interval updated successfully!');
    }

    public function destroy(Service $service , MonitorService $monitorService)
    {   
        if ($service->user_id !== Auth::id()) {
            abort(403 , 'Unauthorized action.');
        }
        $monitorService->destroy($service);
        {
            return back()->with('message', 'Service deleted successfully!');
        }
    }
}