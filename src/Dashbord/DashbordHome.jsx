import { useNavigate } from 'react-router-dom';
import { ChartSpline, User, Layers3, Search, ClipboardPlus, X, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function DashbordHome() 
{
  const navigate = useNavigate();
  const [funds, setFunds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const fetchFunds = async () => {
      const apiData = [
        { id: 1, title: "January Fund 2025", entries: 12, date: "01 Jan 2025" },
        { id: 2, title: "February Fund 2025", entries: 8, date: "01 Feb 2025" },
        { id: 3, title: "March Fund 2025", entries: 15, date: "01 Mar 2025" }
      ];
      setFunds(apiData);
    };
    fetchFunds();
  }, []);

  const handleCardClick = (id) => {
    toast.success(`Opening Fund ID: ${id}`);
    // navigate(`/fund/${id}`);
  };

  const handleAddNewFund = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newFund = {
      id: funds.length + 1,
      title: newTitle,
      entries: 0,
      date: formattedDate,
    };

    setFunds([newFund, ...funds]);
    toast.success("New Fund Added!");
    setShowModal(false);
    setNewTitle('');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col relative">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />

      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-black z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <ChartSpline className="text-blue-400 w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <User className="text-gray-400 w-8 h-8" />
      </header>

      {/* Title */}
      <div className="bg-black z-20 px-5 mb-4 mx-auto">
        <h2 className="text-2xl font-bold text-white">Funds List</h2>
      </div>

      <div className='bg-gray-900 rounded-t-3xl'>

        {/* Search + New Button */}
        <div className="flex items-center gap-10 px-10 py-5">
          <div className="flex items-center px-4 py-2 rounded-full flex-grow bg-black transition-colors">
            <Search className="text-gray-400 w-5 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search funds..."
              className="bg-transparent text-sm text-gray-100 outline-none w-full"
            />
          </div>

          {/* New Fund Button */}
          <button
            onClick={() => setShowModal(true)}
            className='bg-cyan-700 p-1.5 rounded-md cursor-pointer shadow-sm shadow-black active:scale-95 transition-all'
          >
            <ClipboardPlus className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Fund List */}
        <div className='overflow-y-auto h-[calc(100vh-220px)] px-5'>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-5 pb-24">
            {funds.map((fund, index) => (
              <motion.div
                key={fund.id}
                onClick={() => handleCardClick(fund.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-[#000000] rounded-2xl p-5 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-95 transition-all border border-black"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Layers3 className="text-blue-400 w-6 h-6" />
                  <h3 className="text-lg font-semibold text-white">{fund.title}</h3>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <p>Entries: <span className="font-medium text-gray-200">{fund.entries}</span></p>
                  <p>{fund.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          +
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-30">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-950 rounded-xl p-6 w-full max-w-sm text-center shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Add New List</h3>
                <X className="text-gray-400 w-5 h-5 cursor-pointer" onClick={() => setShowModal(false)} />
              </div>

              <input
                type="text"
                placeholder="Enter Fund Name"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded bg-black text-gray-100 outline-none"
              />

              <button
                onClick={handleAddNewFund}
                disabled={!newTitle.trim()}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Save className="inline mr-2 w-4 h-4" />
                Save Fund
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
