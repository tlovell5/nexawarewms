import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="sidebar">
            <img src='./NexaWareLogo.png' alt="NexaWare Logo" className="logo" />
            <p className="brand-name">NexaWare</p>
            <div className="dropdown">
                <button className="dropbtn" onClick={() => setDropdownOpen(!dropdownOpen)}>Operations</button>
                {dropdownOpen && (
                    <div className="dropdown-content">
                        <Link to="/receiving">Receiving</Link>
                        <Link to="/inventory">Inventory</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
