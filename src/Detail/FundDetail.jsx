import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function FundDetail() 
{
  const { fundId } = useParams();
  const navigate = useNavigate();

  // Example fund detail (Replace with API data later)
  const [fund, setFund] = useState({
    title: 'March Fund 2025',
    entries: 5,
    date: '01 Mar 2025',
  });

  const [entryList, setEntryList] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    const updatedEntries = [...entryList, newEntry.trim()];
    setEntryList(updatedEntries);
    setNewEntry('');
    toast.success('Entry added!');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />

      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-black border-b border-gray-800">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="text-gray-400 w-5 h-5" />
          <h2 className="text-lg font-semibold text-white">{fund.title}</h2>
        </div>
      </header>

      {/* Fund Summary */}
      <section className="px-5 py-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-400">Created on: <span className="text-white">{fund.date}</span></p>
          <p className="text-gray-400">Total Entries: <span className="text-white">{entryList.length}</span></p>
        </div>

        {/* Add Entry */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a new entry"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="flex-grow px-4 py-2 rounded-lg bg-gray-800 text-gray-100 outline-none"
          />
          <button
            onClick={handleAddEntry}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg p-2"
          >
            <PlusCircle className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* Entries List */}
      <section className="px-5 pb-20">
        <h3 className="text-lg font-semibold mb-3 text-white">Entries</h3>
        <ul className="space-y-3">
          {entryList.length === 0 ? (
            <p className="text-gray-500">No entries yet.</p>
          ) : (
            entryList.map((entry, index) => (
              <li key={index} className="bg-gray-800 px-4 py-2 rounded-lg text-gray-100">
                {entry}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
