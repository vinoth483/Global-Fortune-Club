import React from 'react'
import {BiHome, BiTime, BiMoney, BiDetail, BiUser, BiSupport, BiSettings, }from'react-icons/bi';
import { IoIosSettings } from "react-icons/io";
import '../styles/sidebar.css';
const Sidebar = () => {
  return (
    <div className='menu'><br /><br /><br /><br /><br /><br /><br /><br />
        <div className="logo">
            <img src="1.png" alt="" />
            <h2>Global Fortune Club</h2><br />
        </div>
        <div className="menu--list">
            <a href="" className="item">
                <BiHome className="icon"/>
                Dashboard
            </a>
            <a href="" className="item">
                <BiUser className="icon"/>
                Userlist
            </a>
            <a href="" className="item">
                <BiMoney className="icon"/>
                Withdraw Request
            </a>
            <a href="" className="item">
                <BiDetail className="icon"/>
                Fc Slot Log
            </a>
            <a href="" className="item">
                <BiTime className="icon"/>
                Transaction Log
            </a>
            <a href="" className="item">
                <BiSupport className="icon"/>
                Support (Admin Chat)
            </a>
            <a href="" className="item">
                <IoIosSettings className="icon"/>
                Settings
            </a>
        </div>    
    </div>
  )
}
export default Sidebar;