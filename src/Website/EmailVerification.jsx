import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { MailCheck } from 'lucide-react';

export default function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || 'your@email.com';

  const handleResend = () => {
    toast.success('Verification email sent again!', {
      style: { background: '#1f2937', color: '#fff' },
      position: 'top-center',
    });
  };

  const handleBackToLogin = () => {
    navigate('/authLogin');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center px-4">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg w-full max-w-md text-center"
      >
        {/* Optional Email Icon */}
        <div className="flex justify-center mb-4">
          <MailCheck className="text-blue-400 w-10 h-10" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
        <p className="text-sm text-gray-400 mb-6">
          We’ve sent a verification link to your email address:
        </p>

        {/* Email */}
        <p className="font-medium text-blue-400 text-sm mb-6 break-words">{email}</p>

        {/* Action Buttons */}
        <button
          onClick={handleResend}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition mb-3"
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
