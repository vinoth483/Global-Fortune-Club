import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import '../styles/withdraw.css'; 
import { useTransactionList } from "../hooks/adminHooks";

const TransactionLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment());
    const { isTransactionListError, transactionListError, isTransactionListLoading, TransactionListData, getTransactionList, setTransactionListData, totalPages } = useTransactionList();

    useEffect(() => {
        const requestPayload = {
            limit: 10,
            page: currentPage,
            status: currentTab,
            searchValue: searchTerm,
            date: selectedDate.format('YYYY-MM-DD'),
        };
        console.log(requestPayload);
        getTransactionList(requestPayload)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [currentPage, currentTab, searchTerm, selectedDate, getTransactionList]);

    const renderTableData = (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return (
                <tr>
                    <td colSpan="5">No data available</td>
                </tr>
            );
        }

        return data.map((transaction, index) => (
            <tr key={transaction._id}>
                <td>{index + 1}</td>
                <td>{moment(transaction.createdAt).format('DD/MM/YYYY')}</td>
                <td>{transaction.userCode}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
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

    const renderDummyContent = () => {
        const dummyData = {
            All: [{ _id: 1, createdAt: new Date(), userCode: 'User1', description: 'Transaction 1', amount: 100.00 }],
            'C-IN': [{ _id: 2, createdAt: new Date(), userCode: 'User2', description: 'C-IN Transaction', amount: 200.00 }],
            'C-OUT': [{ _id: 3, createdAt: new Date(), userCode: 'User3', description: 'C-OUT Transaction', amount: 300.00 }],
            FC: [{ _id: 4, createdAt: new Date(), userCode: 'User4', description: 'FC Transaction', amount: 400.00 }]
        };
        
        return renderTableData(dummyData[currentTab] || []);
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="search-container">
                <DatePicker 
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    format="DD/MM/YYYY"
                    style={{ marginRight: '10px' }}
                />
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by User or ID" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="refresh-btn" onClick={() => {
                    setSearchTerm('');
                    setSelectedDate(moment());
                }}>Refresh</button>
            </div>
            <div className="tab-buttons">
                <button 
                    onClick={() => setCurrentTab('All')} 
                    className={currentTab === 'All' ? 'active' : ''} 
                    aria-pressed={currentTab === 'All'}
                >
                    All
                </button>
                <button 
                    onClick={() => setCurrentTab('FC')} 
                    className={currentTab === 'FC' ? 'active' : ''} 
                    aria-pressed={currentTab === 'FC'}
                >
                    FC
                </button>
                <button 
                    onClick={() => setCurrentTab('C-IN')} 
                    className={currentTab === 'C-IN' ? 'active' : ''} 
                    aria-pressed={currentTab === 'C-IN'}
                >
                    C-IN
                </button>
                <button 
                    onClick={() => setCurrentTab('C-OUT')} 
                    className={currentTab === 'C-OUT' ? 'active' : ''} 
                    aria-pressed={currentTab === 'C-OUT'}
                >
                    C-OUT
                </button>
                <button 
                    onClick={() => setCurrentTab('INTERNAL')} 
                    className={currentTab === 'INTERNAL' ? 'active' : ''} 
                    aria-pressed={currentTab === 'INTERNAL'}
                >
                    INTERNAL
                </button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>User ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {!isTransactionListLoading ? renderDummyContent() : (
                        <tr>
                            <td colSpan="5">Loading</td>
                        </tr>
                    )}
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

TransactionLog.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TransactionLog;
