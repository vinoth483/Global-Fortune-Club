import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
import moment from 'moment';
import '../styles/withdraw.css';
import { useTransactionList } from "../hooks/adminHooks";

const TransactionLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const { isTransactionListError, transactionListError, isTransactionListLoading, TransactionListData, getTransactionList, setTransactionListData, totalPages } = useTransactionList();

    useEffect(() => {
        const requestPayload = {
            limit: 10,
            page: currentPage,
            status: currentTab,
            searchValue: searchTerm,

        };
         if(fromDate!=null && toDate!=null){
            requestPayload["fromDate"] = fromDate
            requestPayload["toDate"] = toDate
        }
        console.log(requestPayload)
        if((fromDate!=null && toDate!=null) || (fromDate==null && toDate==null)){
        getTransactionList(requestPayload)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [currentPage, currentTab, searchTerm, fromDate, toDate]);

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
                <td>{transaction.status}</td>
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
    const handleReset = ()=>{
        setFromDate(null)
        setToDate(null)
    }

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="search-container">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                    {/* Input container for side-by-side layout */}
                    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label>From Date:</label>
                            <input
                                type="date"
                                value={fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : ""}
                                onChange={(e) => setFromDate(e.target.value)}
                                style={{ padding: "5px", width: "150px" }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label>To Date:</label>
                            <input
                                type="date"
                                value={toDate ? dayjs(toDate).format("YYYY-MM-DD") : ""}
                                onChange={(e) => setToDate(e.target.value)}
                                style={{ padding: "5px", width: "150px" }}
                            />
                        </div>

                    </div>
                    <button className="refresh-btn" onClick={() => handleReset()}>Reset</button>
                </div>

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
                    onClick={() => setCurrentTab('Slot')}
                    className={currentTab === 'Slot' ? 'active' : ''}
                    aria-pressed={currentTab === 'Slot'}
                >
                    FC
                </button>
                <button
                    onClick={() => setCurrentTab('Crypto-In')}
                    className={currentTab === 'Crypto-In' ? 'active' : ''}
                    aria-pressed={currentTab === 'Crypto-In'}
                >
                    C-IN
                </button>
                <button
                    onClick={() => setCurrentTab('Crypto-Out')}
                    className={currentTab === 'Crypto-Out' ? 'active' : ''}
                    aria-pressed={currentTab === 'Crypto-Out'}
                >
                    C-OUT
                </button>
                <button
                    onClick={() => setCurrentTab('Internal')}
                    className={currentTab === 'Internal' ? 'active' : ''}
                    aria-pressed={currentTab === 'Internal'}
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
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {isTransactionListLoading ? (
                        <tr>
                            <div className="loading-container">
                             <div className="loader"></div>
                         </div>
                        </tr>
                    ):(TransactionListData && TransactionListData?.length > 0 ? renderTableData(TransactionListData) : (
                        <tr>
                            <td colSpan="5">No Request found</td>
                        </tr>
                    ))}
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
