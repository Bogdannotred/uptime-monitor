import React from 'react';
import { useForm } from '@inertiajs/react';

export default function AddUrl() {
    const { data, setData, post, processing, errors, reset } = useForm({
        url: '',
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Trimit datele către server...", data);
        post('/check-service', {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.error("Serverul a refuzat datele:", errors);
            }
        });
    };

    return (
        <div className="p-6 text-gray-900">
            <h1 className="text-2xl font-bold mb-4">Add URL</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://example.com"
                
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                    />
                    {errors.url && <div className="text-red-500 text-xs mt-1">{errors.url}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                        placeholder="My Website"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50"
                >
                    {processing ? 'Se salvează...' : 'Add URL'}
                </button>
            </form>
        </div>
    );
}