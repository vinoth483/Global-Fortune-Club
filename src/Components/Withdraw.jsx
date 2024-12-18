import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import '../styles/withdraw.css';

const Withdraw = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('pending');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;
    const [selectedDate, setSelectedDate] = useState(moment());
    const [showPopup, setShowPopup] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [completedIds, setCompletedIds] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [pendingRequests, setPendingRequests] = useState([
        { id: 'User1', date: '2024-07-08', amount: 100, wallet: 'Wallet1', ref: '' },
        { id: 'User2', date: '2024-07-07', amount: 200, wallet: 'Wallet2', ref: '' },
        { id: 'User3', date: '2024-07-07', amount: 300, wallet: 'Wallet3', ref: '' },
        { id: 'User4', date: '2024-07-09', amount: 400, wallet: 'Wallet4', ref: '' },
        { id: 'User5', date: '2024-07-10', amount: 500, wallet: 'Wallet5', ref: '' },
        { id: 'User6', date: '2024-07-11', amount: 600, wallet: 'Wallet6', ref: '' },
        { id: 'User7', date: '2024-07-12', amount: 700, wallet: 'Wallet7', ref: '' },
        { id: 'User8', date: '2024-07-13', amount: 800, wallet: 'Wallet8', ref: '' },
        { id: 'User9', date: '2024-07-14', amount: 900, wallet: 'Wallet9', ref: '' },
        { id: 'User10', date: '2024-07-15', amount: 1000, wallet: 'Wallet10', ref: '' },
        { id: 'User11', date: '2024-07-16', amount: 1100, wallet: 'Wallet11', ref: '' },
    ]);

    const [completedRequests, setCompletedRequests] = useState([]);
    const [transactionRefs, setTransactionRefs] = useState({});

    const currentData = currentTab === 'pending' ? pendingRequests : completedRequests;

    const filteredData = currentData.filter((item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const renderTableData = (data) => {
        return data.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.wallet}</td>
                <td>
                    <div className="input-container">
                        <input
                            type="text"
                            className="no-border-input"
                            value={transactionRefs[item.id] || item.ref}
                            onChange={(e) => setTransactionRefs(prev => ({
                                ...prev,
                                [item.id]: e.target.value,
                            }))}
                            onFocus={() => setEditingId(item.id)}
                        />
                        {editingId === item.id && (
                            <button 
                                className="save-btn" 
                                onClick={() => {
                                    setEditingId(null);
                                    setTransactionRefs(prev => ({
                                        ...prev,
                                        [item.id]: transactionRefs[item.id]
                                    }));
                                }}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </td>

                {currentTab === 'pending' && (
                    <td>
                        <button 
                            className="action-btn" 
                            onClick={() => {
                                setSelectedRequest(item);
                                setShowPopup(true);
                            }}
                        >
                            {completedIds.includes(item.id) ? 'Complete' : 'Pending'}
                        </button>
                    </td>
                )}
            </tr>
        ));
    };

    const handleCompleteRequest = () => {
        if (selectedRequest) {
            setCompletedIds((prev) => [...prev, selectedRequest.id]);
            setCompletedRequests((prev) => [...prev, selectedRequest]);
            setPendingRequests((prev) => prev.filter(request => request.id !== selectedRequest.id));
            setShowPopup(false);
            setSelectedRequest(null);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setTransactionRefs({});
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

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="search-container">
                <DatePicker 
                    value={selectedDate} 
                    onChange={(date, dateString) => setSelectedDate(dateString)} 
                    format="DD-MM-YYYY" 
                    style={{ marginRight: '10px' }} 
                />
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search User" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                    Pending ({pendingRequests.length})
                </button>
                <button 
                    onClick={() => {
                        setCurrentTab('completed');
                        setCurrentPage(1);
                    }} 
                    className={currentTab === 'completed' ? 'active' : ''}
                >
                    Completed ({completedRequests.length})
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
                        {currentTab === 'pending' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>{renderTableData(paginatedData)}</tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    &lt;
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                >
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

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Approval Request</h2>
                        <p>Are you sure you want to approve this request for {selectedRequest.id}?</p>
                        <button onClick={handleCompleteRequest}>Approve</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Withdraw;
