import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CircleX, ListEnd, ListPlus, Save, ListRestart, Trash2, } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import ActionButton from './ActionButton';
import EntriesTable from './EntriesTable';
import axios from 'axios';

export default function FundDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const [fundData, setFundData] = useState(location.state?.fundData);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [entries, setEntries] = useState([]);

  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [customDate, setCustomDate] = useState('');

  const [title, setTitle] = useState(location.state?.fundData.title);

  const fatchEntries = () => 
  {
    if (!fundData) return;

    axios.get(`http://localhost:8083/getAllEntries/${fundData.id}`)
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        toast.error('Error fetching entries');
        console.error(error);
      });
  }

  useEffect(() => {
    fatchEntries();
  }, [])

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


    const promis = axios.post(`http://localhost:8083/quickAddFund/${fundData.id}`, newEntry);
    toast.promise(promis, {
      loading: 'Adding entry...',
      success: 'Entry added successfully!',
      error: 'Failed to add entry.'
    });
    promis
      .then(response => { fatchEntries() })
      .catch(error => { console.error('Error adding entry:', error); });

    setShowModal(false);
    setNote('');
    setAmount('');
    setCustomDate('');
  };


  const handleUpdateEntry = (id, newNote, newAmount, oldDate) => {

    const newEntry =
    {
      entrieId: id,
      note: newNote,
      date: oldDate,
      amount: parseFloat(newAmount)
    };
    const promis = axios.put(`http://localhost:8083/updateEntrie?fundName=${fundData.title}&userId=${fundData.userId}`, newEntry);
    toast.promise(promis, {
      loading: 'Updating entry...'
    });
    promis
      .then(response => {
        fatchEntries();
        toast.success('Entry Updated successfully!')
      }).catch(error => { console.error('Error adding entry:', error); toast.error('Failed to add entry.') });

  };

  const handleDeleteEntry = id => {
    console.log("ID: " + id);

    const promis = axios.delete(`http://localhost:8083/deleteEntrie?fundName=${fundData.title}&userId=${fundData.userId}&id=${id}`);
    toast.promise(promis, {
      loading: 'Deleting entry...'
    });
    promis
      .then(response => {
        fatchEntries();
        toast.success('Entry Deleted successfully!')
      }).catch(error => { console.error('Error adding entry:', error); toast.error('Failed to Delete entry.') });
  };

  const handleUpdateFundList = () => 
  {   
        const promis = axios.put(`http://localhost:8083/updateTitle/${fundData.id}?title=${title}`);
        toast.promise(promis, {
          loading: 'Updating entry...'
        });
        promis
          .then(response => {
            setFundData((prev) => ({
              ...prev,
              title: title
            }));
            toast.success('Title Updated successfully!: '+type)
            
          })
          .catch(error => {
            console.log(error)
            if (error.status === 409) {
              toast.error("Title alrady Present...");
            }
          });
    setShowSettings(false);
  }

  const handleDeleteFundList = () => 
  {   
      if(window.confirm("You Want to Delete the "+fundData.title))
      {
        const promis = axios.delete(`http://localhost:8083/deleteFundList/${fundData.id}`);
        toast.promise(promis, {
          loading: 'Deleting FundList...'
        });
        promis
          .then(response => 
          {
            toast.success(response.data);
            navigate(-1);
          })
          .catch(error => {
            console.log(error)
            toast.error('Somthing went wrong..');
          });
        }

    setShowSettings(false);
  }

  const totalAmount = entries.reduce((acc, entry) => acc + entry.amount, 0).toFixed(2);

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
          <h2 className="text-white font-bold text-md sm:text-xl capitalize">
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
        <div
          className="fixed inset-0 bg-gray-900/20 flex p-5 items-center justify-center z-50"
          style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-950 border border-[#1f1f1f] rounded-2xl px-6 py-6 w-full max-w-md shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <ListPlus className="w-7 h-7 text-blue-200" />
                <h3 className="text-lg font-semibold text-white">Add Entry</h3>
              </div>
              <CircleX
                className="text-gray-500 w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => setShowModal(false)}
              />
            </div>

            {/* Input: Note */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Note</label>
              <input
                type="text"
                placeholder="e.g. Bus Expense"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Input: Amount */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 120"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Input: Date */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 ${!customDate ? "text-gray-500" : "text-white"} outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAddEntry}
                disabled={!note.trim() || !amount.trim()}
                className="px-4 py-2 flex items-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Save className="inline mr-2 w-5 h-5" />
                <span>Save</span>
              </button>
            </div>
          </motion.div>
        </div>

      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-gray-900/20 flex p-5 items-center justify-center z-50" style={{ backdropFilter: 'blur(2px)' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-950 border border-[#1f1f1f] rounded-2xl px-6 py-6 w-full max-w-md shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <ListRestart className="w-7 h-7 text-blue-200" />
                <h3 className="text-lg font-semibold text-white">Fund List Settings</h3>
              </div>
              <CircleX
                className="text-gray-500 w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => setShowSettings(false)}
              />
            </div>

            {/* Input: Fund Title */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Fund Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.toLowerCase())}
                placeholder="e.g. January Fund 2025"
                className="w-full px-4 py-2 rounded-lg capitalize  bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Input: Fund Date */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-1">Created On</label>
              <input
                type="text"
                value={fundData?.date || ''}
                readOnly
                placeholder="e.g. 01 Jan 2025"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-0 cursor-not-allowed opacity-80"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleDeleteFundList}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>

              <button
                onClick={handleUpdateFundList}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>


          </motion.div>
        </div>

      )}

    </div>
  );
}
