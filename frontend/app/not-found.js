'use client';

import React from 'react';

export default function NotFound() {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600">This page could not be found.</p>
            </div>
        </>
    );
};
