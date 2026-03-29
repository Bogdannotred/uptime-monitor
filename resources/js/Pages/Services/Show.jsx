import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ service, logs }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Head title={`Detalii - ${service.name}`} />

            <div className="max-w-5xl mx-auto">
                {/* Header & Navigație */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('dashboard')} 
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 mb-2"
                        >
                            ← Înapoi la Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                        <p className="text-gray-500">{service.url}</p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-400 uppercase font-bold tracking-wider">Status Curent</span>
                        <div className="flex items-center gap-2">
                            <span className={`h-3 w-3 rounded-full animate-pulse ${service.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="font-bold text-lg uppercase">{service.status}</span>
                        </div>
                    </div>
                </div>

                {/* Tabelul de Log-uri */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-800">Istoric Verificări</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Timp Răspuns</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cod HTTP</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Data Verificării</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* 1. FOLOSIM logs.data PENTRU MAPARE */}
                                {logs.data.length > 0 ? (
                                    logs.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {log.is_online ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Online
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Offline
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                                {log.response_time}ms
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {log.status_code || '---'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {new Date(log.created_at).toLocaleString('ro-RO')}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                            Nu există log-uri disponibile pentru acest serviciu.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 2. SISTEMUL DE PAGINARE (Engine-ul) */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
                        <nav className="flex flex-wrap gap-1">
                            {logs.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    // Previne scroll-ul sus la fiecare click
                                    preserveScroll
                                    // Transformă label-ul HTML (săgețile) în text vizibil
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    onClick={(e) => !link.url && e.preventDefault()}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all ${
                                        link.active 
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                                    } ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                                />
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}