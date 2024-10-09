import React, { useEffect, useState } from 'react';
import { 
    HomeOutlined, 
    FileSearchOutlined, 
    BarChartOutlined, 
    MailOutlined, 
    QuestionCircleOutlined, 
    SettingOutlined 
} from '@ant-design/icons';

import InventoryForm from './inventoryForm'; // Ensure the path is correct
import InventoryTable from './inventoryTable'; // Ensure the path is correct
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
            itemId: data.itemId, // Updated keys to match your inventory model
            itemName: data.itemName,
            quantity: data.quantity,
            supplier: data.supplier,
            reorderLevel: data.reorderLevel,
            dateAdded: data.dateAdded,
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
                        <li><BarChartOutlined /> <a href="inventoryreport">inventoryReports</a></li>
                        <li><FileSearchOutlined /> <a href="inventory"> Add Inventory </a></li> {/* Updated navigation */}
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
                <div className="inventory-section"> {/* Updated section name */}
                    <div className="add-inventory-header">
                        <button className="add-inventory-button">
                            <span className="add-icon">+</span> Add new inventory item
                        </button>
                    </div>
                    <InventoryForm
                        addInventory={addInventory}
                        submitted={submitted}
                        data={selectedInventory}
                        isEdit={isEdit}
                    />
                    <InventoryTable
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
