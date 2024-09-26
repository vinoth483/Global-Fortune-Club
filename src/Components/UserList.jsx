import React from 'react';

const UserList = ({ title }) => {
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
          <tr>
            <td>Total User</td>
            <td>0</td>
            <td>7</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Yield</td>
            <td>0</td>
            <td>100.0000</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>User Crowd Stack Balance</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Admin Wallet Balance</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
          </tr>
         
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
