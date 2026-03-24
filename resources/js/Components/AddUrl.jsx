import React from 'react';
import { useState } from 'react';
import axios  from 'axios';

export default function AddUrl() {
    const [url, setUrl] = useState('');
    const [name , setName] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('URL submitted:', url);
        try {
            await axios.post('http://localhost/api/check-service' , {
                'url': url,
                'name': name
            })
        } catch (error) {
            console.error('Error submitting URL:', error); 
        }
    };

    return (
        <div className="p-6 text-gray-900">
            <h1 className="text-2xl font-bold mb-4">Add URL</h1>
            <form>
                <div className="mb-4">
                    <label
                        htmlFor="url"
                        className="block text-sm font-medium text-gray-700"
                    >
                    URL
                    </label>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                    Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="My Website"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease
                        -in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                >
                    Add URL
                </button>
            </form>
        </div>
    );
}