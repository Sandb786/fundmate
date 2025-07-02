import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChartSpline, User } from 'lucide-react'

export default function DashbordHome() {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col relative">

      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-black z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <ChartSpline className="text-blue-400 w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <User className="text-gray-400 w-8 h-8" />
      </header>

      {/* Main Content */}
      <main >

        <div className="flex-1 p-5 mx-auto max-w-4xl text-center">
        <h2 className="text-2xl mb-4 font-thin">Welcome to FundMate Dashboard</h2>
        <p className="text-gray-400">Manage your funds efficiently and effectively.</p>
        </div>


        <div>
          <img src="https://via.placeholder.com/800x400" alt="Dashboard Illustration" className="mx-auto mt-10 rounded-lg shadow-lg" />
          
        </div>


      </main>
    </div>
  )
}
