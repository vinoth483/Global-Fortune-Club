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

const DashboardLayout = () => (
  <div className="dashboard">
    <Sidebar />
    <div className="content">
      <Routes>
        {/* Redirect /dashboard to /dashboard/main */}
        <Route path="/" element={<Navigate to="/dashboard/main" />} />
        
        {/* Main dashboard content */}
        <Route path="/main" element={<Content title="Dashboard" />} />
        
        {/* Other routes for your components */}
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
    <Router>
      <Routes>
        {/* Route for signup page */}
        <Route path="/" element={<SignupPage />} />
        
        {/* Route for dashboard layout */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
