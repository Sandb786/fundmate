import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChartSpline } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoddingPage() {
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [connectionStatus, setConnectionStatus] = useState('🚀 Connecting to application...');
    const navigate = useNavigate();

    // ⏳ Countdown for user feedback
    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 1;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 🌐 Try connecting every 3 seconds until successful or timeout
    useEffect(() => {

        const tryConnect = () => {
            axios.get('https://fundmatebackend-production.up.railway.app/')
                .then(() => {
                    setConnectionStatus('✅ Connected to application!');
                    navigate('/index');
                })
                .catch(() => {
                    setConnectionStatus('🔄 Still trying to connect...');
                });
        };

        const connectInterval = setInterval(() => 
        {
            tryConnect();
        }, 3000);

        return () => clearInterval(connectInterval);
    }, [navigate]);

    return (
        <div className="h-screen bg-gray-900 flex flex-col items-center justify-center relative space-y-10">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <ChartSpline className="text-blue-400 w-15 h-15" />
                <h1 className="text-6xl text-blue-400">FundMate</h1>
            </div>

            {/* Spinner & Status */}
            <div className="flex items-center space-x-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                <p className="text-gray-400 text-lg">{connectionStatus} ({secondsLeft}s)</p>
            </div>

            {/* Countdown Note */}
            <div className="absolute bottom-6 text-center px-4">
                <p className="text-gray-400 text-md">
                    <strong>Note:</strong> We are using a free server which may take up to
                    <span className="text-blue-400 font-semibold"> 60 seconds</span> to wake up. Thank you for your patience.
                </p>
            </div>
        </div>
    );
}
