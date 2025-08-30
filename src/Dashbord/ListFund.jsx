import { useLocation, useNavigate } from 'react-router-dom';
import { ChartSpline, User, Layers3, Search, ListPlus, ListCheck, Save, X, House } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListFund() 
{
  const navigate = useNavigate();
  const location = useLocation();

  const [funds, setFunds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  if(!location.state?.UserId)
    {
      return;
    }

  function fetchFunds ()
   {
    axios.get('/getallFunds?id=' + location.state?.UserId)
      .then(response => {
        // 2. Filter Funds take List Info
        const fundListInfo = response.data.map(fund => ({
          id: fund.id,
          userId: fund.userId,
          title: fund.title,
          totalEntrie: fund.totalEntrie,
          date: fund.date
        }));
        setFunds(fundListInfo);
        // toast.success('Funds fetched!');
      })
      .catch(error => {
        toast.error('Error fetching funds');
        console.error(error);
      });
    }

  // Api Call to fetch funds.
  useEffect(() => {

    if (!location.state?.UserId) {
      toast.error('No email found in state. Redirecting to login.');
      navigate('/authLogin');
    }
    
    fetchFunds();
  }, []);


  const handleCardClick = (fund) => { navigate(`/fund-detail`, { state: { fundData: fund } })};

  const handleAddNewFund = () => 
  {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newFund = {
      title: newTitle.toLowerCase() || " New Fund",
      userId: location.state?.UserId || '',
      totalEntrie: 0,
      date: formattedDate,
      entries: []
    };

    const promise=axios.post('/addFundList', newFund);
    toast.promise(promise, {
      loading: 'Adding fund...',  
    });
    promise.then(response => {fetchFunds();})
      .catch(error => 
      {
        console.error('Error adding fund:', error);

        // Handle specific error for duplicate fund
        if (error.response && error.response.status === 409) 
        {
          toast('List alrady exist.', {
              icon: 'ℹ️',
              duration: 3000,
              style: {
                border: '1px solid gray', // blue border
                padding: '12px',
                color: 'white',
              }
            });
        }
        else 
        {
          toast.error('Failed to add fund. Somthing went wrong.');
        }

      }
      );

    setShowModal(false);
    setNewTitle('');
  };

  // Filtered List Based on Search Query
  const filteredFunds = funds.filter(fund => fund.title.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col relative">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />

      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-black z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)} title='Home Page'>
          <ChartSpline className="text-blue-400 w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <House className="text-gray-400 w-8 h-8 cursor-pointer" onClick={() => navigate(-1)} />
      </header>

      {/* Title */}
      <div className="bg-black z-20 px-5 mb-4 mx-auto">
        <h2 className="text-2xl font-semibold text-white">Funds List</h2>
      </div>

      <div className='bg-gray-900 rounded-t-3xl'>

        {/* Search + New Button */}
        <div className="flex items-center gap-10 px-10 py-5">
          <div className="flex items-center px-4 py-2 rounded-full flex-grow bg-black transition-colors">
            <Search className="text-gray-400 w-5 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search funds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-gray-100 outline-none w-full"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className='bg-blue-600 p-1 rounded-md cursor-pointer shadow-lg active:scale-90 transition-all'
          >
            <ListPlus className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Fund List */}
        <div className='overflow-y-auto h-[calc(100vh-220px)] px-5'>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-5 pb-24">
            {filteredFunds.length > 0 ? (
              filteredFunds.map((fund, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleCardClick(fund)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="bg-[#000000] rounded-2xl p-5 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-95 transition-all border border-black"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Layers3 className="text-blue-400 w-8 h-8" />
                    <h3 className="text-lg font-thine text-white capitalize">{fund.title}</h3>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <p>Total Entries: <span className="font-medium text-gray-400">{fund.totalEntrie}</span></p>
                    <p>{fund.date}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No funds found.</p>
            )}
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
              className="bg-gray-950 shadow-gray-900 border-2 border-gray-800 rounded-xl p-6 w-full max-w-sm text-center shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-thine text-white flex gap-2"><ListCheck size={29}/> Add New List</h3>
                <X className="text-gray-400 w-5 h-5 cursor-pointer" onClick={() => setShowModal(false)} />
              </div>

              <label className="block text-sm font-medium text-left text-gray-400 mb-2 mt-5">FundList: </label>
              <input
                type="text"
                placeholder="Enter Fund Name"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded bg-gray-900 text-gray-100 outline-none"
              />

              <button
                onClick={handleAddNewFund}
                disabled={!newTitle.trim()}
                className="w-full bg-blue-600 text-white py-2 active:scale-90 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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
