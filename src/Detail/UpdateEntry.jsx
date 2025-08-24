import React, { useState, useEffect } from 'react';
import { Save, X, Trash2, FilePen, CircleX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UpdateEntry({ initialNote, initialAmount, onSave, onClose, onDelete }) {

  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setNote(initialNote || '');
    setAmount(initialAmount !== undefined ? initialAmount.toString() : '');
  }, [initialNote, initialAmount]);

  const handleSave = () => {
    if (!note || !amount) return;
    onSave(note, parseFloat(amount));
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-30">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-950 rounded-xl p-6 w-full max-w-sm text-center shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">

          <span className='flex items-center gap-2'>
            <FilePen />
            <h3 className="text-lg font-semibold text-white">Edit Entry</h3>
          </span>
          <CircleX className="text-gray-400 w-5 h-5 cursor-pointer" onClick={onClose} />
        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-left text-gray-400 mb-1">
            Note:
          </label>
          <input
            type="text"
            placeholder="Enter note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-900 text-gray-100 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-left font-medium text-gray-400 mb-1">
            Amount (₹):
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-900 text-gray-100 outline-none"
          />
        </div>


        <div className="flex justify-between gap-2">
          <button
            onClick={handleDelete}
            className="flex-grow bg-red-700 text-white py-2 rounded-lg transition hover:bg-red-700"
          >
            <Trash2 className="inline mr-1 w-4 h-4" /> Delete
          </button>
          <button
            onClick={handleSave}
            disabled={!note.trim() || !amount.trim()}
            className="flex-grow bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            <Save className="inline mr-2 w-4 h-4" /> Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
