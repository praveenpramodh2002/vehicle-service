import React, { useState, useEffect } from 'react';
import { 
    HomeOutlined,
    FileSearchOutlined,
    BarChartOutlined,
    MailOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    QuestionCircleOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import './tracking.css';
import Axios from 'axios';

const KanbanBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [tasks, setTasks] = useState([]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        console.log('User logged out');
    };

    useEffect(() => {
        // Fetch tasks from the server
        Axios.get('http://localhost:3001/api/task')
            .then(response => {
                console.log(response.data.response);
                setTasks(response.data.response || []);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    }, []);

    const completedTasks = tasks.filter(task => task.status === 'Completed');
    const ongoingTasks = tasks.filter(task => task.status !== 'Completed');

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
                <h2>Ongoing Tasks</h2>
                <div className="task-cards">
                    {ongoingTasks.length > 0 ? (
                        ongoingTasks.map((task) => (
                            <div key={task._id} className="task-card">
                                <div className="task-icon">
                                    <ExclamationCircleOutlined style={{ color: 'orange', fontSize: '24px' }} />
                                </div>
                                <h3 className="task-title">{task.title}</h3>
                                <p><strong>Assignee:</strong> {task.assignee ? task.assignee.name : 'Not assigned'}</p>
                                <p><strong>Status:</strong> {task.status}</p>
                                <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
                                <p><strong>Description:</strong> {task.description}</p>

                                {/* Email Button */}
                                {task.assignee && task.assignee.email && ( // Check if email exists
                                    <a 
                                        href={`mailto:${task.assignee.email}`} 
                                        className="email-button"
                                    >
                                        Email {task.assignee.name}
                                    </a>
                                )}

                                {/* Progress Bar */}
                                <div className="progress-container">
                                    <div 
                                        className="progress-bar" 
                                        style={{ width: `${task.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No ongoing tasks found</p>
                    )}
                </div>

                <h2>Completed Tasks</h2>
                <div className="completed-task-cards">
                    {completedTasks.length > 0 ? (
                        completedTasks.map((task) => (
                            <div key={task._id} className="completed-task-card">
                                <div className="task-icon">
                                    <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                                </div>
                                <h3 className="task-title">{task.title}</h3>
                                <p><strong>Assignee:</strong> {task.assignee ? task.assignee.name : 'Not assigned'}</p>
                                <p><strong>Status:</strong> {task.status}</p>
                                <p><strong>Completed On:</strong> {task.completedDate ? new Date(task.completedDate).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Description:</strong> {task.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No completed tasks found</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default KanbanBoard;
