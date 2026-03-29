import React from 'react';
import { useForm } from '@inertiajs/react';

export default function AddUrl() {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        url: '',
        name: '',
    });

    transform((currentData) => {
        let cleanUrl = currentData.url.trim().replace(/^https?:\/\//i, '');
        return {
            ...currentData,
            url: cleanUrl ? `https://${cleanUrl}` : '',
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/check-service', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-6 md:p-8">
            <div className="mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">New Monitor</h1>
                <p className="text-sm text-gray-500">Add a website to start tracking uptime.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Friendly Name</label>
                    <input
                        id="name"
                        type="text"
                        className={`block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm ${errors.name ? 'border-red-300 bg-red-50' : ''}`}
                        placeholder="My Website"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="url" className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Target URL</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 text-sm font-semibold">https://</span>
                        </div>
                        <input
                            id="url"
                            type="text"
                            className={`block w-full pl-16 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm ${errors.url ? 'border-red-300 bg-red-50' : ''}`}
                            placeholder="example.com"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                        />
                    </div>
                    {errors.url && <p className="text-red-500 text-xs mt-1 ml-1">{errors.url}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : 'Start Monitoring'}
                </button>
            </form>
        </div>
    );
}