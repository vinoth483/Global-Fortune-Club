import React, { useState ,useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/withdraw.css'; 
import {useFcSlotList} from  "../hooks/adminHooks"
import moment from 'moment';
const FCSlotLog = ({ title }) => {
    const [currentTab, setCurrentTab] = useState("Active");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const {isFcSlotListError,fcSlotListError,isFcSlotListLoading,FcSlotListData,getFcSlotList,setFcSlotListData,totalPages} = useFcSlotList()

    useEffect(()=>{
        let requestPayload = {
            limit:10,
            page:currentPage,
            status:currentTab,
            searchValue:searchTerm

        }
        getFcSlotList(requestPayload)
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },[currentPage,currentTab,searchTerm])




    const renderTableData = (data) => {
        if (data?.length === 0 ) {
            return (
                <tr>
                    <td colSpan="7">No data available</td>
                </tr>
            );
        }

        return data.map((elem, index) => (
            <tr key={elem._id}>
                <td>{index + 1}</td> 
                <td>{elem.name}</td>
                <td>{moment(elem.joinedDate).format('DD/MM/YYYY')}</td>
                <td>{currentTab==="Active"?`$${elem.yield.toFixed(2)}`:moment(elem.completedDate).format('DD/MM/YYYY')}</td>
                <td>{currentTab==="Active"?`$${elem.remainingAmount.toFixed(2)}`: Math.floor((new Date(elem.completedDate) - new Date(elem.joinedDate)) / (1000 * 60 * 60 * 24))}</td> 
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

    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const paginatedData = filteredSlots.slice(startIndex, startIndex + itemsPerPage);

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
                />
                {/* <button className="search-btn">Search</button> */}
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
            </div>
            <div className="tab-buttons">
                <button 
                    onClick={() => setCurrentTab('Active')} 
                    className="active"
                    aria-pressed={currentTab === 'Active'}
                >
                    Active Slots
                </button>
                <button 
                    onClick={() => setCurrentTab('Completed')} 
                    className={currentTab === 'Completed' ? 'Active'.toLowerCase() : ''}
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
                        <th>{currentTab==="Active"?"Yield":"Completed Date"}</th>
                        <th>{currentTab==="Active"?"Remaining":"Total Days"}</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {!isFcSlotListLoading?renderTableData(FcSlotListData):(
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

FCSlotLog.propTypes = {
    title: PropTypes.string.isRequired,
};

export default FCSlotLog;
