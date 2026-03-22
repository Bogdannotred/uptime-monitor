import { Head, Link } from '@inertiajs/react';

export default function HomePage({ auth }) {
    return (
        <>
            <Head title="UptimeMonitor - Real-time Status & Alerting" />
            <div className="bg-gray-50 text-gray-900 dark:bg-[#0B0E14] dark:text-gray-100 min-h-screen transition-colors duration-300">
                <div className="relative flex min-h-screen flex-col items-center selection:bg-emerald-500 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        
                        {/* Navigation */}
                        <header className="flex justify-between items-center py-10">
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold tracking-tight">UptimeMonitor</span>
                            </div>
                            
                            <nav className="flex gap-4">
                                {auth.user ? (
                                    <Link 
                                        href={route('dashboard')} 
                                        className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="rounded-md px-3 py-2 text-sm font-medium transition hover:text-emerald-500">
                                            Log in
                                        </Link>
                                        <Link 
                                            href={route('register')} 
                                            className="rounded-full border border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-500 transition hover:bg-emerald-500 hover:text-white dark:border-emerald-400 dark:text-emerald-400"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-12">
                            {/* Hero Section */}
                            <div className="text-center mb-24">
                                <h1 className="text-5xl font-extrabold sm:text-7xl mb-6 tracking-tight">
                                    Don't let your site <span className="text-emerald-500">sleep</span>.
                                </h1>
                                <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Professional uptime monitoring for your servers and websites. 
                                    Get instant notifications via Email, Slack, or SMS the second your service goes down.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid gap-8 lg:grid-cols-3">
                                
                                {/* Feature 1: Monitoring */}
                                <div className="group flex flex-col items-start gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-xl dark:bg-zinc-900 dark:ring-zinc-800">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold">24/7 Monitoring</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        We check your website every 60 seconds from multiple global locations to ensure maximum availability and performance.
                                    </p>
                                </div>

                                {/* Feature 2: Alerts */}
                                <div className="group flex flex-col items-start gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-xl dark:bg-zinc-900 dark:ring-zinc-800">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold">Instant Alerts</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Reduce downtime with immediate notifications. Get notified via Slack, Telegram, Webhooks, or SMS before your users notice.
                                    </p>
                                </div>

                                {/* Feature 3: Reports */}
                                <div className="group flex flex-col items-start gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-xl dark:bg-zinc-900 dark:ring-zinc-800">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold">Uptime Reports</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Beautifully crafted reports showing your historical uptime, response times, and incident logs to keep your team informed.
                                    </p>
                                </div>

                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} UptimeMonitor. All rights reserved.
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}