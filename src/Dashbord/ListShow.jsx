import { ChartSpline, User, Search, Filter, List, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ListShow() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/add-expense');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 bg-[#0d0d0d] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <ChartSpline className="text-blue-400 w-7 h-7" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <User className="text-gray-400 w-6 h-6" />
      </header>

      {/* Tabs */}
      <nav className="flex justify-center space-x-8 text-sm font-medium py-3 border-b border-gray-800">
        <span className="text-white border-b-2 border-blue-400 pb-1 cursor-pointer">Lists</span>
        <span className="text-gray-400 hover:text-white cursor-pointer">Demo</span>
      </nav>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 px-5 py-3">
        <div className="flex items-center bg-gray-800 px-3 py-2 rounded-full flex-grow">
          <Search className="text-gray-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search funds..."
            className="bg-transparent text-sm text-gray-100 outline-none w-full"
          />
        </div>
        <Filter className="text-gray-400 w-5 h-5 cursor-pointer" />
      </div>

      {/* List Items */}
      <div className="flex-1 overflow-y-auto px-5 space-y-4 pb-20">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="bg-[#1a1a1a] rounded-2xl p-4 shadow hover:bg-gray-800 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              <List className="text-blue-400 w-6 h-6 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-base">Monthly Fund 2025</p>
                <p className="text-xs text-gray-400 mt-1">
                  10 Jan 2025 • Entries: 10
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddClick}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
