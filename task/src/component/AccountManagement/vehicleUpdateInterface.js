import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import VehicleTable from './vehicleTable'; 
import AddVehicleForm from './vehicleForm'; 
import Modal from './Modal'; 
import './modal.css';
import './vehicleTable.css'; 

const VehicleUpdate = () => {
    const [vehicles, setVehicles] = useState([]);
    const [deletedVehicles, setDeletedVehicles] = useState([]); // To store deleted vehicles
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        getVehicles();
        getDeletedVehicles(); 
    }, []);

    const getVehicles = () => {
        Axios.get('http://localhost:3001/api/vehicles')
            .then(response => {
                console.log("Received vehicles data:", response.data);
                setVehicles(response.data);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    };

    const getDeletedVehicles = () => {
        Axios.get('http://localhost:3001/api/deleted-vehicles')
            .then(response => {
                setDeletedVehicles(response.data);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    };

    const restoreVehicle = (id) => {
        console.log("Restoring vehicle with ID:", id);
        Axios.post(`http://localhost:3001/api/restore-vehicle/${id}`)
            .then(() => {
                getVehicles();
                getDeletedVehicles();
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const permanentlyDeleteVehicle = (id) => {
        console.log("Permanently deleting vehicle with ID:", id);
        Axios.delete(`http://localhost:3001/api/permanently-delete/${id}`)
            .then(() => {
                // Immediately update the deleted vehicles list
                setDeletedVehicles(prevDeletedVehicles =>
                    prevDeletedVehicles.filter(vehicle => vehicle._id !== id)
                );
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsEditMode(true); 
        setIsModalOpen(true); 
    };

    const deleteVehicle = (id) => {
        console.log("Deleting vehicle with ID:", id);
        Axios.delete(`http://localhost:3001/api/vehicles/${id}`)
            .then(() => {
                getVehicles();
                getDeletedVehicles();
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const handleCancel = () => {
        setSelectedVehicle(null);
        setIsEditMode(false); // Reset edit mode
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="logo">
                    <img src="image/logo2.jpeg" alt="Micro Automotive" />
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
                        <li><a href="#">Settings</a></li>
                    </ul>
                </div>
                <div className="add-vehicle-header">
                    <button className="signoutbtn">Sign Out</button>
                </div>
            </aside>
            <div className="main-content">
                <h1>Account Database</h1>
                <div className="vehicle-section">
                    <VehicleTable
                        vehicles={vehicles}
                        onEditVehicle={handleEditVehicle}
                        onDeleteVehicle={deleteVehicle}
                    />
                </div>
                
                {/* Deleted vehicles table */}
                <div className="deleted-content">
                    <h2>Deleted User Accounts</h2>
                    <VehicleTable
                        vehicles={deletedVehicles}
                        onRestoreVehicle={restoreVehicle}
                        onPermanentlyDelete={permanentlyDeleteVehicle}
                        isDeletedTable 
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCancel}>
                <AddVehicleForm
                    vehicle={selectedVehicle}
                    isEditMode={isEditMode}
                    refreshVehicles={getVehicles}
                    onCancel={handleCancel}
                />
            </Modal>
        </div>
    );
};

export default VehicleUpdate;