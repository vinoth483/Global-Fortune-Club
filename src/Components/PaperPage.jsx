import React, { useEffect, useState } from 'react';
import { useGetDashboardInfo } from "../hooks/adminHooks";
import { message, DatePicker, Spin } from "antd"; 
import moment from "moment"; 
import '../styles/dashboard.css'

const Card = () => {
  const { isGetDashboardLoding, isGetDashboardError, dashboardError, data, getDashboardInfo } = useGetDashboardInfo();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedDate, setSelectedDate] = useState(moment());

 const  formatDateToDDMMYY=()=>{
    const today = new Date(); // Get today's date
  
    const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so +1) and pad
    const year = today.getFullYear();
  
    return `${year}/${month}/${day}`; 
  }
  useEffect(() => {
    if (isGetDashboardError && dashboardError !== "") {
      messageApi.open({
        type: 'error',
        content: dashboardError,
      });
    }
  }, [isGetDashboardError, dashboardError, messageApi]);

  useEffect(() => {
    let today = formatDateToDDMMYY()
    getDashboardInfo(today);
  }, []);

  const handleDateChange = (date) => {
    console.log('in date change')
    let formattedDate = `${date.$y}/${date.$M+1}/${date.$D}`
    console.log("selected date",date,formattedDate)
    getDashboardInfo(formattedDate);
    setSelectedDate(date);
  };

  return (
    <>
      {contextHolder}
      <div className="card-container">
        {isGetDashboardLoding ? (
          <div className="loading-container">
            <div className="loader"></div> 
          </div>
        ) : (
          data && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>
                    <DatePicker 
                      value={selectedDate} 
                      onChange={handleDateChange} 
                      format="DD/MM/YYYY" 
                      style={{ marginLeft: '10px' }} 
                    />
                  </th>
                  <th>Overall</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New User</td>
                  <td>{data?.todayUser !== null ? data?.todayUser : "--"}</td>
                  <td>{data?.overallUser !== null ? data?.overallUser : "--"}</td>
                </tr>
                <tr>
                  <td>Total User</td>
                  <td>{data?.totalUser !== null ? data?.totalUser : "--"}</td>
                  <td>{data?.totalUser !== null ? data?.totalUser : "--"}</td>
                </tr>
                <tr>
                  <td>Yield</td>
                  <td>{data?.todayYield !== null ? data?.todayYield : "--"}</td>
                  <td>{data?.overallYield !== null ? data?.overallYield : "--"}</td>
                </tr>
                <tr>
                  <td>User Main Wallet Balance</td>
                  <td>--</td>
                  <td>${data?.totalUserMainWallet !== null ? data?.totalUserMainWallet?.toFixed(2) : "0"}</td>
                </tr>
                <tr>
                  <td>User Crowd Stack Balance</td>
                  <td>--</td>
                  <td>${data?.totalCrowdStackingAmount !== null ? data?.totalCrowdStackingAmount?.toFixed(2) : "0"}</td>
                </tr>
                <tr>
                  <td>Admin Wallet Balance</td>
                  <td>--</td>
                  <td>${data?.adminWallet !== null ? data?.adminWallet?.toFixed(2) : "0"}</td>
                </tr>
                <tr>
                  <td>Admin Commission</td>
                  <td>{data?.todayAdminCommission !== null ? data?.todayAdminCommission : "--"}</td>
                  <td>{data?.overallAdminCommission !== null ? data?.overallAdminCommission : "--"}</td>
                </tr>
                <tr>
                  <td>Active Slots</td>
                  <td>{data?.todayActiveSlot !== null ? data?.todayActiveSlot : "--"}</td>
                  <td>{data?.overallActiveSlot !== null ? data?.overallActiveSlot : "--"}</td>
                </tr>
                <tr>
                  <td>Complete Slots</td>
                  <td>{data?.todayCompletedSlot !== null ? data?.todayCompletedSlot : "--"}</td>
                  <td>{data?.overallCompletedSlot !== null ? data?.overallCompletedSlot : "--"}</td>
                </tr>
                <tr>
                  <td>Crypto Deposit</td>
                  <td>${data?.todayCryptoDeposit !== null ? data?.todayCryptoDeposit?.toFixed(2) : "0"}</td>
                  <td>${data?.overallCryptoDeposit !== null ? data?.overallCryptoDeposit?.toFixed(2) : "0"}</td>
                </tr>
                <tr>
                  <td>Crypto Withdraw</td>
                  <td>${data?.todayCryptoWithdraw !== null ? data?.todayCryptoWithdraw?.toFixed(2) : "0"}</td>
                  <td>${data?.overallCryptoWithdraw !== null ? data?.overallCryptoWithdraw?.toFixed(2) : "0"}</td>
                </tr>
                <tr>
                  <td>Internal Transaction</td>
                  <td>${data?.todayInternalAmount !== null ? data?.todayInternalAmount?.toFixed(2) : "0"}</td>
                  <td>${data?.overallInternalAmount !== null ? data?.overallInternalAmount?.toFixed(2) : "0"}</td>
                </tr>
                <tr>
                  <td>Leftover Wallet</td>
                  <td>--</td>
                  <td>${data?.leftOverWallet !== null ? data?.leftOverWallet?.toFixed(2) : "0"}</td>
                </tr>
              </tbody>
            </table>
          )
        )}
      </div>
    </>
  );
};

export default Card;
