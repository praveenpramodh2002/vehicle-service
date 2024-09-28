import React, { useEffect, useState } from 'react';
import { 
    HomeOutlined, 
    FileSearchOutlined, 
    BarChartOutlined, 
    MailOutlined, 
    QuestionCircleOutlined,  // Import the Help icon
    SettingOutlined, 
    BellOutlined 
} from '@ant-design/icons';
import './TaskManagementUI.css';
import TaskForm from './taskForm';
import TaskTable from './Tasktable';
import Axios from 'axios';

const Sidebar = () => {
    const [task, setTask] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getTask();
    }, []);

    const getTask = () => {
        Axios.get('http://localhost:3001/api/task')
            .then(response => {
                setTask(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const addTask = (data) => {
        setSubmitted(true);

        const payload = {
            tId: data.tId,
            title: data.title,
            description: data.description,
            employee: data.employee,
            type: data.type,
            date: data.date,
            status: data.status,
        };

        if (isEdit) {
            Axios.put(`http://localhost:3001/api/task/${selectedTask._id}`, payload)
                .then(() => {
                    getTask();
                    setSubmitted(false);
                    setIsEdit(false);
                    setSelectedTask({});
                })
                .catch(error => {
                    console.error("Axios error", error);
                    setSubmitted(false);
                });
        } else {
            Axios.post("http://localhost:3001/api/task", payload)
                .then(() => {
                    getTask();
                    setSubmitted(false);
                })
                .catch(error => {
                    console.error("Axios error", error);
                    setSubmitted(false);
                });
        }
    };

    const deleteTask = (id) => {
        Axios.delete(`http://localhost:3001/api/task/${id}`)
            .then(() => {
                getTask();
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const handleLogout = () => {
        console.log('User logged out');
        // Additional logic for logout like clearing tokens or redirecting
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="logo">
                    <img src="image/logo2.jpeg" alt="Micro Automotive" />
                </div>
                <div className="navigation">
                    <ul>
                        <li><HomeOutlined /> <a href="main">Home </a></li>
                        <li><FileSearchOutlined /> <a href="tracking">Tracking</a></li>
                        <li><BarChartOutlined /> <a href="report">Reports</a></li>
                        <li><FileSearchOutlined /> <a href="task"> Add Task </a></li>
                    </ul>
                </div>
                <div className="tools">
                    <p>Tools</p>
                    <ul>
                   <li><MailOutlined /><span>Inbox</span></li>
                       
                        <li><SettingOutlined /> <a href="#">Settings</a></li>
                        <li><QuestionCircleOutlined /> <a href="#">Help</a></li>              </ul>
                </div>
                <div className="user-profile">
                    <img src="user2.jpeg" alt="User" />
                    <span>Joe Max</span>
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </div>
            </aside>
            <div className="main-content">
                <div className="task-section">
                    <div className="add-task-header">
                        <button className="add-task-button">
                            <span className="add-icon">+</span> Add new task
                        </button>
                    </div>
                    <TaskForm
                        addTask={addTask}
                        submitted={submitted}
                        data={selectedTask}
                        isEdit={isEdit}
                    />
                    <TaskTable
                        rows={task}
                        onEditTask={(task) => {
                            setSelectedTask(task);
                            setIsEdit(true);
                        }}
                        onDeleteTask={deleteTask}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
