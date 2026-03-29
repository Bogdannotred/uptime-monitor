<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MonitorService;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class MonitorController extends Controller
{

    public function index(Request $request)
    {
        $period = $request->query('period', 'weekly');
            $days = match($period) {
            'weekly' => 7,
            'monthly' => 30,
            'yearly' => 365,
            default => 7
        };
        $services = $request->user()->services()
            ->with(['dailyStats' => function ($query) use ($days) {
                $query->latest('date')->limit($days);
            }])
            ->latest()
            ->get()
            ->map(function ($service) use ($period) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'url' => $service->url,
                    'status' => $service->status,
                    'check_interval' => $service->check_interval,
                    'uptime_percentage' => $service->dailyStats->first()?->uptime_percentage ?? 'Unknown',
                    'period_label' => $period
                ];
            });

        return \Inertia\Inertia::render('Dashboard', [
            'services' => $services,
            'period' => $period
        ]);
    }
    public function verify(Request $request, MonitorService $service)
    {

    $validated = $request->validate([
        'url' => 'required|url|string',
        'name' => 'required|string|max:255|unique:services,name',
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
            'check_interval' => 'required|integer|min:1',
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

    public function show(Request $request , $id) 
    {
        $service = $request->user()->services()->findOrFail($id);

        return inertia('Services/Show', [
            'service' => $service,
            'logs' => $service->logs()->latest()->paginate(10)
        ]);
    }
}       