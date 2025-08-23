import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ThemeProvider } from "@material-tailwind/react";

import Index from './Website/Index';
import AuthPages from './Website/AuthPages';
import EmailVerification from './Website/EmailVerification'
import DashbordHome from "./Dashbord/DashbordHome";
import FundDetail from "./Detail/FundDetail";
import ListFund from "./Dashbord/ListFund";
import Demo from "./Features/Demo";
import FundAnalysis from "./Features/FundAnalysis";
import LoddingPage from "./LoddingPage";
import Success_Email from "./Website/Success_Email";
import QuickAddFund from "./Dashbord/QuickAddFund";
import Profile from "./Profile_Section/Profile";
import ForgotPasswordPopup from "./Website/ForgotPasswordPopup";



function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>

          <Route path="/" element={<LoddingPage />} />
          
          <Route path="/index" element={<Index />} />

          <Route path="/authSingUp" element={<AuthPages type={false}/>} />
          <Route path="/authLogin" element={<AuthPages type={true}/>} />

          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/verify-success" element={<Success_Email />} />


          <Route path="/dashboard" element={<DashbordHome />} />
          <Route path="/list" element={<ListFund />} />
          <Route path="/quick-add" element={<QuickAddFund />} />

          <Route path="/fund-detail" element={<FundDetail/>} />

          <Route path="/profile" element={<Profile/>} />
          
          <Route path="/forgatePassword" element={<ForgotPasswordPopup/>} />

          <Route path="/analysis" element={<FundAnalysis/>} />

        </Routes>
      </Router> 
    </ThemeProvider>
  );
}

export default App;
