import { Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { Banknote, PieChart, Wallet, LineChart, DollarSign, ChartSpline } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function HomePage() 
{

   const navigate = useNavigate();

  const handleStartClick = () => 
    {
        toast.success("Welcome to FundMate!", {style: {background: '#1f2937',color: '#fff',} , position: 'top-center',});
        navigate("/authSingUp");
    };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <Toaster />


      <header className="bg-gray-800 shadow p-6">
        <div className="max-w-7xl mx-auto flex md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <ChartSpline className="text-blue-400 w-8 h-8" />
            <h1 className="text-3xl font-bold text-blue-400">FundMate</h1>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            {/* <a href="#features" className="text-gray-300 hover:text-blue-400">Features</a>
            <a href="#about" className="text-gray-300 hover:text-blue-400">About</a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400">Contact</a> */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition" onClick={()=>navigate("/authLogin")}>Login</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-20">
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-blue-300">Track Your Finances Effortlessly</h2>
          <p className="text-lg text-gray-400 mb-8">
            Personal finance tracking made simple and effective with FundMate.
          </p>
          <button 
            onClick={handleStartClick} 
            className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition-all"
          >
            Get Started
          </button>
        </motion.section>

        <motion.section 
          id="features"
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          <div className="bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-all">
            <Banknote className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Expense Tracker</h3>
            <p className="text-gray-400">Easily record daily expenses and monitor where your money goes.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all">
            <PieChart className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Visual Insights</h3>
            <p className="text-gray-400">Gain insights with charts and graphs to analyze your spending habits.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all">
            <DollarSign className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Budget Planner</h3>
            <p className="text-gray-400">Plan monthly budgets and track your financial goals.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all">
            <DollarSign className="text-blue-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Budget Planner</h3>
            <p className="text-gray-400">Plan monthly budgets and track your financial goals.</p>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 p-4 text-center text-sm text-gray-500">
        © 2025 FundMate. All rights reserved.
      </footer>

    </div>
  );
}
