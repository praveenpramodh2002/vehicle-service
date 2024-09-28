import React, { useState, useEffect, useRef } from 'react';
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
import { Bar, Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'chart.js/auto'; // Ensure Chart.js is imported
import './home1.css';
import Axios from 'axios';

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [inProgressTasks, setInProgressTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Create refs for chart components
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
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

    const generatePDFReport = async () => {
        const doc = new jsPDF();

        // Add text to PDF
        doc.text('Report - Task Overview', 10, 10);
        doc.text(`Total Tasks: ${totalTasks}`, 10, 20);
        doc.text(`In Progress: ${inProgressTasks}`, 10, 30);
        doc.text(`Completed: ${completedTasks}`, 10, 40);

        // Capture and add bar chart image
        if (barChartRef.current) {
            const barChartImage = barChartRef.current.toBase64Image();
            doc.addImage(barChartImage, 'PNG', 10, 50, 180, 90); // Adjust position and size as needed
        }

        // Capture and add pie chart image
        if (pieChartRef.current) {
            const pieChartImage = pieChartRef.current.toBase64Image();
            doc.addImage(pieChartImage, 'PNG', 10, 150, 180, 90); // Adjust position and size as needed
        }

        doc.text('Employee Performance', 10, 250);
        doc.text('Details on performance data would be here.', 10, 260);

        doc.save('task_report.pdf');
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const barChartData = {
        labels: ['Total Tasks', 'In Progress', 'Completed'],
        datasets: [{
            label: 'Task Summary',
            data: [totalTasks, inProgressTasks, completedTasks],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const barChartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const pieChartData = {
        labels: ['In Progress', 'Completed'],
        datasets: [{
            data: [inProgressTasks, completedTasks],
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        }
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
                    
                    <button onClick={generatePDFReport} className="generate-report-btn">Generate PDF Report</button>
                </section>

                <section className="charts-section">
                    <div className="tasks-chart">
                        <h4>Task Summary</h4>
                        <div className="chart-content">
                            <Bar ref={barChartRef} data={barChartData} options={barChartOptions} />
                        </div>
                    </div>
                    <div className="employee-performance">
                        <h4>Employee Performance</h4>
                        <div className="performance-chart">
                            <Pie ref={pieChartRef} data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
