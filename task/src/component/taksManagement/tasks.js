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
import './task99.css'; // Ensure you have the appropriate CSS file

const Alltask= () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="toggle-btn" onClick={toggleSidebar}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className="logo">
                <img src="image/logo2.jpeg" alt="Micro Automotive" />
            </div>
            <nav className="navigation">
                <ul>
                    <li><HomeOutlined /> <a href="main">Home</a></li>
                    <li><FileSearchOutlined /> <a href="#">Tracking</a></li>
                    <li><BarChartOutlined /> <a href="report">Reports</a></li>
                    <li><FileSearchOutlined /><a href="task">Task Overview</a></li>
                </ul>
            </nav>
            <div className="tools">
                <p>Tools</p>
                <ul>
                    <li><MailOutlined /><span>Inbox</span></li>
                    <li><SettingOutlined /><span>Settings</span></li>
                    <li><QuestionCircleOutlined /><a href="#">Help</a></li>
                </ul>
            </div>
            <div className="user-profile">
                <img src="user2.jpeg" alt="User" />
                <span>Joe Max</span>
                <button className="logout-button">Log Out</button>
            </div>
           
        </div>
        
    );
};

export default Alltask;
