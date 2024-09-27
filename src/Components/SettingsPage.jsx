import React, { useState } from 'react';
import '../styles/settings.css';

function SettingToggle({ label, initialValue = false }) {
    const [value, setValue] = useState(initialValue);

    const handleToggle = () => setValue((prev) => !prev);

    return (
        <div className="setting">
            <label htmlFor={label}>{label}</label>
            <label className="switch">
                <input
                    id={label}
                    type="checkbox"
                    checked={value}
                    onChange={handleToggle}
                    aria-label={`Toggle ${label}`}
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
    const handleSubmit = (event) => {
        event.preventDefault();
       
        console.log('Settings saved!');
    };

    return (
        <div className="settings-container">
            <div className="card">
                <form onSubmit={handleSubmit}>
                 
                    <div className="form-group">
                        <label className="label">Platform Fee</label>
                        <SettingInput unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Withdraw Fee</label>
                        <SettingInput unit="%" />
                    </div>
                    <div className="form-group">
                        <label className="label">Internal Transaction Fee</label>
                        <SettingInput unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Minimum Crypto Deposit</label>
                        <SettingInput unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Minimum Internal Transaction</label>
                        <SettingInput unit="$" />
                    </div>
                    <div className="form-group">
                        <label className="label">Spacer</label>
                        <SettingInput unit="Gap" />
                    </div>
                    <div className="form-group">
                        <label className="label">Withdraw Internal</label>
                        <SettingInput unit="Days" />
                    </div>
                    <div className="form-group">
                        <label className="label">Minimum Withdraw</label>
                        <SettingInput unit="$" />
                    </div>
                    <div className="form-group">
                        <SettingToggle label="Allow New Sign-Up" />
                    </div>
                    <div className="form-group">
                        <SettingToggle label="Allow New FC Slot" />
                    </div>
                    <div className="form-group">
                        <SettingToggle label="Maintenance Mode" />
                    </div>

                    <div className="form-group">
                        <label className="label">Referral Commission Slot</label>
                        <SettingInput unit="$" />
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
