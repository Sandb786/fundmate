import { useParams, useNavigate } from 'react-router-dom';
import {ChartSpline,House,Search,ListPlus, List, X,Save} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

export default function FundDetail() 
{
  const { fundId } = useParams();
  const navigate = useNavigate();

const [showModal, setShowModal] = useState(false);

const [entries, setEntries] = useState([{
    id: 1,
    note: "Initial Fund",
    date: "01 Jan 2025",
    amount: 1000.00
  }]);

  // Form Entries states
  // Form states
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [customDate, setCustomDate] = useState('');

  const handleAddEntry = () => {
    if (!note || !amount) return toast.error('Fill all required fields!');

    const today = new Date();
    const formattedDate = customDate || today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newEntry = {
      id: entries.length + 1,
      note,
      date: formattedDate,
      amount: parseFloat(amount),
    };

    setEntries([...entries, newEntry]);
    toast.success('Entry Added!');
    setShowModal(false);
    setNote('');
    setAmount('');
    setCustomDate('');
  };




  return (
      <div className="min-h-screen bg-black text-gray-100 flex flex-col relative">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />

      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-black z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} title='Home Page'>
          <ChartSpline className="text-blue-400 w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        
        <List className="text-gray-400 w-8 h-8 cursor-pointer" onClick={()=>navigate(-1)} />
      </header>

      {/* Title */}
      <div className="bg-black z-20 px-5 mb-4 mx-auto">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-5">Fund Detail</h2>
      </div>

      <div className='bg-gray-900 rounded-t-3xl'>

        {/* Fund List Details */}
        <div className="flex items-center justify-between gap-10 px-5 py-5">

        
          <p className='text-lg font-semibold text-white bg-gray-950 p-1 px-2 rounded-md'>January 2025 Fund</p>

          <button
            onClick={() => setShowModal(true)}
            className='bg-blue-600 p-1 rounded-md cursor-pointer shadow-lg active:scale-90 transition-all'
          >
            <ListPlus className="text-white w-6 h-6" />
          </button>

        </div>

<div>

</div>
           {/* Entries Table */}
        <div className='overflow-y-auto h-[calc(100vh-220px)] px-5'>

          <p className='text-lg font-semibold text-white'>Entries</p>

          <table className="w-full text-sm text-left text-gray-400 bg-gray-950 rounded-lg mt-4">
            <thead>
              <tr className="text-xs uppercase border-b border-gray-700">
                <th className="py-3 px-4">S.no.</th>
                <th className="py-3 px-4">Note</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Fund (₹)</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan="4" className="py-4 text-center text-gray-500">No entries yet.</td></tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{entry.note}</td>
                    <td className="py-3 px-4">{entry.date}</td>
                    <td className="py-3 px-4">₹ {entry.amount.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          +
        </button>

        {/* Add Entry Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-30">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-sm text-center shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Add Entry</h3>
                <X className="text-gray-400 w-5 h-5 cursor-pointer" onClick={() => setShowModal(false)} />
              </div>

              <input
                type="text"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2 mb-3 rounded bg-black text-gray-100 outline-none"
              />

              <input
                type="number"
                placeholder="Amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 mb-3 rounded bg-black text-gray-100 outline-none"
              />

              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full px-4 py-2 mb-4 rounded bg-black text-gray-100 outline-none"
              />

              <button
                onClick={handleAddEntry}
                disabled={!note.trim() || !amount.trim()}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Save className="inline mr-2 w-4 h-4" /> Save
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
