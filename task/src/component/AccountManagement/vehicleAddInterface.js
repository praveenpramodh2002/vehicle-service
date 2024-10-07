import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import AddVehicleForm from './vehicleForm'; 
import { SettingOutlined, BellOutlined } from '@ant-design/icons';

const VehicleManagement = () => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsEdit(true);
    };

    const handleAddVehicle = () => {
        setSelectedVehicle(null);
        setIsEdit(false);
    };

    const handleCancel = () => {
        setSelectedVehicle(null);
        setIsEdit(false);
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="logo">
                <img src="images/logo1.jpeg" alt="Micro Automotive" />
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="home1">Dashboard</a></li>
                        <li><a href="serviceManager">Account</a></li>
                        <li><a href="#">Inbox</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                </nav>
                <div className="tools">
                    <p>Tools</p>
                    <ul>
                        <li><SettingOutlined /> <a href="#">Settings</a></li>
                    </ul>
                </div>
                <div className="signoutbtn">
                    <button className="signoutbtn">Sign Out</button>
                </div>
            </aside>
            <div className="main-content">
                <div className="vehicle-section">
                    <AddVehicleForm
                        vehicle={selectedVehicle}
                        isEditMode={isEdit}
                        refreshVehicles={() => {}} 
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleManagement;