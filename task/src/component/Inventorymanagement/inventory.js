import React, { useEffect, useState } from 'react';
import { 
    HomeOutlined, 
    FileSearchOutlined, 
    BarChartOutlined, 
    MailOutlined, 
    QuestionCircleOutlined, 
    SettingOutlined 
} from '@ant-design/icons';

import TaskForm from './inventoryForm'; // Ensure the path is correct
import TaskTable from './inventoryTable'; // Ensure the path is correct
import Axios from 'axios';

const Sidebar = () => {
    const [inventory, setInventory] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getInventory();
    }, []);

    const getInventory = () => {
        Axios.get('http://localhost:3001/api/inventory')
            .then(response => {
                setInventory(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const addInventory = (data) => {
        setSubmitted(true);

        const payload = {
            iId: data.iId, // Make sure these keys match your model
            itemName: data.itemName,
            description: data.description,
            employee: data.employee,
            type: data.type,
            date: data.date,
            status: data.status,
        };

        if (isEdit) {
            Axios.put(`http://localhost:3001/api/inventory/${selectedInventory._id}`, payload)
                .then(() => {
                    getInventory();
                    setSubmitted(false);
                    setIsEdit(false);
                    setSelectedInventory({});
                })
                .catch(error => {
                    console.error("Axios error", error);
                    setSubmitted(false);
                });
        } else {
            Axios.post("http://localhost:3001/api/inventory", payload)
                .then(() => {
                    getInventory();
                    setSubmitted(false);
                })
                .catch(error => {
                    console.error("Axios error", error);
                    setSubmitted(false);
                });
        }
    };

    const deleteInventory = (id) => {
        Axios.delete(`http://localhost:3001/api/inventory/${id}`)
            .then(() => {
                getInventory();
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const handleLogout = () => {
        console.log('User logged out');
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
                        <li><QuestionCircleOutlined /> <a href="#">Help</a></li>
                    </ul>
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
                        addInventory={addInventory}
                        submitted={submitted}
                        data={selectedInventory}
                        isEdit={isEdit}
                    />
                    <TaskTable
                        rows={inventory}
                        onEditInventory={(inventory) => {
                            setSelectedInventory(inventory);
                            setIsEdit(true);
                        }}
                        onDeleteInventory={deleteInventory}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
