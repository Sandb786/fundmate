import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ChartSpline, House, User, Mail, Lock, Edit, Save, X, Eye, EyeOff, ListRestart, Trash2, CircleX, KeyRound } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import OTPPopup from './OTPPopup';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const [form, setForm] = useState({ name: '' });
  const [originalData, setOriginalData] = useState({});
  const [orignalOtp, setOrignalOtp] = useState();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com)$/;

  // For Testing purpose only
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



  // Fatch Data frrom Server
  const fatch = () => {

    axios.get(`http://localhost:8083/userdetail?userId=${userId}&type=fullDetail`)
      .then(res => {
        setForm(res.data);
        setOriginalData(res.data);
      })
      .catch(error => {
        console.log(error)
        toast.error("While fatching User Detils")
      }
      )
  }

  useEffect(() => {
    fatch();
  }, [])


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (type) => {

    switch (type) {

      case "name":

        const promis = axios.patch(`http://localhost:8083/updateName/${form.id}?newName=${form.name}`)
        toast.promise(promis, {
          loading: 'Please Wait..',
          success: 'Saved'
        });
        promis
          .then((res) => { fatch() })
          .catch((error) => { console.log(error) })

        break;

      case "email":

        if (emailRegex.test(form.email)) {
          const promis = axios.patch(`http://localhost:8083/updateEmail/${form.id}?newEmail=${form.email}&isVerified=${false}`)
          toast.promise(promis, {
            loading: 'Please Wait..',
            success: 'OTP Send'
          });
          promis
            .then((res) => {
              setOrignalOtp(res.data);
              setShowOtpPopup(true);
            })
            .catch((error) => {
              console.log(error.response.data);
              if (error.response.status == 409) {
                toast.error(error.response.data);
              }
            })
        }
        else {
          toast.error("Invalid Email — only @gmail.com is accepted");
        }


        break;

      default:
        break;
    }

  };


  const OtpValidator = () => {
    setShowOtpPopup(false);

    const promis = axios.patch(`http://localhost:8083/updateEmail/${form.id}?newEmail=${form.email}&isVerified=${true}`)
    toast.promise(promis, {
      loading: 'Please Wait..',
    });
    promis
      .then((res) => {
        console.log(form.email);
        fatch();
        toast.success(res.data);
      })
      .catch((error) => {
        console.log(error.data);
      })

  }



  return (

    <div className="min-h-screen text-gray-100 bg-black flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }}
      />

      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 sticky top-0 z-20 border-2 border-gray-950 ">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChartSpline className="text-blue-400 w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-400">FundMate</h1>
        </div>
        <House
          className="text-gray-400 w-8 h-8 cursor-pointer hover:text-white transition"
          onClick={() => navigate(-1)}
        />
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto bg-black">

        <section className="md:px-25 px-11 py-15 max-w-full mx-auto  ">

          {/* Profile Header */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-6xl font-bold shadow-lg">
              {form.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-3xl font-bold mt-4">{form.name}</h2>
            <p className="text-gray-400 text-sm">Long time user of Fundmate</p>
          </div>

          {/* Details */}
          <div className="space-y-10">

            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 uppercase tracking-wide">
                <User size={18} /> Name
              </label>
              {isEditing ? (
                <div className='flex gap-5'>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-700 px-3 py-2 text-lg bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() => handleSave("name")}
                    disabled={form.name === originalData.name}
                    className={`p-2 px-4 rounded-lg active:scale-95 flex items-center gap-2 transition-colors
                       ${form.name !== originalData.name
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                  > <Save size={18} /></button>
                </div>
              ) : (
                <p className="text-lg text-gray-200 border-b border-gray-700 pb-2">{form.name}</p>

              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 uppercase tracking-wide">
                <Mail size={18} /> Email
              </label>
              {isEditing ? (
                <div className='flex gap-5'>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-700 px-3 py-2 text-lg bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() => handleSave("email")}
                    disabled={form.email === originalData.email}
                    className={`p-2 px-4 rounded-lg active:scale-95 flex items-center gap-2 transition-colors
                       ${form.email !== originalData.email
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                  > <Save size={18} /></button>
                </div>
              ) : (
                <p className="text-lg text-gray-200 border-b border-gray-700 pb-2">{form.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 uppercase tracking-wide">
                <Lock size={18} /> Password
              </label>
              {isEditing ? (

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border-b border-gray-700 px-3 py-2 text-lg bg-transparent focus:outline-none pr-10"
                  />


                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-5 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>



              <p className="text-sm text-gray-600 mt-2">
                To change your password, please go to the{" "}
                <a href="/authLogin" className="text-blue-600 font-medium hover:underline">
                  Forgot Password
                </a> section in Login page.
              </p>

                </div>
              ) : (
                <p className="text-lg text-gray-200 border-b border-gray-700 pb-2">•••••••</p>
              )}

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg active:scale-95 "
              >
                <Edit size={18} /> Edit Profile
              </button>
            ) : (
              <>
                {/* <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg active:scale-95 "
                >
                  <Save size={18} /> Save Changes
                </button> */}
                <button
                  onClick={() => { setIsEditing(false); fatch() }}
                  className="flex items-center gap-2 px-6 py-3 bg-red-700  rounded-lg active:scale-95 "
                >
                  <X size={18} /> Cancel
                </button>
              </>
            )}
          </div>

        </section>

      </main>


      {
        //That’s a conditional render in React 👍
        //
        showOtpPopup && (<OTPPopup orignalOtp={orignalOtp} OtpValidator={OtpValidator} />)
      }

    </div>



  );
}