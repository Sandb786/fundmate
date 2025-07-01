import { useNavigate } from 'react-router-dom';
import { ChartSpline, User, Layers3,Search, ListFilter, } from 'lucide-react';
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
      {/* Fixed Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-black z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <ChartSpline className="text-blue-400 w-7 h-7" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <User className="text-gray-400 w-6 h-6" />
      </header>

      {/* Fixed Page Title */}
      <div className="sticky top-[60px] bg-black z-20 px-5 py-4 ">
        <h2 className="text-2xl font-bold  text-white">Funds List</h2>
      </div>

    <div className='bg-gray-950 rounded-t-4xl overflow-y-auto'>

       {/* Search + Filter */}
      <div className="flex items-center gap-10 px-10 py-5 ">
        <div className="flex items-center px-4 py-2 rounded-full flex-grow bg-black transition-colors">
          <Search className="text-gray-400 w-5 h-4 mr-2"/>
          <input
            type="text"
            placeholder="Search funds..."
            className="bg-transparent text-sm text-gray-100 outline-none w-full"
          />
        </div>
        <ListFilter className="text-gray-400 w-5 h-5 cursor-pointer" />
      </div>

      {/* Grid of Fund Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 pb-24">
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={index}
            onClick={() => handleCardClick(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="bg-[#000000] rounded-2xl p-5 shadow hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-95 transition-all border border-black"
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


    </div>
  );
}
