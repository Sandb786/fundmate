import { MoveLeft } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

export default function FundAnalysis() 
{
  const navigate=useNavigate()
  const location=useLocation();
  const entries=location.state?.Entries;

  // Filter and sort by date for Line Chart
  const lineData = entries.map(e => ({
    date: e.date,
    amount: parseFloat(e.amount)
  }));

  // Calculate total credit and debit
  const credit = entries.filter(e => e.amount > 0).reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const debit = entries.filter(e => e.amount < 0).reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const pieData = [
    { name: 'Credit', value: credit },
    { name: 'Debit', value: debit }
  ];

  const COLORS = ['#00C49F', '#FF5C5C']; // Green for Credit, Red for Debit

  return (
    <div className="p-5 text-white bg-black min-h-screen space-y-10">
      <h2 className="text-xl font-bold mb-6 text-center flex gap-10 items-center"><MoveLeft onClick={()=>navigate(-1)}/> 📊 Fund Analysis</h2>

      {/* Line Chart */}
      <div className="bg-gray-900 p-2 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Amount Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" tick={{ fontSize: 8 }}/>
            <YAxis tick={{ fontSize: 10 }}/>
            <Tooltip />
            <Line type="monotone" dataKey="amount"  stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-900 p-5 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Credit vs Debit</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
