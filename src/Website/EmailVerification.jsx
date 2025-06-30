import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';

export default function EmailVerification() 
{
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || '@';

  const handleResend = () => 
{
    toast.success('Verification email sent again!');
  };

  const handleBackToLogin = () => {
     navigate('/AuthLogin');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Verify Your Email</h2>
        <p className="text-sm text-gray-300 mb-6">
          We’ve sent a verification link to your email address:
           <p className="font-semibold text-blue-400 break-all">
            {email}.
            </p>
          Please check your inbox and click the link to verify your account.
        </p>
       

        <button
          onClick={handleResend}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition mb-4"
        >
          Resend Email
        </button>

        <button
          onClick={handleBackToLogin}
          className="text-blue-400 hover:underline text-sm"
        >
          Back to Login
        </button>
      </motion.div>
    </div>
  );
}
