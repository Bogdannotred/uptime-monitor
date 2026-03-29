import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AddUrl from '@/Components/AddUrl';
import ListServices from '@/Components/ListServices';

export default function Dashboard({ services = [], period = 'weekly' }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                        Monitoring Overview
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm w-fit border border-gray-100">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="font-medium">System Live</span>
                    </div>
                </div>
            }
        >
            <Head title="System Dashboard" />

            <div className="py-6 lg:py-10 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        
                       
                        <main className="lg:col-span-8 order-1 lg:order-2">
                            <ListServices services={services} period={period} />
                        </main>

                        
                        <aside className="lg:col-span-4 lg:sticky lg:top-6 order-2 lg:order-1 space-y-6">
                            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
                                <AddUrl />
                            </div>
                            
                      
                            <div className="hidden sm:block p-6 bg-indigo-900 rounded-2xl text-white shadow-lg">
                                <h3 className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Quick Stats</h3>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-4xl font-black">{services.length}</span>
                                    <span className="text-indigo-300 text-sm font-medium">Active Services</span>
                                </div>
                            </div>
                        </aside>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}