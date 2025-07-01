import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ThemeProvider } from "@material-tailwind/react";

import Index from './Website/Index';
import AuthPages from './Website/AuthPages';
import EmailVerification from './Website/EmailVerification';
import DashboardHome from "./Dashbord/DashbordHome";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/authSingUp" element={<AuthPages type={false}/>} />
          <Route path="/authLogin" element={<AuthPages type={true}/>} />

          <Route path="/verify-email" element={<EmailVerification />} />


          <Route path="/dashboard" element={<DashboardHome />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
