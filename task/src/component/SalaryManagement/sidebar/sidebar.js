import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './sidebar.css'; // Use your existing CSS or update it accordingly

const NavigationSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`navigation-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-logo">
                <img src="./image/logo2.jpeg" alt="Logo" className="logo15" />
            </div>
            <nav className="sidebar-navigation">
                <ul>
                    <li>
                        <Link to="/hrmdb" className='sidebar-link'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/profile" className='sidebar-link'>Your Account</Link>
                    </li>
                    <li>
                        <Link to="/settings" className='sidebar-link'>Settings</Link>
                    </li>
                    <li>
                        <Link to="/help" className='sidebar-link'>Help</Link>
                    </li>
                </ul>
            </nav>
            <button className="sidebar-signout-button">Sign out</button>
        </div>
    );
};

export default NavigationSidebar;
