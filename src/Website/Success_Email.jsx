import { CheckCircle, ChartSpline } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success_Email() {
    return (
        <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-950 px-4">

            <CheckCircle className="text-green-600 w-20 h-20 mb-6" />
            <h1 className="text-3xl font-bold text-white   mb-4">Email Verified!</h1>
            <p className="text-gray-300 text-center mb-6">
                Your email has been successfully verified. You can now log in to your account.
            </p>
            <Link
                to="/authLogin"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
                Go to Login
            </Link>
        </div>
    );
}
