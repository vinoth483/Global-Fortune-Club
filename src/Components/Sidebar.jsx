import React from 'react';
import { BiHome, BiUser, BiMoney, BiDetail, BiTime, BiSupport } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <h2>Global Fortune Club</h2>
      </div>
      <div className="menu--list">
        <Link to="/dashboard/main" className="item">
          <BiHome className="icon" />
          Dashboard
        </Link>
        <Link to="/dashboard/user-list" className="item">
          <BiUser className="icon" />
          User List
        </Link>
        <Link to="/dashboard/withdraw-request" className="item">
          <BiMoney className="icon" />
          Withdraw Request
        </Link>
        <Link to="/dashboard/fc-slot-log" className="item">
          <BiDetail className="icon" />
          FC Slot Log
        </Link>
        <Link to="/dashboard/transaction-log" className="item">
          <BiTime className="icon" />
          Transaction Log
        </Link>
        <Link to="/dashboard/support" className="item">
          <BiSupport className="icon" />
          Support (Admin Chat)
        </Link>
        <Link to="/dashboard/settings" className="item">
          <IoIosSettings className="icon" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
