// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Components/Sidebar'; 
import { Content } from './Components/Content'; 
import UserList from './Components/UserList'; 
import Withdraw from './Components/Withdraw';
import FCSlotLog from './Components/FcSlotLog'; 
import TransactionLog from './Components/TransactionLog'; 
import SupportPage from './Components/SupportPage'; 
import SettingsPage from './Components/SettingsPage';

import './App.css';

const App = () => {
  const [selectedContent, setSelectedContent] = useState('Home');

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className='dashboard'>
      <BrowserRouter>
        <Sidebar setSelectedContent={handleContentChange} />
        <div className="content">
          {selectedContent === 'Home' && <Content title="Welcome to the Home Page" />}
          {selectedContent === 'Dashboard' && <Content title="Dashboard" />}
          {selectedContent === 'UserList' && <UserList title="User List" />}
          {selectedContent === 'WithdrawRequest' && <Withdraw title="Withdraw Request" />}
          {selectedContent === 'FcSlotLog' && <FCSlotLog title="FC Slot Log" />} 
          {selectedContent === 'TransactionLog' && <TransactionLog title="Transaction Log" />}
          {selectedContent === 'Support' && <SupportPage />} {/* Update to render SupportPage */}
          {selectedContent === 'Settings' && <SettingsPage title="Settings" />}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
