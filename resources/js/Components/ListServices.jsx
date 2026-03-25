import react from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';


export default function ListServices({ services }) {

    const [CheckInterval, setCheckInterval] = useState({}); 

    const handleCheckInterval = (serviceId) => (e) => {
        e.preventDefault();
        const valueToSend = CheckInterval[serviceId];
        router.post(`/services/${serviceId}/update-check-interval`, {
            check_interval: valueToSend,
        }, {
            onSuccess: () => {
                console.log(`Check interval for service with ID ${serviceId} updated successfully.`);
            }
        });
    };

    const handleDelete = (serviceId) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(`/services/${serviceId}`, {
                onSuccess: () => {
                    console.log(`Service with ID ${serviceId} deleted successfully.`);
                }
            });
        }
    };
    return (
        <div className="p-6 text-gray-900">
            <Head title="My Services
            " />
            <h1 className="text-2xl font-bold mb-4">My Services</h1>
            {services.length === 0 ? (
                <p>You have no services added yet.</p>
            ) : (
                <ul className="space-y-4">
                    {services.map((service) => (
                        <li key={service.id} className="border p-4 rounded-md">
                            <h2 className="text-lg font-semibold">{service.name}</h2>
                            <p className="text-sm text-gray-600">{service.url}</p>
                            <p className="text-sm text-gray-500">Status: {service.status}</p>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="mt-2 inline-flex items-center rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
                            >
                                Delete Service
                            </button>

                            <form onSubmit={handleCheckInterval(service.id)}>
                                <h1>
                                    {service.check_interval} - Current Check Interval (seconds)
                                </h1>
                                <input
                                    type="number"
                                    value={CheckInterval[service.id] || ''}
                                    onChange={(e) => setCheckInterval({...CheckInterval, [service.id]: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="submit"
                                    className="mt-2 inline-flex items-center rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
                                >
                                    Update Check Interval
                                </button>
                            </form>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
