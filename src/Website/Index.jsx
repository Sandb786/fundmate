import { Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { Banknote, PieChart, Wallet, LineChart, DollarSign, ChartSpline } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    toast.success('Welcome to FundMate!', {
      style: { background: '#1f2937', color: '#fff' },
      position: 'top-center',
    });
    navigate('/authSingUp');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
     <Toaster position="top-center"  toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />


      {/* Header */}
      <header className="bg-[#0d0d0d] shadow-md px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChartSpline className="text-blue-400 w-8 h-8" />
            <h1 className="text-2xl font-bold text-blue-400 tracking-tight">FundMate</h1>
          </div>
          <button
            onClick={() => navigate('/authLogin')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-300 leading-tight">
            Track Your Finances Effortlessly
          </h2>
          <p className="text-base md:text-lg text-gray-400 mb-8">
            Personal finance tracking made simple, effective, and tailored for you.
          </p>
          <button
            onClick={handleStartClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
          >
            Get Started
          </button>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-xl transition-all flex flex-col items-center text-center h-full">
            <Banknote className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Expense Tracker</h3>
            <p className="text-gray-400 text-sm">
              Record your daily expenses and stay in control of your spending.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-xl transition-all flex flex-col items-center text-center h-full">
            <PieChart className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Visual Insights</h3>
            <p className="text-gray-400 text-sm">
              Get instant visual breakdowns with interactive charts and graphs.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-xl transition-all flex flex-col items-center text-center h-full">
            <Wallet className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Budget Planner</h3>
            <p className="text-gray-400 text-sm">
              Set monthly budgets, track progress, and meet your financial goals.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-xl transition-all flex flex-col items-center text-center h-full">
            <LineChart className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Expense Analytics</h3>
            <p className="text-gray-400 text-sm">
              Dive deeper into your financial trends and spending patterns.
            </p>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2025 FundMate. All rights reserved.
      </footer>
    </div>
  );
}
