import React, { useState } from 'react';
import { PlusCircle, CircleX, ListPlus, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';


export default function QuickAddFund(state)
{

  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [selectedFundTitle, setSelectedFundTitle] = useState('');

  // Handle adding a new entry
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

    const newEntry =
    {
      note,
      date: formattedDate,
      amount: parseFloat(amount)
    };

  // Add the new entry to the selected fund
   const promis=axios.post(`/quickAddFund/${selectedFundTitle}`,newEntry);
    toast.promise(promis, {
      loading: 'Adding entry...',
      success: 'Entry added successfully!',
      error: 'Failed to add entry.'
    });
    promis.then(response => {state.setIsOpen(false);})
   .catch(error => {console.error('Error adding entry:', error);});

    setNote('');
    setAmount('');
    setCustomDate('');
  };

  return (
    <>
      {/* Popup Modal */}
      {state.isOpen && (
        <div className="fixed inset-0 bg-gray/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-950 border border-gray-800 rounded-3xl p-8 w-full max-w-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <ListPlus className="text-blue-500 w-8 h-8" />
                <h2 className="text-xl font-semibold text-white">Quick Add </h2>
              </div>
              <CircleX
                className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => state.setIsOpen(false)}
              />
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-300 block mb-1.5">Select Fund</label>
                <select
                  value={selectedFundTitle}
                  onChange={(e) => setSelectedFundTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select a Fund</option>
                  {state.demo.map((obj,index) => (
                    <option key={index} value={obj.id}>{obj.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1.5">Note</label>
                <input
                  type="text"
                  placeholder="Write a note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1.5">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1.5">Date</label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 focus:text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleAddEntry}
                disabled={!note.trim() || !amount.trim() || !selectedFundTitle.trim()}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Save className="w-6 h-6" /> Save Entry
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>

  );
}


