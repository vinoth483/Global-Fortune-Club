import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/withdraw.css'; 

const FCSlotLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('active');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); 
    const itemsPerPage = 2; 

    const activeSlots = [
        { id: 'Slot1', date: '2024-07-08', amount: 100, wallet: 'Wallet1', ref: 'Ref1' },
        { id: 'Slot2', date: '2024-07-07', amount: 200, wallet: 'Wallet2', ref: 'Ref2' },
        { id: 'Slot3', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3' },
    ];

    const completedSlots = [
        { id: 'Slot4', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
        { id: 'Slot5', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
    ];

    const currentData = currentTab === 'active' ? activeSlots : completedSlots;

 
    const filteredSlots = currentData.filter(slot =>
        slot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.ref.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSlots.length / itemsPerPage);

    const renderTableData = (data) => {
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan="7">No data available</td>
                </tr>
            );
        }

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

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.value));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredSlots.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="card-container">
            <h1>{title}</h1>

            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by Slot ID or Ref ID" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">Search</button>
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
            </div>
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
                    {renderTableData(paginatedData)}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    &lt; 
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    &gt;
                </button>
                <select value={currentPage} onChange={handlePageChange}>
                    {[...Array(totalPages).keys()].map((page) => (
                        <option key={page} value={page + 1}>
                            Page {page + 1}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

FCSlotLog.propTypes = {
    title: PropTypes.string.isRequired,
};

export default FCSlotLog;
