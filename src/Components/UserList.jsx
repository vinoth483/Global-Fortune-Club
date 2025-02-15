import React, { useState,useCallback,useEffect } from 'react';
import { DatePicker } from "antd";
import moment from "moment-timezone";
import '../styles/user.css';
import { useGetUserList,useGetUserDetail } from "../hooks/adminHooks";
const currencyFields = [
    "mainWallet", "reserveWallet", "crowdStacking", "leftOverWallet",
    "overallReferrenceAmount", "todayReferrenceAmount",
    "totalCryptoTopup", "totalCryptoWithdraw", "totalInternalIn", "totalInternalOut",
    "overallYield", "todayYield"
];
const UserModal = ({ user, onClose }) => {
    if (!user) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>User Details</h2>
                <table className="popup-table">
                <tbody>
                        {Object.keys(user).map((key) => {
                            // Exclude `_id`
                            if (key === "_id") return null;

                            // Format currency values
                            const isCurrency = currencyFields.includes(key);
                            return (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>
                                        {isCurrency 
                                            ? `$${user[key] !== null ? user[key].toFixed(2) : "0.00"}`
                                            : user[key]}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserList = ({ title }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedDate, setSelectedDate] = useState(moment());
    const {isUserListError,userListError,isUserListLoading,UserListData,getUserList,setUserListData,totalPages} = useGetUserList()
    const {isUserDetailError,userDetailError,isUserDetailLoading,UserDetailData,getUserDetail,setUserDetailData} = useGetUserDetail()
    const itemsPerPage = 5;

    const fetchUserList = useCallback(() => {
        const requestPayload = {
            limit: 10,
            page: currentPage,
            searchValue: searchTerm,
        };
        getUserList(requestPayload)
            .then(result => console.log(result))
            .catch(err => console.error(err));
    }, [currentPage, searchTerm]);

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    useEffect(() => {
        console.log("in useEffect od userdetail",selectedUser)
        if(selectedUser!==""){
            getUserDetail(selectedUser)

        }
    },[selectedUser])

    const closeModal = () => setSelectedUser(null);
    
    const handleUserIdChange = (userId) => {
        console.log('in set user',userId)
        setSelectedUser(userId);
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>

            <div className="search-container">
                {/* <DatePicker 
                    value={selectedDate} 
                    onChange={handleDateChange} 
                    format="DD-MM-YYYY"
                    style={{ marginRight: '10px' }} 
                /> */}
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by name or status"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>MW Balance</th>
                        <th>Total Yield</th>
                        <th>Status</th>
                        <th>Upline Code</th>
                    </tr>
                </thead>
                <tbody>
                    {isUserListLoading ? (
                        <tr>
                            <td colSpan="5">
                                <div className="loading-container">
                                    <div className="loader"></div>
                                </div>
                            </td>
                        </tr>
                    ) : UserListData && UserListData?.length > 0 ? (
                        UserListData?.map((user,index) => (
                            <tr key={user._id} onClick={() =>  handleUserIdChange(user._id)}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>${user.mainWallet!==null ? user.mainWallet.toFixed(2) : "--"}</td>
                                <td>${user.yield!==null ? user.yield.toFixed(2) : "--"}</td>
                                <td>{user.status}</td>
                                <td>{user.uplineCode}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}                   
                </tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button>
                <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}>
                    {[...Array(totalPages).keys()].map((page) => (
                        <option key={page} value={page + 1}>
                            Page {page + 1}
                        </option>
                    ))}
                </select>
            </div>
            {(!isUserDetailLoading && UserDetailData) && <UserModal user={UserDetailData} onClose={closeModal} />}
        </div>
    );
};

export default UserList;
