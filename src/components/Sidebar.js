import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/NexaWareLogo.png';

const Sidebar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const btnRef = useRef(null);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !btnRef.current.contains(event.target)) {
                setDropdownOpen(false); // Close the dropdown if the click is outside the dropdown and the button
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
      <div className="sidebar">
      <img src={logo} alt="NexaWare Logo" className="logo" />
      <p className="brand-name">NexaWare</p>
      <div className="dropdown">
          <br></br>
          <br></br>
          <button ref={btnRef} className="dropbtn" onClick={handleDropdownToggle}>Operations</button>
          {dropdownOpen && (
              <div ref={dropdownRef} className="dropdown-content">
                  <Link to="/receiving">Receiving</Link>
                  <Link to="/inventory">Inventory</Link>
                  <Link to="/create-po">Create PO</Link>
                  <Link to="/po-details">View PO Details</Link> {/* <-- Added this line */}
              </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
