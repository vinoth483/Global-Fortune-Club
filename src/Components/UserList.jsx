import React, { useState } from 'react';
import { DatePicker } from "antd"; // Import DatePicker for date selection
import moment from "moment-timezone"; // For handling date formatting
import '../styles/user.css';

const UserModal = ({ user, onClose }) => {
    if (!user) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>User Details</h2>
                <table className="popup-table">
                    <tbody>
                        {Object.keys(user).map((key) => (
                            <tr key={key}>
                                <th>{key}</th>
                                <td>{user[key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserList = ({ title }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment()); // State for the selected date
    const itemsPerPage = 5;

    const userData = [
        {
            id: 1,
            name: 'User1',
            email: 'user1@example.com',
            doj: '2024-01-01',
            uplineId: 'U1001',
            mwBalance: 100,
            crowdStack: 50,
            reserveMyWallet: 30,
            totalYield: 200,
            activeSlot: 1,
            completedSlot: 0,
            cIn: 100,
            cOut: 20,
            iIn: 50,
            iOut: 10,
            referralCount: 5,
            referralIncome: 60,
            status: 'Active'
        },
        {
            id: 2,
            name: 'User2',
            email: 'user2@example.com',
            doj: '2024-01-02',
            uplineId: 'U1002',
            mwBalance: 150,
            crowdStack: 70,
            reserveMyWallet: 40,
            totalYield: 250,
            activeSlot: 2,
            completedSlot: 1,
            cIn: 200,
            cOut: 50,
            iIn: 100,
            iOut: 20,
            referralCount: 10,
            referralIncome: 80,
            status: 'Inactive'
        },
        {
            id: 3,
            name: 'User3',
            email: 'user3@example.com',
            doj: '2024-01-03',
            uplineId: 'U1003',
            mwBalance: 200,
            crowdStack: 100,
            reserveMyWallet: 60,
            totalYield: 300,
            activeSlot: 3,
            completedSlot: 2,
            cIn: 300,
            cOut: 80,
            iIn: 150,
            iOut: 30,
            referralCount: 15,
            referralIncome: 120,
            status: 'Active'
        },
        // Add more users as needed
    ];

    const filteredData = userData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleUserClick = (user) => setSelectedUser(user);
    const closeModal = () => setSelectedUser(null);
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
       
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>

            <div className="search-container">
                <DatePicker 
                    value={selectedDate} 
                    onChange={handleDateChange} 
                    format="DD-MM-YYYY"
                    style={{ marginRight: '10px' }} 
                />
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by name or status"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>MW Balance</th>
                        <th>Total Yield</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map(user => (
                            <tr key={user.id} onClick={() => handleUserClick(user)}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.mwBalance}</td>
                                <td>{user.totalYield}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button>
                <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}>
                    {[...Array(totalPages).keys()].map((page) => (
                        <option key={page} value={page + 1}>
                            Page {page + 1}
                        </option>
                    ))}
                </select>
            </div>
            {selectedUser && <UserModal user={selectedUser} onClose={closeModal} />}
        </div>
    );
};

export default UserList;
