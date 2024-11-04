import React from 'react';
import { BiHome, BiUser, BiMoney, BiDetail, BiTime, BiSupport } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <div className="logo">
        <h2>Global Fortune Club</h2>
      </div>
      <div className="menu--list">
        <Link to="/dashboard/main" className={`item ${location.pathname === '/dashboard/main' ? 'active' : ''}`}>
          <BiHome className="icon" />
          Dashboard
        </Link>
        <Link to="/dashboard/user-list" className={`item ${location.pathname === '/dashboard/user-list' ? 'active' : ''}`}>
          <BiUser className="icon" />
          User List
        </Link>
        <Link to="/dashboard/withdraw-request" className={`item ${location.pathname === '/dashboard/withdraw-request' ? 'active' : ''}`}>
          <BiMoney className="icon" />
          Withdraw Request
        </Link>
        <Link to="/dashboard/fc-slot-log" className={`item ${location.pathname === '/dashboard/fc-slot-log' ? 'active' : ''}`}>
          <BiDetail className="icon" />
          FC Slot Log
        </Link>
        <Link to="/dashboard/transaction-log" className={`item ${location.pathname === '/dashboard/transaction-log' ? 'active' : ''}`}>
          <BiTime className="icon" />
          Transaction Log
        </Link>
        <Link to="/dashboard/support" className={`item ${location.pathname === '/dashboard/support' ? 'active' : ''}`}>
          <BiSupport className="icon" />
          Support (Admin Chat)
        </Link>
        <Link to="/dashboard/settings" className={`item ${location.pathname === '/dashboard/settings' ? 'active' : ''}`}>
          <IoIosSettings className="icon" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
