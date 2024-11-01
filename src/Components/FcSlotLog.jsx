import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../styles/withdraw.css';
import { useFcSlotList } from "../hooks/adminHooks";
import moment from 'moment';

const FCSlotLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState("Active");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    
    const { isFcSlotListError, isFcSlotListLoading, FcSlotListData, getFcSlotList, totalPages } = useFcSlotList();

    const fetchFcSlotList = useCallback(() => {
        const requestPayload = {
            limit: 10,
            page: currentPage,
            status: currentTab,
            searchValue: searchTerm
        };
        getFcSlotList(requestPayload)
            .then(result => console.log(result))
            .catch(err => console.error(err));
    }, [currentPage, currentTab, searchTerm, getFcSlotList]);

    useEffect(() => {
        fetchFcSlotList();
    }, [fetchFcSlotList]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    
    const renderTableData = (data) => {
        if (!data?.length) {
            return (
                <tr>
                    <td colSpan="5">No data available</td>
                </tr>
            );
        }
        return data.map((elem, index) => (
            <tr key={elem._id}>
                <td>{index + 1}</td>
                <td>{elem.name}</td>
                <td>{moment(elem.joinedDate).format('DD/MM/YYYY')}</td>
                <td>{currentTab === "Active" ? `$${elem.yield.toFixed(2)}` : moment(elem.completedDate).format('DD/MM/YYYY')}</td>
                <td>{currentTab === "Active" ? `$${elem.remainingAmount.toFixed(2)}` : Math.floor((new Date(elem.completedDate) - new Date(elem.joinedDate)) / (1000 * 60 * 60 * 24))}</td>
            </tr>
        ));
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by Slot ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search by Slot ID"
                />
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
            </div>
            <div className="tab-buttons">
                <button 
                    onClick={() => { setCurrentTab('Active'); setCurrentPage(1); }}
                    className={currentTab === 'Active' ? 'active' : ''}
                    aria-pressed={currentTab === 'Active'}
                >
                    Active Slots
                </button>
                <button 
                    onClick={() => { setCurrentTab('Completed'); setCurrentPage(1); }}
                    className={currentTab === 'Completed' ? 'active' : ''}
                    aria-pressed={currentTab === 'Completed'}
                >
                    Completed Slots
                </button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Slot ID</th>
                        <th>Slot Date</th>
                        <th>{currentTab === "Active" ? "Yield" : "Completed Date"}</th>
                        <th>{currentTab === "Active" ? "Remaining" : "Total Days"}</th>
                    </tr>
                </thead>
                <tbody>
                    {!isFcSlotListLoading ? renderTableData(FcSlotListData) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination-controls">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button>
                <select value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
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
