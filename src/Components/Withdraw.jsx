import React, { useState } from 'react';
import '../styles/withdraw.css'; 
const Withdraw = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('pending');

    const pendingRequests = [
        { id: 'User1', date: '2024-07-08', amount: 100, wallet: 'Wallet1', ref: 'Ref1' },
        { id: 'User2', date: '2024-07-07', amount: 200, wallet: 'Wallet2', ref: 'Ref2' },
        { id: 'User3', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3' },
    ];

    const completedRequests = [
        { id: 'User4', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
        { id: 'User5', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
    ];

    const renderTableData = (data) => {
        return data.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.wallet}</td>
                <td>{item.ref}</td>
                <td>
                    <button className="action-btn">{item.status || 'Pending'}</button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="tab-buttons">
                <button 
                    onClick={() => setCurrentTab('pending')} 
                    className={currentTab === 'pending' ? 'active' : ''}
                >
                    Pending
                </button>
                <button 
                    onClick={() => setCurrentTab('completed')} 
                    className={currentTab === 'completed' ? 'active' : ''}
                >
                    Completed
                </button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Requested Date</th>
                        <th>Requested Amount</th>
                        <th>USDT Wallet ID</th>
                        <th>Transaction Ref. No</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTab === 'pending' ? renderTableData(pendingRequests) : renderTableData(completedRequests)}
                </tbody>
            </table>
        </div>
    );
};

export default Withdraw;
