import React, { useState } from 'react';

const Sidebar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="sidebar">
            <img src="NexaWare Logo .png" alt="NexaWare Logo" className="logo" />
            <p className="brand-name">NexaWare</p>
            <div className="dropdown">
                <button className="dropbtn" onClick={() => setDropdownOpen(!dropdownOpen)}>Operations</button>
                {dropdownOpen && (
                    <div className="dropdown-content">
                        <a href="/receiving">Receiving</a>
                        <a href="/inventory">Inventory</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
