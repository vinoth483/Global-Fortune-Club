import React, { useState } from 'react';

const UserList = ({ title }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const userData = [
        { id: 1, name: 'User1', mwBalance: 100, totalYield: 200, status: 'Active' },
        { id: 2, name: 'User2', mwBalance: 150, totalYield: 250, status: 'Inactive' },
        { id: 3, name: 'User3', mwBalance: 200, totalYield: 300, status: 'Active' },
        { id: 4, name: 'User4', mwBalance: 50, totalYield: 150, status: 'Inactive' },
        { id: 5, name: 'User5', mwBalance: 80, totalYield: 180, status: 'Active' },
        { id: 6, name: 'User6', mwBalance: 120, totalYield: 220, status: 'Inactive' },
    ];

    const totalPages = Math.ceil(userData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = userData.slice(startIndex, startIndex + itemsPerPage);

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
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>MW Balance</th>
                        <th>Total Yield</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.mwBalance}</td>
                            <td>{user.totalYield}</td>
                            <td>{user.status}</td>
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

export default UserList;
