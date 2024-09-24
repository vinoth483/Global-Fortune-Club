import React, { useState } from 'react';

const Settings = () => {
  // Correct placement and initialization of multiple useState hooks
  const [settings, setSettings] = useState({
    platformFee: 0,
    withdrawFee: 0,
    internalTransactionFee: 0,
    minimumCryptoDeposit: 0,
    minimumInternalTransaction: 0,
    withdrawInternal: 0,
    minimumWithdraw: 0,
    allowNewSignUp: false,
    allowNewFCSlot: false,
    maintenanceMode: false,
    referralCommissionSlot: 0
  });

  const [selectedContent, setSelectedContent] = useState(""); // Correctly initialize with a default value, if 'initialValue' is not defined elsewhere

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings Updated:', settings);
    // Here you would typically handle the updated settings, e.g., sending them to a backend server
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="setting">
            <label>
              {key.replace(/([A-Z])/g, ' $1').trim()}:
              {typeof value === 'boolean' ? (
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        ))}
        <button type="submit">Enable Edit To Change</button>
      </form>
    </div>
  );
};

export default Settings;
