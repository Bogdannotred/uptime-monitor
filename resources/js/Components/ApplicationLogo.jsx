import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* The Outer Shield/Circle (Stability) */}
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            
            {/* The Pulse Line (Activity) */}
            <path 
                d="M8 12h1.5l1.5-3 2 6 1.5-3H16" 
                className="text-indigo-500" 
                stroke="currentColor"
            />
        </svg>
    );
}