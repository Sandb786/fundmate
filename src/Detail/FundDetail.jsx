import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CircleX, ListEnd, ListPlus, Save, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import ActionButton from './ActionButton';
import EntriesTable from './EntriesTable';

export default function FundDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fundData,setFundData] = useState(location.state?.fundData);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [entries, setEntries] = useState([
    { id: 1, note: 'Initial Fund', date: '01 Jan 2025', amount: 2000.0 },
    { id: 2, note: 'First Expense', date: '02 Jan 2025', amount: -1500.0 },
    { id: 3, note: 'Second Expense', date: '03 Jan 2025', amount: 2000.0 },
    { id: 4, note: 'Third Expense', date: '04 Jan 2025', amount: -1000.0 },
    { id: 5, note: 'Fourth Expense', date: '05 Jan 2025', amount: 500.0 },
    { id: 6, note: 'Fifth Expense', date: '06 Jan 2025', amount: 1500.0 },
    { id: 7, note: 'Sixth Expense', date: '07 Jan 2025', amount: 2500.0 }
  ]);

  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [customDate, setCustomDate] = useState('');

  const handleAddEntry = () => {
    if (!note || !amount) return toast.error('Fill all required fields!');

    const today = new Date();
    const formattedDate = customDate
      ? new Date(customDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).toLowerCase()
      : today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).toLowerCase();

    const newEntry = {
      id: entries.length + 1,
      note,
      date: formattedDate,
      amount: parseFloat(amount)
    };

    setEntries([...entries, newEntry]);
    toast.success('Entry Added!');
    setShowModal(false);
    setNote('');
    setAmount('');
    setCustomDate('');
  };

  const handleUpdateEntry = (id, newNote, newAmount) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, note: newNote, amount: newAmount } : entry
      )
    );
  };

  const handleDeleteEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast.success('Entry deleted successfully!');
  };

  const totalAmount = entries
    .reduce((acc, entry) => acc + entry.amount, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: '#1a1a1a', color: '#fff' }
        }}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-20 px-5 py-4 flex justify-between items-center bg-gray-950 ">
        <div className="flex items-center gap-2">
          <ListEnd className="w-7 h-7 text-white cursor-pointer" onClick={() => navigate(-1)} />
          <h2 className="text-white font-bold text-md sm:text-xl">
            {fundData ? fundData.title : 'Fund Detail'}
          </h2>
        </div>
        <div
          className={`text-md sm:text-base text-gray-300 ${totalAmount < 0 ? 'bg-red-700' : 'bg-green-700'
            } px-3 py-1 rounded-lg`}
        >
          <span className="text-white font-semibold">₹ {totalAmount}</span>
        </div>
      </header>

      {/* Entries Table */}
      <div className="flex-grow overflow-y-auto pb-28 mt-15 bg-gray-900">
        <EntriesTable entries={entries} onUpdate={handleUpdateEntry} onDelete={handleDeleteEntry} />
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-black rounded-t-xl">
        <ActionButton
          onAddClick={() => setShowModal(true)}
          entries={entries}
          onSettingsClick={() => setShowSettings(true)}
        />
      </div>

      {/* Add Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-950 border-2 border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="flex items-center gap-2">
                <ListPlus className="w-8 h-8" />
                <h3 className="text-lg font-bold text-white">Add Entry</h3>
              </span>
              <CircleX
                className="text-gray-400 w-5 h-5 cursor-pointer hover:text-red-400"
                onClick={() => setShowModal(false)}
              />
            </div>

            <input
              type="text"
              placeholder="Note"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white outline-none focus:bg-black focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount (₹)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white outline-none focus:bg-black focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={customDate}
              onChange={e => setCustomDate(e.target.value)}
              className="w-full px-4 py-2 mb-6 rounded bg-gray-800 text-gray-200 focus:text-white outline-none focus:bg-black focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAddEntry}
              disabled={!note.trim() || !amount.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save className="inline mr-2 w-4 h-4" /> Save
            </button>
          </motion.div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-950 border-2 border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Settings</h3>
              <CircleX
                className="text-gray-400 w-5 h-5 cursor-pointer hover:text-red-400"
                onClick={() => setShowSettings(false)}
              />
            </div>
            <input
              type="text"
              value={fundData?.title || ''}
              onChange={(e) => {
                setFundData((prev) => ({ ...prev, title: e.target.value }));
              }}
              placeholder="Fund Name"
              className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={fundData?.date || ''}
              onChange={(e) => {
                setFundData((prev) => ({ ...prev, date: e.target.value }));
              }}
              placeholder="Created On"
              className="w-full mb-3 px-4 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
        </div>
      )}

    </div>
  );
}
