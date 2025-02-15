import React, { useState, useEffect } from 'react';
import '../styles/settings.css';
import { useGetSettings,useUpdateSettings,useChangePassword } from "../hooks/adminHooks";

function SettingToggle({ label, initialValue = false }) {
    const [value, setValue] = useState(initialValue);

    const handleToggle = () => setValue((prev) => !prev);

    return (
        <div className="setting">
            <label>{label}</label>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={handleToggle}
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
}
function SettingInput({ label, initialValue = 0, unit = '' }) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => setValue(event.target.value);

    return (
        <div className="setting">
            <label>{label}</label>
            <div className="input-container">
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min="0"
                />
                {unit && <span className="unit">{unit}</span>}
            </div>
        </div>
    );
}

function SettingsPage() {
    const { isGetSettingsError, getSettingsError, isGetSettingsLoading, GetSettingsData, getSettings, setGetSettingsData } = useGetSettings();
    const {isUpdateSettingsError,updateSettingsError,isUpdateSettingsLoading,UpdateSettingsData,updateSettings}= useUpdateSettings();
    const {changePassword} = useChangePassword()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        getSettings();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Settings saved!', event);
        let requestPayload = {
            platformFee:parseInt(event.target[0].value),
            withdrawFee:parseInt(event.target[1].value),
            internalTransactionFee:parseInt(event.target[2].value),
            minimumCryptoDeposit:parseInt(event.target[3].value),
            minimumInternalTransaction:parseInt(event.target[4].value), 
            spacer:parseInt(event.target[5].value),
            withdrawInterval:parseInt(event.target[6].value),
            minimumWithdraw:parseInt(event.target[7].value),
            allowNewSignUp:event.target[8].checked,
            allowNewFcSlot:event.target[9].checked,
            maintenanceMode:event.target[10].checked,
            referralComissionSlot:parseInt(event.target[11].value)
        }
        updateSettings(requestPayload)
        // console.log('Settings payload', requestPayload);

    };

    const handlePasswordChange = (event) => {
        event.preventDefault();
        console.log('Password changed!',event);
        let requestPayload =  {
        "currentPassword": event.target[0].value,
        "newPassword": event.target[1].value,
        "confirmPassword":event.target[1].value 
        }
        console.log(requestPayload)
        changePassword(requestPayload)
        setNewPassword("")
        setOldPassword("")
        setIsPopupOpen(false);
    };

    return (
        <div className="settings-container">
            <div className="card">
                {!isGetSettingsLoading && GetSettingsData ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="label">Platform Fee</label>
                            <SettingInput unit="$" initialValue={GetSettingsData?.platformFee} />
                        </div>
                        <div className="form-group">
                            <label className="label">Withdraw Fee</label>
                            <SettingInput unit="%" initialValue={GetSettingsData?.withdrawFee} />
                        </div>
                        <div className="form-group">
                            <label className="label">Internal Transaction Fee</label>
                            <SettingInput unit="$" initialValue={GetSettingsData?.internalTransactionFee} />
                        </div>
                        <div className="form-group">
                            <label className="label">Minimum Crypto Deposit</label>
                            <SettingInput unit="$" initialValue={GetSettingsData?.minimumCryptoDeposit} />
                        </div>
                        <div className="form-group">
                            <label className="label">Minimum Internal Transaction</label>
                            <SettingInput unit="$" initialValue={GetSettingsData?.minimumInternalTransaction} />
                        </div>
                        <div className="form-group">
                            <label className="label">Spacer</label>
                            <SettingInput unit="Gap" initialValue={GetSettingsData?.spacer} />
                        </div>
                        <div className="form-group">
                            <label className="label">Withdraw Interval</label>
                            <SettingInput unit="Days" initialValue={GetSettingsData?.withdrawInterval} />
                        </div>
                        <div className="form-group">
                            <label className="label">Minimum Withdraw</label>
                            <SettingInput unit="$" initialValue={GetSettingsData?.minimumWithdraw} />
                        </div>

                        <div className="form-group">
                            <SettingToggle label="Allow New Sign-Up" initialValue={GetSettingsData?.allowNewSignUp} />
                        </div>
                        <div className="form-group">
                            <SettingToggle label="Allow New FC Slot" initialValue={GetSettingsData?.allowNewFcSlot} />
                        </div>
                        <div className="form-group">
                            <SettingToggle label="Maintenance Mode" initialValue={GetSettingsData?.maintenanceMode} />
                        </div>

                        <div className="form-group">
                            <label className="label">Referral Commission Slot</label>
                            <SettingInput unit="$" initialValue={GetSettingsData?.referralComissionSlot} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="edit-button">Save Changes</button>
                            <button type="button" className="edit-button" onClick={() => setIsPopupOpen(true)}>Change Password</button>
                        </div>
                    </form>
                ) : (
                    "Loading"
                )}
            </div>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordChange}>
                            <div className="popup-form-group">
                                <label>Old Password</label>
                                <input
                                    type="text"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Old Password"
                                    required
                                />
                            </div>
                            <div className="popup-form-group">
                                <label>New Password</label>
                                <input
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    required
                                />
                            </div>
                            <div className="popup-actions">
                                <button type="submit" className="save-password-button">Save</button>
                                <button type="button" className="cancel-button" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SettingsPage;
