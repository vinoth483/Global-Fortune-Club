import React from 'react';

const Card = () => {
  return (
    <div className="card-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Today</th>
            <th>Overall</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total User</td>
            <td>0</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Yield</td>
            <td>0</td>
            <td>100.0000</td>
          </tr>
          <tr>
            <td>User Main Wallet Balance</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>User Crowd Stack Balance</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Admin Wallet Balance</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Admin Commission</td>
            <td>0</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Active Slots</td>
            <td>0</td>
            <td>9</td>
          </tr>
          <tr>
            <td>Complete Slots</td>
            <td>0</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Crypto Deposit</td>
            <td>0</td>
            <td>2700</td>
          </tr>
          <tr>
            <td>Crypto Withdraw</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Internal Transaction</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Leftover Wallet</td>
            <td>--</td>
            <td>--</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Card;
