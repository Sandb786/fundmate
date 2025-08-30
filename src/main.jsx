import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios';

// ✅ Set default baseURL once
// You set a global axios.defaults.baseURL at the app entry point

axios.defaults.baseURL = "https://fundmate.up.railway.app";

createRoot(document.getElementById('root')).render(
 
    <App />
 
)
