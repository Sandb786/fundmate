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
      >
        <FileText className="w-5 h-5 text-red-400" />
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


// { id: 1, note: 'Initial Fund', date: '01 Jan 2025', amount: 1000 },
    // { id: 2, note: 'Monthly Contribution', date: '01 Feb 2025', amount: 500 },
    // { id: 3, note: 'Emergency Fund', date: '15 Feb 2025', amount: 200 },
    // { id: 4, note: 'Investment Return', date: '28 Feb 2025', amount: 300 },
    // { id: 5, note: 'Savings Boost', date: '05 Mar 2025', amount: 150 },
    // { id: 6, note: 'Unexpected Expense', date: '10 Mar 2025', amount: -250 },
    // { id: 7, note: 'Monthly Contribution', date: '01 Apr 2025', amount: 600 },
    // { id: 8, note: 'Investment Return', date: '15 Apr 2025', amount: 400 },
    // { id: 9, note: 'Savings Boost', date: '20 Apr 2025', amount: 200 },
    // { id: 10, note: 'Emergency Fund', date: '25 Apr 2025', amount: -100 },
    // { id: 11, note: 'Monthly Contribution', date: '01 May 2025', amount: 700 },
    // { id: 12, note: 'Investment Return', date: '10 May 2025', amount: 500 },
    // { id: 13, note: 'Savings Boost', date: '15 May 2025', amount: 300 },
    // { id: 14, note: 'Unexpected Expense', date: '20 May 2025', amount: -200 },
    // { id: 15, note: 'Monthly Contribution', date: '01 Jun 2025', amount: 800 },
    // { id: 16, note: 'Investment Return', date: '05 Jun 2025', amount: 600 },
    // { id: 17, note: 'Savings Boost', date: '10 Jun 2025', amount: 400 },
    // { id: 18, note: 'Emergency Fund', date: '15 Jun 2025', amount: -300 },
    // { id: 19, note: 'Monthly Contribution', date: '01 Jul 2025', amount: 900 },
    // { id: 20, note: 'Investment Return', date: '10 Jul 2025', amount: 700 },
    // { id: 21, note: 'Savings Boost', date: '15 Jul 2025', amount: 500 },
    // { id: 22, note: 'Unexpected Expense', date: '20 Jul 2025', amount: -400 },
    // { id: 23, note: 'Monthly Contribution', date: '01 Aug 2025', amount: 1000 },
    // { id: 24, note: 'Investment Return', date: '05 Aug 2025', amount: 800 },
    // { id: 25, note: 'Savings Boost', date: '10 Aug 2025', amount: 600 },
   