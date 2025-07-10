import { CircleChevronDown, CircleChevronUp, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import UpdateEntry from './UpdateEntry';

export default function EntriesTable({ entries = [], onUpdate, onDelete }) {
  const [editingEntry, setEditingEntry] = useState(null);

  const handleSave = (note, amount) => {
    onUpdate(editingEntry.id, note, amount);
    setEditingEntry(null);
  };

  return (
    <div className="space-y-3 px-5 py-4">
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center">No entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="bg-gray-950 rounded-lg p-5 flex justify-between items-center" onClick={() => setEditingEntry(entry)}>
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
          </div>
        ))
      )}

      {editingEntry && (
        <UpdateEntry
          initialNote={editingEntry.note}
          initialAmount={editingEntry.amount}
          onSave={handleSave}
          onDelete={() => {
            onDelete(editingEntry.id);
            setEditingEntry(null);
          }}
          onClose={() => setEditingEntry(null)}
        />

      )}

      <div className="text-gray-500 text-sm text-center">End of Entries</div>
    </div>
  );
}
