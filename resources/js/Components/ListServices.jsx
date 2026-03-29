import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const StatusBadge = ({ status }) => {
    const isUp = status?.toLowerCase() === 'up' || status?.toLowerCase() === 'active';
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${isUp ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {status || 'Unknown'}
        </span>
    );
};

export default function ListServices({ services = [], period = 'weekly' }) {
    const [checkIntervals, setCheckIntervals] = useState({});

    const handlePeriodChange = (e) => {
        router.get('/dashboard', { period: e.target.value }, { preserveState: true, preserveScroll: true });
    };

    const handleUpdateInterval = (e, serviceId) => {
        e.preventDefault();
        const value = checkIntervals[serviceId];
        if (!value) return;
        router.post(`/services/${serviceId}/update-check-interval`, { check_interval: value }, { preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('Permanently remove this monitor?')) {
            router.delete(`/services/${id}`, { preserveScroll: true });
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg font-extrabold text-gray-800 tracking-tight">Active Monitors</h3>
                
                {/* Dropdown reparat */}
                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    <span className="text-[10px] font-black text-gray-400 mr-2 uppercase whitespace-nowrap">Stats:</span>
                    <select 
                        value={period} 
                        onChange={handlePeriodChange} 
                        className="border-none p-0 pr-8 text-xs font-black text-indigo-600 focus:ring-0 cursor-pointer bg-transparent appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234f46e5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right center',
                            backgroundSize: '1.2rem',
                        }}
                    >
                        <option value="weekly">Last 7 Days</option>
                        <option value="monthly">Last 30 Days</option>
                        <option value="yearly">Last 365 Days</option>
                    </select>
                </div>
            </div>

            {services.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-16 text-center">
                    <p className="text-gray-400 text-sm font-medium italic">No endpoints configured yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col overflow-hidden group">
                            <div className="p-5 flex justify-between items-start bg-white">
                                <div className="min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{service.name}</h4>
                                    <p className="text-[10px] font-mono text-gray-400 truncate mt-0.5">{service.url}</p>
                                </div>
                                <StatusBadge status={service.status} />
                            </div>

                            <div className="mx-5 p-4 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter text-center">Uptime</p>
                                    <p className="text-xl font-black text-indigo-600 leading-none mt-1">{service.uptime_percentage}%</p>
                                </div>
                                <div className="h-8 w-[1px] bg-gray-200"></div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter text-center">Interval</p>
                                    <p className="text-sm font-bold text-gray-700 leading-none mt-1">{service.check_interval}s</p>
                                </div>
                            </div>

                            <div className="p-5 mt-auto space-y-3">
                                <form onSubmit={(e) => handleUpdateInterval(e, service.id)} className="flex gap-2">
                                    <input
                                        type="number"
                                        min="30"
                                        placeholder="Set interval..."
                                        className="w-full text-xs py-2 rounded-lg border-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        onChange={(e) => setCheckIntervals({...checkIntervals, [service.id]: e.target.value})}
                                    />
                                    <button className="px-4 py-2 bg-gray-900 text-white text-[10px] font-black rounded-lg hover:bg-black transition-colors uppercase tracking-widest">Update</button>
                                </form>
                                <button onClick={() => handleDelete(service.id)} className="w-full text-[10px] font-black text-red-300 hover:text-red-500 transition-colors uppercase tracking-widest text-center pt-2 border-t border-gray-50">
                                    Delete Monitor
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}