import { useNavigate } from 'react-router-dom';
import { ChartSpline, User, Layers3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

export default function DashboardLanding() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/fund/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
         <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2" onClick={() => navigate('/')}>
          <ChartSpline className="text-blue-400 w-7 h-7" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <User className="text-gray-400 w-6 h-6" />
      </header>

      {/* Page Title */}
      <h2 className="text-lg font-semibold px-5 py-3 text-white">Your Funds</h2>

      {/* Grid of Fund Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 pb-24">
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={index}
            onClick={() => handleCardClick(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="bg-[#0d0d0d] rounded-2xl p-5 shadow hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-95 transition-all border border-gray-800"
          >
            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-3">
              <Layers3 className="text-blue-400 w-6 h-6" />
              <h3 className="text-lg font-semibold text-white">Monthly Fund 2025</h3>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <p>Entries: <span className="font-medium text-gray-200">{index+5}</span></p>
              <p>{index+1} Jan 2025</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate('/add-fund')}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        +
      </button>
    </div>
  );
}
