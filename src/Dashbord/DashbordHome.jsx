import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Layers3, User, ChartSpline, DatabaseBackup } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">

      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />

      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-black z-20 border-b border-gray-800">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <ChartSpline className="text-blue-400 w-8 h-8" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <User className="text-gray-400 w-7 h-7" />
      </header>

       {/* Welcome Message */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-1 text-white">Welcome Back 👋</h2>

        <p className="text-gray-400 text-sm">Manage your funds quickly and efficiently.</p>
      </section>


      {/* Dashboard Buttons */}
      <section className="grid gap-6 grid-cols-2 px-6 bg-gray-950 p-10 rounded-3xl">

        {/* Button Hadding */}
        <h2 className="col-span-2 text-2xl font-semibold text-white mb-3">
          Quick Actions →
        </h2>

        {/* Quick Add Fund */}
        <button
          onClick={() => navigate('#')}
          className="md:flex items-center gap-4 bg-gray-900 p-4 rounded-2xl shadow-lg shadow-black hover:shadow-lg transition-all active:scale-95"
        >
          <PlusCircle className="text-blue-400 w-10 h-10 mb-5 md:mb-0" />
          <div className="text-left">
            <h3 className="text-white text-xl font-medium">Quick Add Fund</h3>
            <p className="text-gray-400 text-sm">Create a new fund instantly</p>
          </div>
        </button>

        {/* Show Fund List */}
        <button
          onClick={() => navigate('/list')}
          className="md:flex items-center gap-4 bg-gray-900  p-4 rounded-2xl shadow-lg shadow-black hover:shadow-lg transition-all active:scale-95"
        >
          <Layers3 className="text-cyan-400  w-9 h-9 mb-5 md:mb-0" />
          <div className="text-left">
            <h3 className="text-white text-xl font-medium">Show Fund List</h3>
            <p className="text-gray-400 text-sm">View and manage all entries</p>

          </div>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate('#')}
          className="md:flex items-center gap-4 bg-gray-900  p-4 rounded-2xl shadow-lg shadow-black hover:shadow-lg transition-all active:scale-95"
        >
          <User className="text-purple-400 w-10 h-10 mb-5 md:mb-0" />
          <div className="text-left">
            <h3 className="text-white text-xl font-medium">Profile</h3>
            <p className="text-gray-400 text-sm">Manage your personal details</p>
          </div>
        </button>

        {/* Backup */}
        <button
          onClick={() => toast.error('Backup feature coming soon!')}
          className="md:flex items-center gap-4 bg-gray-900 p-4 rounded-2xl shadow-lg shadow-black hover:shadow-lg transition-all active:scale-95"
        >
          <DatabaseBackup className="text-gray-500 w-10 h-10 mb-5 md:mb-0" />
          <div className="text-left">
            <h3 className="text-gray-500 text-xl font-medium">BackUp Data</h3>
            <p className="text-gray-400 text-sm">Backup your Data to Drive.</p>
          </div>
        </button>

      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-6 text-center text-xs text-gray-500">
        © 2025 FundMate. All rights reserved.
      </footer>

    </div>
  );
}
