import React, { useState, useEffect, useCallback } from 'react';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
import moment from 'moment';
import '../styles/withdraw.css';
import { message } from 'antd';
import { useWithdrawList, useUpdateWithdraw } from "../hooks/adminHooks";

const Withdraw = ({ title }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [currentTab, setCurrentTab] = useState('pending');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [savedTransactionsId, setSavedTransactionsId] = useState("")
    const { isWithdrawListError, withdrawListError, isWithdrawListLoading, WithdrawListData, getWithdrawList, setWithdrawListData, totalPages } = useWithdrawList()
    const { isUpdateWithdrawError, updateWithdrawError, isUpdateWithdrawLoading, UpdateWithdrawData, updateWithdraw } = useUpdateWithdraw()
    const [transactionRefs, setTransactionRefs] = useState("");

    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    useEffect(() => {
        if (isUpdateWithdrawError && updateWithdrawError !== '') {
            messageApi.open({
                type: 'error',
                content: updateWithdrawError,
            });
        } else if (!isUpdateWithdrawError && !isUpdateWithdrawLoading && UpdateWithdrawData) {
            messageApi.open({
                type: 'success',
                content: UpdateWithdrawData,
            });

        }
    }, [isUpdateWithdrawError, updateWithdrawError, UpdateWithdrawData, messageApi, isUpdateWithdrawLoading]);

    // const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const fetchWithdrawList = useCallback(() => {
        const requestPayload = {
            limit: 10,
            page: currentPage,
            searchValue: searchTerm,
            status: currentTab,
        };
        if(fromDate!=null && toDate!=null){
            requestPayload["fromDate"] = fromDate
            requestPayload["toDate"] = toDate
        }
        console.log(requestPayload)
        if((fromDate!=null && toDate!=null) || (fromDate==null && toDate==null)){
        getWithdrawList(requestPayload)
            .then(result => console.log(result))
            .catch(err => console.error(err));
        }
    }, [currentPage, searchTerm, currentTab,fromDate,toDate]);

    useEffect(() => {
        fetchWithdrawList();
    }, [fetchWithdrawList]);


    const updateWithdrawAction = (status) => {
        let requestPayload = {
            "externalTransactionId": savedTransactionsId,
            "status": status
        }
        console.log("request payload for update request", requestPayload, selectedRequest)
        updateWithdraw(requestPayload,selectedRequest || "")
    }
    const renderTableData = (data) => {
        return data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.email}</td>
                <td>${item.amount !== null ? item.amount.toFixed(2) : "--"}</td>
                <td>{item.usdtAddress}</td>
                <td>
                    <div className="input-container">
                        <input
                            type="text"
                            className="no-border-input"
                            value={item?.externalTransactionId}
                            disabled= {currentTab!=="pending"}
                            onChange={(e) => setTransactionRefs(e.target.value)}
                            onFocus={() => setEditingId(item._id)}
                        />
                        {editingId === item._id && currentTab==="pending" && (
                            <button
                                className="save-btn"
                                onClick={(e) => setSavedTransactionsId(transactionRefs)}
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
                                setSelectedRequest(item._id);
                                setShowPopup(true);
                            }}
                        >
                            {/* {completedIds.includes(item.id) ? 'Complete' : 'Pending'} */}
                            Approve
                        </button>
                    </td>
                )}
            </tr>
        ));
    };

    // const handleCompleteRequest = () => {
    //     if (selectedRequest) {
    //         setCompletedIds((prev) => [...prev, selectedRequest.id]);
    //         setCompletedRequests((prev) => [...prev, selectedRequest]);
    //         setPendingRequests((prev) => prev.filter(request => request.id !== selectedRequest.id));
    //         setShowPopup(false);
    //         setSelectedRequest(null);
    //     }
    // };

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
    const handleReset = ()=>{
        setFromDate(null)
        setToDate(null)
    }

    return (
        <div className="card-container">
            {contextHolder}
            <h1>{title}</h1>
            <div className="search-container" style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
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
                   
                    <button className="refresh-btn" onClick={() => handleReset()} >Reset</button>

               
            </div>

                {/* <input
                    type="text"
                    className="search-input"
                    placeholder="Search User"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                
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
                        <th>S.No</th>
                        <th>User Name</th>
                        <th>Requested Date</th>
                        <th>Email</th>
                        <th>Requested Amount</th>
                        <th>USDT Wallet ID</th>
                        <th>Transaction Ref. No</th>
                        {currentTab === 'pending' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {isWithdrawListLoading ? (
                        <tr>
                            <td colSpan="5">
                                <div className="loading-container">
                                    <div className="loader"></div>
                                </div>
                            </td>
                        </tr>) : (WithdrawListData && WithdrawListData?.length > 0 ? renderTableData(WithdrawListData) : (
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
                        <button onClick={() => { updateWithdrawAction("approve") }}>Approve</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Withdraw;
