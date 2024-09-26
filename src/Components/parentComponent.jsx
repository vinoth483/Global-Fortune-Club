import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Make sure the path is correct

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState('Home'); // Ensure this is set

  return (
    <div className="dashboard-container">
      <Sidebar setSelectedContent={setSelectedContent} /> {/* Passing prop here */}
      <div className="content">
        {selectedContent === 'Home' && <div>Home Content</div>}
        {selectedContent === 'Dashboard' && <div>Dashboard Content</div>}
        {selectedContent === 'UserList' && <div>User List Content</div>}
        {selectedContent === 'WithdrawRequest' && <div>Withdraw Request Content</div>}
        {selectedContent === 'FcSlotLog' && <div>Fc Slot Log Content</div>}
        {selectedContent === 'TransactionLog' && <div>Transaction Log Content</div>}
        {selectedContent === 'Support' && <div>Support (Admin Chat) Content</div>}
        {selectedContent === 'Settings' && <div>Settings Content</div>}
      </div>
    </div>
  );
};

export default Dashboard;
