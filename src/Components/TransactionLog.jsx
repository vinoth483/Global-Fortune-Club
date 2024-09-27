import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/withdraw.css'; 

const TransactionLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const allTransactions = [
        { id: 'Trans1', user: 'User1', userId: 'ID1', amount: 100, status: 'Active' },
        { id: 'Trans2', user: 'User2', userId: 'ID2', amount: 200, status: 'Active' },
        { id: 'Trans3', user: 'User3', userId: 'ID3', amount: 300, status: 'Completed' },
    ];

    const filteredTransactions = allTransactions.filter(transaction => 
        currentTab === 'All' || transaction.status === currentTab
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const renderTableData = (data) => {
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan="5">No data available</td>
                </tr>
            );
        }

        return data.map((transaction, index) => (
            <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.user}</td>
                <td>{transaction.userId}</td>
                <td>{transaction.amount} USDT</td>
                <td>{transaction.status}</td>
            </tr>
        ));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

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
                    {renderTableData(paginatedData)}
                </tbody>
            </table>
            <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    &lt; {/* Back */}
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    &gt; {/* Next */}
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
