import React, { useState } from 'react';
import '../styles/user.css';


const UserModal = ({ user, onClose }) => {
    if (!user) return null; 
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>User Details</h2>
                <table className="popup-table">
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
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.mwBalance}</td>
                            <td>{user.totalYield}</td>
                            <td>{user.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserList = ({ title }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); 
    const itemsPerPage = 5;

    const userData = [
        { id: 1, name: 'User1', mwBalance: 100, totalYield: 200, status: 'Active' },
        { id: 2, name: 'User2', mwBalance: 150, totalYield: 250, status: 'Inactive' },
        { id: 3, name: 'User3', mwBalance: 200, totalYield: 300, status: 'Active' },
        { id: 4, name: 'User4', mwBalance: 50, totalYield: 150, status: 'Inactive' },
        { id: 5, name: 'User5', mwBalance: 80, totalYield: 180, status: 'Active' },
        { id: 6, name: 'User6', mwBalance: 120, totalYield: 220, status: 'Inactive' },
    ];

    const filteredData = userData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages){
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

    const handleUserClick = (user) => {
        setSelectedUser(user); 
    };

    const closeModal = () => {
        setSelectedUser(null); 
    };

    return (
        <div className="card-container">
            <h1>{title}</h1>

            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by name or status"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="search-btn">Search</button>
                <button className="refresh-btn" onClick={() => setSearchTerm('')}>Refresh</button>
            </div>

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
                    {paginatedData.length > 0 ? (
                        paginatedData.map(user => (
                            <tr key={user.id} onClick={() => handleUserClick(user)}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.mwBalance}</td>
                                <td>{user.totalYield}</td>
                                <td>{user.status}</td>
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
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    &lt; 
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    &gt;
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

           
            {selectedUser && <UserModal user={selectedUser} onClose={closeModal} />}
        </div>
    );
};

export default UserList;