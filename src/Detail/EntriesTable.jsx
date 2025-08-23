import { CircleChevronDown, CircleChevronUp, Pencil } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import UpdateEntry from './UpdateEntry';
import toast from 'react-hot-toast';

export default function EntriesTable({ entries = [], onUpdate, onDelete }) {

  const [editingEntry, setEditingEntry] = useState(null);


  const handleSave = (note, amount) => {
    onUpdate(editingEntry.entrieId, note, amount, editingEntry.date);
    setEditingEntry(null);
  };

  return (
    <div className="space-y-3 px-5 py-4">

  
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center">No entries yet.</p>
      ) : (
        entries.map((entry, index) => (
          <motion.div
           initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="bg-gray-950 rounded-lg p-5 flex justify-between items-center cursor-pointer"
            onClick={() => setEditingEntry(entry)}
          >
            <div className='flex items-center gap-3'>
              <span>
                {entry.amount >= 0
                  ? <CircleChevronDown className="w-10 h-10 -ml-1.5 text-green-500" />
                  : <CircleChevronUp className="w-10 h-10 -ml-1.5 text-red-500" />}
              </span>

              <span>
                <h4 className="text-white font-bold">{entry.note}</h4>
                <p className="text-gray-400 text-sm">{entry.date}</p>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`font-semibold p-1 ${entry.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ₹ {parseFloat(entry.amount).toFixed(2)}
              </span>
            </div>
          </motion.div>

        ))
      )}

      {editingEntry && (
        <UpdateEntry
          initialNote={editingEntry.note}
          initialAmount={editingEntry.amount}
          onSave={handleSave}
          onDelete={() => {
            onDelete(editingEntry.entrieId);
            setEditingEntry(null);
          }}
          onClose={() => setEditingEntry(null)}
        />

      )}

      <div className="text-gray-500 text-sm text-center">End of Entries</div>
    </div>
  );
}
