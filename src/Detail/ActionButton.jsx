import React from 'react';
import exportToPdf from '../Features/ExportToPdf';
import { ListPlus, FileText, ChartSpline, NotepadText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActionButton({ onAddClick, entries }) {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 py-5 bg-gray-950">
      <div className="grid grid-cols-2 justify-center gap-3 sm:gap-5">

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-b from-gray-800 to-gray-900 rounded-md shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto"
        >
          <ListPlus className="w-5 h-5 text-blue-400" />
          <span>Add</span>
        </button>

        {/* Export Button */}
        <button
          onClick={() => exportToPdf(entries)}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-b from-gray-800 to-gray-900 rounded-md shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto"
        >
          <FileText className="w-5 h-5 text-red-400" />
          <span>Export</span>
        </button>

        {/* Analytics Button */}
        <button
          onClick={() => navigate("/analysis", { state: { Entries: entries } })}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-b from-gray-800 to-gray-900 rounded-md shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto"
        >
          <ChartSpline className="w-5 h-5 text-purple-400" />
          <span>Analytics</span>
        </button>

        {/* Settings Button */}
        <button
          onClick={() => console.log('Settings')}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-b from-gray-800 to-gray-900 rounded-md shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto"
        >
          <NotepadText className="w-5 h-5 text-yellow-400" />
          <span>Settings</span>
        </button>

      </div>
    </div>
  );
}
