import React, { useEffect, useState } from "react";
import { CircleX, Save, KeyRound, Mail, CheckCircle, Check, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ForgotPasswordPopup(state) 
{
    // const location=useLocation();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [statuses, setStatuses] = useState([]);
    const [orignalOtp,setOrignalOtp]=useState();

    const handleClose=()=>
    {
        state.setIsOpen(false)

        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setStatuses([]);

    }
    

    const sendOtpEmail=()=>
    {

        const promis = axios.post(`/resetPassword/sendOtp/${email.toLowerCase()}`);

        toast.promise(promis, {
            loading: "Sending Email....",
            success: "OTP send successfully!",
        });

        promis
            .then((res) => 
            {
                setStatuses([...statuses, "otp send"]);
                setOrignalOtp(res.data);
            })
            .catch((error) => 
            {
                console.error("Error resetting password:", error);
                if (error.status==404) 
                {
                  toast.error(error.response.data)   
                }
            });

    }

    const OtpVerification=()=>
    {
        if(otp==orignalOtp) 
        {
            toast.success("Done");
           setStatuses([...statuses, "otp done"]);
        }
        else
        {
            toast.error("invalid otp");
        }
    }

    const handleResetPassword = () => 
    {
        if(newPassword.length<6||confirmPassword.length<6) 
        {
            return toast.error("Password Length must be 6 or more..");    
        }

        if (!email || !otp || !newPassword || !confirmPassword) {
            return toast.error("Fill all required fields!");
        }

        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        if(!statuses.includes("otp done"))
        {
            return toast.error("Please verify OTP first!");
        }

        const payload = { email: email.toLowerCase(), password: newPassword };

        const promis = axios.post("/resetPassword", payload);

        toast.promise(promis, {
            loading: "Resetting password...",
            success: "Password reset successfully!",
            error: "Failed to reset password.",
        });

        promis
            .then(() => 
            {
                setStatuses([]);
                state.setIsOpen(false);
            })
            .catch((error) => {
                console.error("Error resetting password:", error);
            });

        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <>
            <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff' } }} />

            {state.isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-950 border border-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <KeyRound className="text-blue-500 w-7 h-7" />
                                <h2 className="text-lg font-semibold text-white">
                                    Forgot Password
                                </h2>
                            </div>
                            <CircleX
                                className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer"
                                onClick={handleClose}
                            />
                        </div>

                        {/* Form */}
                        <div className="space-y-5">

                            
                            {/* Email with Submit button on right */}
                            <div>
                                <label className="text-sm text-gray-300 block mb-1.5">
                                    Email
                                </label>
                                <div className="flex">
                                    <input
                                        type="email"
                                        disabled={statuses.includes("otp send")}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        type="submit"
                                        disabled={statuses.includes("otp send")}
                                        onClick={sendOtpEmail} // replace with your function
                                        className={`px-4 py-2  ${ statuses=="otp send" ?'bg-green-600':'bg-blue-600'}  text-white font-medium rounded-r-lg shadow-md focus:outline-none`}>

                                       { statuses.includes("otp send") ? <Check/> :  <Send size={20}/> }

                                    </button>

                                </div>
                            </div>


                            {/* OTP */}
                            <div>
                                <label className="text-sm text-gray-300 block mb-1.5">OTP</label>
                                <div className="flex gap-5">
                                    <input
                                        type="text"
                                         disabled={statuses.includes("otp done")}
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {

                                   statuses.includes("otp done") ?

                                    <div className=" p-1 rounded-2xl">
                                        <CheckCircle size={38} className="text-blue-500 "/>
                                    </div>

                                    :
                                    <button type="submit"
                                        onClick={OtpVerification} // replace with your function
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md focus:outline-none active:scale-95"
                                    >
                                        Submit
                                    </button>

                                    }

                                </div>
                            </div>

                        
                        
                            
                            {/* New Password */}
                            <div>
                                <label className="text-sm text-gray-300 block mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="text-sm text-gray-300 block mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                onClick={handleResetPassword}
                                disabled={!email.trim() || !otp.trim() || !newPassword.trim() || !confirmPassword.trim() || !statuses.includes("otp done")}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" /> Reset Password
                            </button>
                        </div>

                    </motion.div>
                </div>
            )}
        </>
    );
}
