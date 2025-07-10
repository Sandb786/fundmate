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


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/authSingUp" element={<AuthPages type={false}/>} />
          <Route path="/authLogin" element={<AuthPages type={true}/>} />

          <Route path="/verify-email" element={<EmailVerification />} />


          <Route path="/dashboard" element={<DashbordHome />} />
          <Route path="/list" element={<ListFund />} />

          <Route path="/fund-detail" element={<FundDetail/>} />

          <Route path="/demo" element={<Demo/>} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
