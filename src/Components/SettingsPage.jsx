import React, { useState } from 'react';
import '../styles/settings.css';

function SettingToggle({ label, initialValue = false }) {
    const [value, setValue] = useState(initialValue);

    const handleToggle = () => setValue(prev => !prev);

    return (
        <div className="setting">
            <div className="switch-container">
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
        </div>
    );
}

function SettingInput({ label, initialValue = 0, unit = '' }) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => setValue(event.target.value);

    return (
        <div className="setting">
            <label>{label}</label>
            <input
                type="number"
                value={value}
                onChange={handleChange}
                min="0"
            />
            <span>{unit}</span>
        </div>
    );
}

function SettingsPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle saving settings here
        console.log('Settings saved!');
    };

    return (
        <div className="settings-container">
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Platform Fee</label>
                        <SettingInput className="setting-input" unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Withdraw Fee</label>
                        <SettingInput className="setting-input" unit="%" />
                    </div>
                    <div className="form-group">
                        <label className="label">Internal Transaction Fee</label>
                        <SettingInput className="setting-input" unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Minimum Crypto Deposit</label>
                        <SettingInput className="setting-input" unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Minimum Internal Transaction</label>
                        <SettingInput className="setting-input" unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Spacer</label>
                        <SettingInput className="setting-input" unit="Gap" />
                    </div>
                    <div className="form-group">
                        <label className="label">Withdraw Internal</label>
                        <SettingInput className="setting-input" unit="Days" />
                    </div>
                    <div className="form-group">
                        <label className="label">Minimum Withdraw</label>
                        <SettingInput className="setting-input" unit="$" />
                    </div>
                    <div className="form-group">
                        <SettingToggle label="Allow new Sign-Up" />
                    </div>
                    <div className="form-group">
                        <SettingToggle label="Allow new FC slot" />
                    </div>
                    <div className="form-group">
                        <SettingToggle label="Maintenance Mode" />
                    </div>
                    <div className="form-group">
                        <label className="label">Referral Commission Slot</label>
                        <SettingInput className="setting-input" unit="$" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="edit-button">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default SettingsPage;
