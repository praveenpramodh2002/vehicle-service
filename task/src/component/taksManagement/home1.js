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

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [inProgressTasks, setInProgressTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Fetch tasks from the server
        Axios.get('http://localhost:3001/api/task')
            .then(response => {
                const tasksData = response.data.response || [];
                setTasks(tasksData);
                calculateTaskStats(tasksData);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    }, []);

    const calculateTaskStats = (tasksData) => {
        setTotalTasks(tasksData.length);

        const inProgress = tasksData.filter(task => task.status === 'In Progress').length;
        setInProgressTasks(inProgress);

        const completed = tasksData.filter(task => task.status === 'Completed').length;
        setCompletedTasks(completed);
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
                        <li><FileSearchOutlined /><a href="task"> Add Task </a></li>
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
                        <input type="text" placeholder="Search tasks..." />
                    </div>
                    <div className="header-icons">
                        <BellOutlined />
                        <div className="date-display">
                            <span className="date">{formatDate(currentDate)}</span>
                        </div>
                    </div>
                </header>

                <section className="overview-cards">
                    <div className="card total-tasks">
                        <div className="card-content">
                            <h3>{totalTasks}</h3>
                            <p>Total Tasks</p>
                        </div>
                    </div>
                    <div className="card in-progress">
                        <div className="card-content">
                            <h3>{inProgressTasks}</h3>
                            <p>In Progress</p>
                        </div>
                    </div>
                    <div className="card completed-tasks">
                        <div className="card-content">
                            <h3>{completedTasks}</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                </section>

                <section className="charts-section">
                    <h4> Task Summary</h4>
                    <Plot
                        data={[
                            {
                                x: ['Total Tasks', 'In Progress', 'Completed'],
                                y: [totalTasks, inProgressTasks, completedTasks],
                                z: [0, 0, 0], // Customize the z-axis if needed
                                type: 'bar3d',
                                opacity: 0.8,
                                marker: { color: '#8c0073' } // Use your specific color
                            }
                        ]}
                        layout={{
                            title: 'Task Overview',
                            scene: {
                                xaxis: { title: 'Task Types' },
                                yaxis: { title: 'Count' },
                                zaxis: { title: 'Depth' }
                            },
                            width: 700,
                            height: 500,
                        }}
                    />

                    <h4>Task Completion </h4>
                    <Plot
                        data={[
                            {
                                values: [inProgressTasks, completedTasks],
                                labels: ['In Progress', 'Completed'],
                                type: 'pie',
                                hole: 0.4,
                            }
                        ]}
                        layout={{
                            title: 'Task Completion',
                            height: 400,
                            width: 500,
                        }}
                    />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
