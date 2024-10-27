import React, { useState } from 'react';
import '../styles/withdraw.css';

const Withdraw = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('pending');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); 
    const itemsPerPage = 2; 

    const pendingRequests = [
        { id: 'User1', date: '2024-07-08', amount: 100, wallet: 'Wallet1', ref: 'Ref1' },
        { id: 'User2', date: '2024-07-07', amount: 200, wallet: 'Wallet2', ref: 'Ref2' },
        { id: 'User3', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3' },
    ];

    const completedRequests = [
        { id: 'User4', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
        { id: 'User5', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: 'Ref3', status: 'Completed' },
    ];

    const currentData = currentTab === 'pending' ? pendingRequests : completedRequests;
    const filteredData = currentData.filter((item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search User" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">Search</button>
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
            </div>
            
            
            <div className="tab-buttons">
                <button 
                    onClick={() => {
                        setCurrentTab('pending');
                        setCurrentPage(1); 
                    }} 
                    className={currentTab === 'pending' ? 'active' : ''}
                >
                    Pending
                </button>
                <button 
                    onClick={() => {
                        setCurrentTab('completed');
                        setCurrentPage(1);
                    }} 
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
                <tbody>{renderTableData(paginatedData)}</tbody>
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

export default Withdraw;
