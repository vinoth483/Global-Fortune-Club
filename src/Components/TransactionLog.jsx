import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/withdraw.css'; 

const TransactionLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('All');

    const allTransactions = [
        { id: 'Trans1', user: 'User1', userId: 'ID1', amount: 100, status: 'Active' },
        { id: 'Trans2', user: 'User2', userId: 'ID2', amount: 200, status: 'Active' },
        { id: 'Trans3', user: 'User3', userId: 'ID3', amount: 300, status: 'Completed' },
    ];

    const renderTableData = (data) => {
        const filteredData = data.filter(transaction => currentTab === 'All' || transaction.status === currentTab);
        
        if (filteredData.length === 0) {
            return (
                <tr>
                    <td colSpan="5">No data available</td>
                </tr>
            );
        }

        return filteredData.map((transaction, index) => (
            <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.user}</td>
                <td>{transaction.userId}</td>
                <td>{transaction.amount} USDT</td>
                <td>{transaction.status}</td>
            </tr>
        ));
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="tab-buttons">
                <button 
                    onClick={() => setCurrentTab('All')} 
                    className={currentTab === 'All' ? 'active' : ''}
                    aria-pressed={currentTab === 'All'}
                >
                    All
                </button>
                <button 
                    onClick={() => setCurrentTab('Active')} 
                    className={currentTab === 'Active' ? 'active' : ''}
                    aria-pressed={currentTab === 'Active'}
                >
                    Active
                </button>
                <button 
                    onClick={() => setCurrentTab('Completed')} 
                    className={currentTab === 'Completed' ? 'active' : ''}
                    aria-pressed={currentTab === 'Completed'}
                >
                    Completed
                </button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>User Name</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableData(allTransactions)}
                </tbody>
            </table>
        </div>
    );
};

TransactionLog.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TransactionLog;
