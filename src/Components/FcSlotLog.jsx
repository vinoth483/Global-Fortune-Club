import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/withdraw.css'; 

const FCSlotLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('active');

    const activeSlots = [
        { id: 'Slot1', date: '2024-07-08', amount: 100, wallet: 'Wallet1', ref: 'Ref1' },
        { id: 'Slot2', date: '2024-07-07', amount: 200, wallet: 'Wallet2', ref: 'Ref2' },
        { id: 'Slot3', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3' },
    ];

    const completedSlots = [
        { id: 'Slot4', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
        { id: 'Slot5', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
    ];

    const renderTableData = (data) => {
        return data.map(({ id, date, amount, wallet, ref, status }, index) => (
            <tr key={id}>
                <td>{index + 1}</td> 
                <td>{id}</td>
                <td>{ref}</td>
                <td>{date}</td>
                <td>{amount} USDT</td> 
                <td>{amount * 1.1} USDT</td>
                <td>
                    <button className="action-btn" aria-label={`${status || 'Active'} for ${id}`}>
                        {status || 'Active'}
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="tab-buttons">
                <button 
                    onClick={() => setCurrentTab('active')} 
                    className={currentTab === 'active' ? 'active' : ''}
                    aria-pressed={currentTab === 'active'}
                >
                    Active Slots
                </button>
                <button 
                    onClick={() => setCurrentTab('completed')} 
                    className={currentTab === 'completed' ? 'active' : ''}
                    aria-pressed={currentTab === 'completed'}
                >
                    Completed Slots
                </button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Slot ID</th>
                        <th>Ref ID</th>
                        <th>Joining Date</th>
                        <th>Current Yield</th>
                        <th>Total Yield</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTab === 'active' ? renderTableData(activeSlots) : renderTableData(completedSlots)}
                </tbody>
            </table>
        </div>
    );
};

FCSlotLog.propTypes = {
    title: PropTypes.string.isRequired,
};

export default FCSlotLog;
