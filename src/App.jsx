import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar'; 
import { Content } from './Components/Content'; 
import UserList from './Components/UserList'; 
import Withdraw from './Components/Withdraw';
import FCSlotLog from './Components/FcSlotLog'; 
import TransactionLog from './Components/TransactionLog'; 
import SupportPage from './Components/SupportPage'; 
import SettingsPage from './Components/SettingsPage';
import SignupPage from './Components/SignupPage'; 
import './App.css';
import {AuthProvider} from './context/authProvider'
const DashboardLayout = () => (
  <div className="dashboard">
    <Sidebar />
    <div className="content">
      <Routes>
      
        <Route path="/" element={<Navigate to="/dashboard/main" />} />
      
        <Route path="/main" element={<Content title="Dashboard" />} />
        
     
        <Route path="/user-list" element={<UserList title="User List" />} />
        <Route path="/withdraw-request" element={<Withdraw title="Withdraw Request" />} />
        <Route path="/fc-slot-log" element={<FCSlotLog title="FC Slot Log" />} />
        <Route path="/transaction-log" element={<TransactionLog title="Transaction Log" />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/settings" element={<SettingsPage title="Settings" />} />
      </Routes>
    </div>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        
        <Route path="/" element={<SignupPage />} />
        
       
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
