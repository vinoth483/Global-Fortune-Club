import React from 'react';
import { BiHome, BiUser, BiMoney, BiDetail, BiTime, BiSupport } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';
import '../styles/sidebar.css';

const Sidebar = ({ setSelectedContent }) => {
  console.log('setSelectedContent:', setSelectedContent);
  return (
    <div className="menu">
      <div className="logo">
        <h2>Global Fortune Club</h2>
      </div>
      <div className="menu--list">
        <div className="item" onClick={() => setSelectedContent('Home')}>
          <BiHome className="icon" />
          Home
        </div>
        <div className="item" onClick={() => setSelectedContent('Dashboard')}>
          <BiHome className="icon" />
          Dashboard
        </div>
        <div className="item" onClick={() => setSelectedContent('UserList')}>
          <BiUser className="icon" />
          User List
        </div>
        <div className="item" onClick={() => setSelectedContent('WithdrawRequest')}>
          <BiMoney className="icon" />
          Withdraw Request
        </div>
        <div className="item" onClick={() => setSelectedContent('FcSlotLog')}>
          <BiDetail className="icon" />
          Fc Slot Log
        </div>
        <div className="item" onClick={() => setSelectedContent('TransactionLog')}>
          <BiTime className="icon" />
          Transaction Log
        </div>
        <div className="item" onClick={() => setSelectedContent('Support')}>
          <BiSupport className="icon" />
          Support (Admin Chat)
        </div>
        <div className="item" onClick={() => setSelectedContent('Settings')}>
          <IoIosSettings className="icon" />
          Settings
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
