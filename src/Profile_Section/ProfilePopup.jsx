import React, { useEffect, useState } from "react";
import { User, Mail, Lock, CircleX, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProfilePopup(state) 
{
  const [userName,setUserName]=useState('');
  const navigate=useNavigate();

  const [user,setUser]=useState({})

  useEffect(()=>
  {
   
    axios.get(`https://fundmatebackend-production.up.railway.app/userdetail?userId=${state.userId}&type=nameAndEmail`)
    .then(res=>
    {
      setUser(res.data);
    })
    .catch(error=>
    {
      console.log(error)
      toast.error("While fatching User Detils");
    })
  },[])

  return (
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 px-6"
          style={{ backdropFilter: "blur(5px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="max-w-md w-full mt-12 mb-10 bg-gray-950 text-white p-5 px-6 rounded-2xl shadow-md shadow-black border border-gray-800"
            initial={{ y: -30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Header */}
            <div className="flex justify-around mb-4">
              <h2 className="text-3xl font-bold mb-6 mx-auto text-blue-400">
                My Profile
              </h2>
              <CircleX
                onClick={() => state.setIsOpen(false)}
                className="w-6 h-6 text-gray-400 mt-2 hover:text-red-500 cursor-pointer active:scale-90"
              />
            </div>

            {/* Profile Details */}
            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-md text-gray-400 mb-3">
                  <User size={20} /> Name
                </label>
                <p className="text-md text-gray-300 bg-gray-800 p-2.5 px-4 rounded-md capitalize">
                  {user.name}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-md text-gray-400 mb-3">
                  <Mail size={20} /> Email
                </label>
                <p className="text-md text-gray-300 bg-gray-800 p-2.5 px-4 rounded-md capitalize">
                  {user.email}
                </p>
              </div>


              {/* Update Button */}
              <div className="flex justify-end">
              <button className="flex items-center gap-1 bg-blue-600 p-3.5 px-6 rounded-2xl active:scale-95 shadow-md shadow-black"
               onClick={()=>navigate('/profile',{ state: {  userId: state.userId } }  ) }
              >
               <Pencil className="w-5 h-5"/>Update
              </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
