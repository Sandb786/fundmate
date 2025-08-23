import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ChartSpline, ArrowLeft } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import ForgotPasswordPopup from './ForgotPasswordPopup';

export default function AuthPages({ type }) {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgatePassword,setShowForgatePassword]=useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;



    if (isLogin) {
      const promise = axios.post('http://localhost:8083/login', submitData);

      toast.promise(promise, { loading: 'Logging in...' });

      promise
        .then((response) => {
          if (response.status === 200) {
            toast.success('Login successful!');
            navigate('/dashboard', { state: { userId: response.data } });
          }
        })
        .catch((error) => {

          // 1. if User Not Found
          if (error.response.status === 404) {
            toast('User Not Found. Please SingUp.', {
              icon: 'ℹ️',
              duration: 3000,
              style: {
                border: '1px solid gray', // blue border
                padding: '12px',
                color: 'white',
              }
            });
            setIsLogin(false);
            return;
          }

          if (error.response.status === 401) {
            toast.error('Incorrect Password..');
            return;
          }

          console.error('Login error:', error);
        });

      //navigate('/dashboard',{state: { email: submitData.email } });

    }
    else {
      // Handle sign up logic
      const promise = axios.post('http://localhost:8083/createUser', submitData);

      toast.promise(
        promise,
        {
          loading: 'Creating account...',
        },)

      promise
        .then((response) => {
          toast.success('Account created successfully!' + response.status);
          navigate('/verify-email', { state: { email: submitData.email } });
        })
        .catch((error) => {

          if (error.response.status == 409) {
            toast('User already exists. Please login instead.', {
              icon: 'ℹ️',
              duration: 3000,
              style: {
                border: '1px solid gray', // blue border
                padding: '12px',
                color: 'white',
              },
            });
            setIsLogin(true);
            return;
          }

          toast.error('Sign up failed. Please try again.');
          console.error('Sign up error:', error);
        });


    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0d0d0d] px-5 py-3 flex  justify-between shadow-md">
        <button
          onClick={() => navigate("/index")}
          className="text-gray-400 hover:text-gray-200 transition active:scale-95"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <h1 className="text-lg font-semibold text-white tracking-tight">FundMate</h1>
        <div className="w-6"></div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto"
          >
            {/* Logo + App Name */}
            <div className="flex flex-col items-center mb-15 mt-3">
              <ChartSpline className="text-blue-400 w-20 h-20 mb-2" />
              <span className="text-3xl font-bold text-blue-400 tracking-wide">FundMate</span>
            </div>

            {/* Page Heading */}
            <div className="mb-8 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                {isLogin ? 'Login' : 'Sign Up'}
              </p>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {isLogin ? 'Sign in to continue' : 'Create your account'}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-base"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-base"
                  required
                />
              </div>

              <div className="relative w-full max-w-md mx-auto">

                <label className="block text-sm text-gray-400 mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  className="w-full bg-[#1a1a1a] text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-base"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

         
        

            {/* Switch Link */}
            <p className="text-center text-sm text-gray-400 mt-8">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:underline ml-1"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>

                 {/* Forgot Password */} |

              <button
                onClick={() => {setShowForgatePassword(!showForgatePassword)}}
                className="text-blue-500 hover:underline ml-2"
              >
               Forget Password
              </button>

            </p>


          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4 border-t border-gray-800 bg-[#0d0d0d]">
        © 2025 FundMate. All rights reserved.
      </footer>


      <ForgotPasswordPopup isOpen={showForgatePassword} setIsOpen={setShowForgatePassword}/>

    </div>
  );
}
