import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import '../styles/withdraw.css'; 
import {useTransactionList} from  "../hooks/adminHooks"
import moment from 'moment';

const TransactionLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); 
    const {isTransactionListError,transactionListError,isTransactionListLoading,TransactionListData,getTransactionList,setTransactionListData,totalPages} = useTransactionList()
    useEffect(()=>{
        let requestPayload = {
            limit:10,
            page:currentPage,
            status:currentTab,
            searchValue:searchTerm

        }
        console.log(requestPayload)
        getTransactionList(requestPayload)
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },[currentPage,currentTab,searchTerm])


    const renderTableData = (data) => {
        if (data.length === 0) {
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
                <td>{transaction.description} </td>
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

    return (
        <div className="card-container">
            <h1>{title}</h1>

            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by User or ID" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button className="search-btn">Search</button> */}
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
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
                    onClick={() => setCurrentTab('Crypto')} 
                    className={currentTab === 'Crypto' ? 'active' : ''}
                    aria-pressed={currentTab === 'Crypto'}
                >
                    Crypto
                </button>
                <button 
                    onClick={() => setCurrentTab('Internal')} 
                    className={currentTab === 'Internal' ? 'active' : ''}
                    aria-pressed={currentTab === 'Internal'}
                >
                    Internal
                </button>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Date </th>
                        <th>User ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {!isTransactionListLoading ?renderTableData(TransactionListData) : (
                <tr>
                    <td colSpan="7">Loading</td>
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
