// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar'; 
import { Content } from './Components/Content'; 
import UserList from './Components/UserList'; 
import Withdraw from './Components/Withdraw';
import FCSlotLog from './Components/FcSlotLog'; 
import TransactionLog from './Components/TransactionLog'; 
import SupportPage from './Components/SupportPage'; 
import SettingsPage from './Components/SettingsPage'; // Import SettingsPage

import './App.css';

const App = () => {
  return (
    <div className='dashboard'>
      <Router>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Content title="Welcome to the Home Page" />} />
            <Route path="/dashboard" element={<Content title="Dashboard" />} />
            <Route path="/users" element={<UserList title="User List" />} />
            <Route path="/withdraw" element={<Withdraw title="Withdraw Request" />} />
            <Route path="/fc-slot-log" element={<FCSlotLog title="FC Slot Log" />} />
            <Route path="/transaction-log" element={<TransactionLog title="Transaction Log" />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/settings" element={<SettingsPage />} /> 
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
