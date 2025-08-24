import React, { use } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlusCircle, Layers3, User, ChartSpline, DatabaseBackup, ChartPie, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import QuickAddFund from './QuickAddFund';
import axios from 'axios';
import ProfilePopup from '../Profile_Section/ProfilePopup';

export default function DashboardHome() 
{
  const navigate = useNavigate();

  // const [email, setEmail] = React.useState(useLocation().state?.email.toLowerCase() || '');
  const [userId, setUserId] = React.useState(useLocation().state?.userId);
  const [openQuickAdd, setOpenQuickAdd] = React.useState(false);
  const [openProfile, setopenProfile] = React.useState(false);
  const [funds, setFunds] = React.useState([]);

  useEffect(() => 
  {

    if (!userId) 
    {
      toast.success('Logout successful .');
      navigate('/authLogin');
    }


    // Simulate fetching funds from an API
    const fetchFunds = async () => {

      // Calling an API or using local data
      axios.get('https://fundmatebackend-production.up.railway.app/getallFunds?id='+userId)
        .then(response => {
          // toast.success('Fatch...')
          setFunds(response.data);
        })
        .catch(error => {
          console.error('Error fetching funds:', error);
          toast.error('Failed to fetch funds. Using local data.');
        });

      
      
    };

    fetchFunds();

  }, [userId]);

  // Don't render the dashboard if no userId (optional)
  if (!userId) {
    return null; // Prevents rest of the component from rendering
  }

  // 1. Filter Funds And tack title from it
  const fundTitles = funds.map(fund => fund.title);

  // 2.demo
  const demo = funds.map(fund => (
  {
  id: fund.id,
  title: fund.title
}));



  return (
    <div className="min-h-screen  bg-black text-gray-100 flex flex-col">

      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />

      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-black z-20 border-b border-gray-900">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChartSpline className="text-blue-400 w-9 h-9" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div> 
        <LogOut className="text-gray-200 w-8 h-8 active:scale-95"  onClick={()=>setUserId(null)}/>
      </header>



      {/* Welcome Message */}
      <section className="px-7 py-7">
        <h2 className="text-2xl font-thine mb-1 text-white">Welcome Back 👋</h2>
        <p className="text-gray-400 text-sm">Manage your funds quickly and efficiently.</p>

      </section>

      <div className='p-4'>
        {/* Dashboard Buttons */}
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 px-6  bg-gray-900 p-10 rounded-3xl">

          {/* Button Heading */}
          <h2 className="col-span-1 sm:col-span-2 text-2xl font-semibold text-white mb-3">
            Quick Actions →
          </h2>

          {/* Quick Add Fund */}
          <button
            onClick={() => setOpenQuickAdd(true)}
            className="flex items-center gap-4 bg-gray-950 p-4 rounded-2xl  hover:shadow-lg transition-all active:scale-95"
          >
            <PlusCircle className="text-blue-400 w-10 h-10" />
            <div className="text-left">
              <h3 className="text-white text-xl font-medium">Quick Add Fund</h3>
              <p className="text-gray-400 text-sm">Create a new fund instantly</p>
            </div>
          </button>

          {/* Show Fund List */}
          <button
            // onClick={() => navigate('/list', { state: { UserEmail: email} })}
            onClick={() => navigate('/list', { state: { UserId: userId} })}
            className="flex items-center gap-4 bg-gray-950 p-4 rounded-2xl  hover:shadow-lg transition-all active:scale-95"
          >
            <Layers3 className="text-cyan-400 w-9 h-9" />
            <div className="text-left">
              <h3 className="text-white text-xl font-medium">Show Fund List</h3>
              <p className="text-gray-400 text-sm">View and manage all entries</p>
            </div>
          </button>

          {/* Profile */}
          <button
            onClick={()=>setopenProfile(true)}
            className="flex items-center gap-4 bg-gray-950 p-4 rounded-2xl  hover:shadow-lg transition-all active:scale-95"
          >
            <User className="text-purple-400 w-9 h-9" />
            <div className="text-left">
              <h3 className="text-white text-xl font-medium">Profile</h3>
              <p className="text-gray-400 text-sm">Manage your personal details</p>
            </div>
          </button>

          {/* Backup */}
          <button
            onClick={() => toast.error('Backup feature coming soon!')}
            className="flex items-center gap-4 bg-gray-950 p-4 rounded-2xl  hover:shadow-lg transition-all active:scale-95 mb-5"
          >
            <DatabaseBackup className="text-gray-500 w-10 h-10" />
            <div className="text-left">
              <h3 className="text-gray-500 text-xl font-medium">BackUp Data</h3>
              <p className="text-gray-400 text-sm">Backup your Data to Drive.</p>
            </div>
          </button>

        </section>
      </div>

      {/* Mobile-Only Extra Section (To fill empty space on small screens) */}
      <section className="block sm:hidden text-center mt-5 px-5">
        <h2 className="text-lg text-gray-300 mb-2">More Features Coming Soon 🚀</h2>
        <p className="text-gray-500 text-sm">Stay tuned for upcoming updates and tools to manage your funds even better!</p>
      </section>


      {/* Footer */}
      <footer className="mt-auto px-6 py-6 text-center text-xs text-gray-500">
        © 2025 FundMate. All rights reserved.
      </footer>

      <QuickAddFund isOpen={openQuickAdd} setIsOpen={setOpenQuickAdd} title={fundTitles} demo={demo} />
      <ProfilePopup  isOpen={openProfile} setIsOpen={setopenProfile}  userId={userId}/>
    </div>
  );
}
