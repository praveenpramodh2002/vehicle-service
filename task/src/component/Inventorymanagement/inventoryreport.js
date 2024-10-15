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
    QuestionCircleOutlined,
    ExclamationCircleOutlined // Import the warning icon
} from '@ant-design/icons';
import Plot from 'react-plotly.js'; // Import Plotly for charts
import Axios from 'axios';
import './inventoryreort.css'; // Make sure the filename matches your CSS file

const InventoryReport = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dailyUsedItems, setDailyUsedItems] = useState(0);
    const [monthlyUsedItems, setMonthlyUsedItems] = useState(0);
    const [yearlyUsedItems, setYearlyUsedItems] = useState(0);
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        // Fetch inventory data from the server
        Axios.get('http://localhost:3001/api/inventory')
            .then(response => {
                const inventoryData = response.data.response || [];
                setInventoryItems(inventoryData);
                calculateUsageStats(inventoryData);
                findLowStockItems(inventoryData);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    }, []);

    const calculateUsageStats = (items) => {
        // Assuming items have a usage field for this calculation
        const dailyUsed = items.filter(item => item.usage === 'daily').length;
        const monthlyUsed = items.filter(item => item.usage === 'monthly').length;
        const yearlyUsed = items.filter(item => item.usage === 'yearly').length;

        setDailyUsedItems(dailyUsed);
        setMonthlyUsedItems(monthlyUsed);
        setYearlyUsedItems(yearlyUsed);
    };

    const findLowStockItems = (items) => {
        const lowStock = items.filter(item => item.quantity <= item.reorderLevel);
        setLowStockItems(lowStock);
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
                        <li><FileSearchOutlined /> <a href="requestproducts">Request Products</a></li>
                        <li><BarChartOutlined /> <a href="inventoryreport">Inventory Reports</a></li>
                        <li><FileSearchOutlined /><a href="Addinventory"> Add Inventory </a></li>
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

                <section className="inventory-report-section">
                    {/* Display Low Stock Warning with Icon */}
                    {lowStockItems.length > 0 && (
                        <div className="low-stock-warning">
                            <ExclamationCircleOutlined style={{ marginRight: '10px', color: '#fff' }} />
                            <h4>Low Stock Warning</h4>
                            <ul>
                                {lowStockItems.map(item => (
                                    <li key={item.itemId}>
                                        {item.itemName} (Current Stock: {item.quantity})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h4>Inventory Report</h4>
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Supplier</th>
                                <th>Reorder Level</th>
                                <th>Date Added</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryItems.map(item => (
                                <tr key={item.itemId}>
                                    <td>{item.itemId}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.supplier}</td>
                                    <td>{item.reorderLevel}</td>
                                    <td>{item.dateAdded}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Display Inventory Statistics */}
                    <div className="inventory-stats">
                        <h4>Inventory Statistics</h4>
                        <p>Total Inventory Items: {inventoryItems.length}</p>
                        <p>Daily Used Items: {dailyUsedItems}</p>
                        <p>Monthly Used Items: {monthlyUsedItems}</p>
                        <p>Yearly Used Items: {yearlyUsedItems}</p>
                    </div>

                    {/* Add Bar Chart for Inventory Stocks */}
                    <div className="chart-section">
                        <h4>Inventory Stock Overview</h4>
                        <Plot
                            data={[
                                {
                                    x: inventoryItems.map(item => item.itemName), // X-axis: Item names
                                    y: inventoryItems.map(item => item.quantity), // Y-axis: Quantities
                                    type: 'bar',
                                    marker: { color: '#007acc' } // Customize bar color
                                }
                            ]}
                            layout={{
                                title: 'Stock Quantities by Item',
                                xaxis: { title: 'Item Name', tickangle: -45 }, // Rotate item names for better readability
                                yaxis: { title: 'Stock Quantity' },
                                width: 800,
                                height: 500,
                            }}
                        />
                    </div>

                    {/* Add Pie Chart for Low Stock vs In Stock Items */}
                    <div className="chart-section">
                        <h4>Low Stock vs In Stock Items</h4>
                        <Plot
                            data={[
                                {
                                    values: [lowStockItems.length, inventoryItems.length - lowStockItems.length],
                                    labels: ['Low Stock', 'In Stock'],
                                    type: 'pie',
                                    hole: 0.4,
                                }
                            ]}
                            layout={{
                                title: 'Stock Distribution',
                                height: 400,
                                width: 500,
                            }}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default InventoryReport;
