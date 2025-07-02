import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ThemeProvider } from "@material-tailwind/react";

import Index from './Website/Index';
import AuthPages from './Website/AuthPages';
import EmailVerification from './Website/EmailVerification'
import ListShow from "./Dashbord/ListShow";
import DashbordHome from "./Dashbord/DashbordHome";


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
          <Route path="/list" element={<ListShow />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
