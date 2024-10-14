import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { SettingOutlined } from '@ant-design/icons';
import './home.css';

function Home1({ vehicles = [] }) { 
    const navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState('');

    const navigateToVehicleManagement = () => {
        navigate('/VehicleAddInterface'); 
    };

    const navigateToVehicleDatabase = () => {
        navigate('/VehicleUpdateInterface'); 
    };


    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString()); // Format date and time
        };

        updateDateTime(); // Initial call
        const intervalId = setInterval(updateDateTime, 1000); // Update every second

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="logo">
                    <img src="image/logo2.jpeg" alt="Micro Automotive" />
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="serviceManager">Account</a></li>
                        <li><a href="#">Inbox</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                </nav>
                <div className="tools">
                    <p>Tools</p>
                    <ul>
                        <li><SettingOutlined/> <a href="#">Settings</a></li>
                    </ul>
                </div>
                <div className="signoutbtn">
                    <button className="signoutbtn">Sign Out</button>
                </div>
            </aside>
            <br>
            </br>
            <div className="main-content">
                <div className="date-time">
                    <div className="current-date-time">{currentDateTime}</div>
                </div>
                <header>
                    <h1>Service Manager Dashboard</h1>
                </header>
                <section className="dashboard-cardsss">
                    <div className="card123">
                        <div className="circle-chart">{vehicles.length}</div> 
                        <p>Total Accounts</p>
                    </div>
                    <div className="card123" onClick={navigateToVehicleManagement} style={{ cursor: 'pointer' }}>
                        <img src="image/add.png" alt="Add Vehicle" className="img" />
                        <p>Add New User Account</p>
                    </div>
                    <div className="card123" onClick={navigateToVehicleDatabase} style={{ cursor: 'pointer' }}>
                        <img src="image/edit.png" alt="Update Vehicles" className="img" />
                        <p>Update User Account</p>
                    </div>
                   
                </section>
            </div>
        </div>
    );
}

export default Home1;
