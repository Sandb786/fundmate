import React from 'react';
import exportToPdf from '../Features/ExportToPdf';
import { ListPlus, FileText, ChartSpline, NotepadText } from 'lucide-react';

export default function ActionButton({ onAddClick ,entries}) 
{

  return (
    <div className="flex flex-wrap justify-center gap-5 font-semibold py-5 ">
      
      <button
        onClick={onAddClick}
        className="bg-gradient-to-b from-gray-800 cursor-pointer to-gray-900 shadow-sm shadow-gray-700 px-3 py-1.5 rounded-md active:scale-90 transition-all flex items-center gap-1"
      >
        <ListPlus className="w-6 h-6 text-blue-400" />
        <span className="text-sm text-white px-1">Add</span>
      </button>

      <button
        className="bg-gradient-to-b from-gray-800 cursor-pointer to-gray-900 shadow-sm shadow-gray-700 px-3 py-1.5 rounded-md active:scale-90 transition-all flex items-center gap-1"
        onClick={() => exportToPdf(entries)}
      >        <FileText className="w-5 h-5 text-red-400" />
        <span className="text-sm text-white">Export</span>
      </button>

      <button
        onClick={() => console.log('Analytics')}
        className="bg-gradient-to-b from-gray-800 cursor-pointer to-gray-900 shadow-sm shadow-gray-700 px-3 py-1.5 rounded-md active:scale-90 transition-all flex items-center gap-1"
      >
        <ChartSpline className="w-5 h-5 text-purple-400" />
        <span className="text-sm text-white">Analytics</span>
      </button>

      <button
        onClick={() => console.log('Settings')}
        className="bg-gradient-to-b from-gray-800 cursor-pointer to-gray-900 shadow-sm shadow-gray-700 px-3 py-1.5 rounded-md active:scale-90 transition-all flex items-center gap-1"
      >
        <NotepadText className="w-5 h-5 text-yellow-400" />
        <span className="text-sm text-white">Settings</span>
      </button>

    </div>
  );
}


    
   