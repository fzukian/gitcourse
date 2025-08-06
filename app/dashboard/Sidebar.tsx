import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-gray-100 p-6 rounded-2xl shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <a href="/dashboard" className="text-blue-700 hover:underline">API Keys</a>
        <a href="/" className="text-gray-700 hover:underline">Home</a>
        {/* Add more links as needed */}
      </nav>
    </aside>
  );
}