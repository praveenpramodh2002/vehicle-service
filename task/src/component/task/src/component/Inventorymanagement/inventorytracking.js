import React, { useState, useEffect } from 'react';
import {
    HomeOutlined,
    FileSearchOutlined,
    BarChartOutlined,
    MailOutlined,
    SettingOutlined,
    BellOutlined,
    SearchOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import Plot from 'react-plotly.js';
import Axios from 'axios';
import './home1.css';

const Dashboard1 = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [lowStockItems, setLowStockItems] = useState(0);
    const [inStockItems, setInStockItems] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Fetch inventory from the server
        Axios.get('http://localhost:3001/api/inventory')
            .then(response => {
                const inventoryData = response.data.response || [];
                setInventory(inventoryData);
                calculateInventoryStats(inventoryData);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    }, []);

    const calculateInventoryStats = (inventoryData) => {
        setTotalItems(inventoryData.length);

        const lowStock = inventoryData.filter(item => item.quantity < item.reorderLevel).length;
        setLowStockItems(lowStock);

        const inStock = inventoryData.filter(item => item.quantity >= item.reorderLevel).length;
        setInStockItems(inStock);
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        console.log('User logged out');
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className={`container ${collapsed ? 'collapsed' : ''}`}>
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
                        <li><FileSearchOutlined /> <a href="tracking">Tracking</a></li>
                        <li><BarChartOutlined /> <a href="report">Reports</a></li>
                        <li><FileSearchOutlined /><a href="inventory"> Add Inventory </a></li>
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
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </div>
            </div>

            <main className="main-content">
                <header className="main-header">
                    <div className="search-bar">
                        <SearchOutlined />
                        <input type="text" placeholder="Search inventory..." />
                    </div>
                    <div className="header-icons">
                        <BellOutlined />
                        <div className="date-display">
                            <span className="date">{formatDate(currentDate)}</span>
                        </div>
                    </div>
                </header>

                <section className="overview-cards">
                    <div className="card total-items">
                        <div className="card-content">
                            <h3>{totalItems}</h3>
                            <p>Total Inventory Items</p>
                        </div>
                    </div>
                    <div className="card low-stock">
                        <div className="card-content">
                            <h3>{lowStockItems}</h3>
                            <p>Low Stock</p>
                        </div>
                    </div>
                    <div className="card in-stock">
                        <div className="card-content">
                            <h3>{inStockItems}</h3>
                            <p>In Stock</p>
                        </div>
                    </div>
                </section>

                <section className="charts-section">
                    <h4> Inventory Overview </h4>
                    <Plot
                        data={[
                            {
                                x: ['Total Items', 'Low Stock', 'In Stock'],
                                y: [totalItems, lowStockItems, inStockItems],
                                type: 'bar',
                                opacity: 0.8,
                                marker: { color: '#0073e6' } // Custom color for inventory
                            }
                        ]}
                        layout={{
                            title: 'Inventory Overview',
                            xaxis: { title: 'Item Types' },
                            yaxis: { title: 'Count' },
                            width: 700,
                            height: 500,
                        }}
                    />

                    <h4>Inventory Status</h4>
                    <Plot
                        data={[
                            {
                                values: [lowStockItems, inStockItems],
                                labels: ['Low Stock', 'In Stock'],
                                type: 'pie',
                                hole: 0.4,
                            }
                        ]}
                        layout={{
                            title: 'Inventory Status',
                            height: 400,
                            width: 500,
                        }}
                    />
                </section>
            </main>
        </div>
    );
};

export default Dashboard1;
