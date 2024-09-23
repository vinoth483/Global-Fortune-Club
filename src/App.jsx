import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Components/Sidebar'; 
import { Content } from './Components/Content'; 
import UserList from './Components/UserList'; 
import Withdraw from './Components/Withdraw'; // Import the Withdraw component
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
          {selectedContent === 'FcSlotLog' && <Content title="Fc Slot Log" />}
          {selectedContent === 'TransactionLog' && <Content title="Transaction Log" />}
          {selectedContent === 'Support' && <Content title="Support" />}
          {selectedContent === 'Settings' && <Content title="Settings" />}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
