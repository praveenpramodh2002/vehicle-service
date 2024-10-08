import React, { useState } from 'react';
import { 
    HomeOutlined,
    FileSearchOutlined,
    BarChartOutlined,
    MailOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Use your existing CSS or update it accordingly

const NavigationSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            
            <div className="logo">
                <img src="./image/lnew.jpeg" alt="Logo" className="logo" />
            </div>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/hrmdb" className='link'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/profile" className='link'>Your Account</Link>
                    </li>
                    <li>
                        <Link to="/settings" className='link'>Settings</Link>
                    </li>
                    <li>
                        <Link to="/help" className='link'>Help</Link>
                    </li>
                </ul>
            </nav>
            
            <button>Sign out</button>
        </div>
    );
};

export default NavigationSidebar;
