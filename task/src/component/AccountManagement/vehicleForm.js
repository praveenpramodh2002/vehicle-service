import React, { useState, useEffect } from 'react';
import './vehicleForm.css';  
import axios from 'axios';

const AddVehicleForm = ({ vehicle, isEditMode, refreshVehicles, onCancel }) => {
    const [vehicleData, setVehicleData] = useState({
        vehicleid: '',
        userid: '',
        fullname: '',
        nic: '',
        contact: '',
        email: '',
        address: '',
        brand: '',
        model: '',
        year: '',
        vehicleno: '',
        engineno: '',
        chassisno: '',
        condition: ''
    });

    useEffect(() => {
        if (isEditMode && vehicle) {
            setVehicleData({
                vehicleid: vehicle.vehicleid || '',
                userid: vehicle.userid || '',
                fullname: vehicle.fullname || '',
                nic: vehicle.nic || '',
                contact: vehicle.contact || '',
                email: vehicle.email || '',
                address: vehicle.address || '',
                brand: vehicle.brand || '',
                model: vehicle.model || '',
                year: vehicle.year || '',
                vehicleno: vehicle.vehicleno || '',
                engineno: vehicle.engineno || '',
                chassisno: vehicle.chassisno || '',
                condition: vehicle.condition || ''
            });
        }
    }, [isEditMode, vehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { fullname, nic, email } = vehicleData;
        if (!fullname || !nic || !email) {
            alert("Please fill in all required fields.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return; // Call validateForm

        const isConfirmed = window.confirm("Are you sure you want to Update the form?");
        if (!isConfirmed) return;
    
        try {
            const formData = new FormData();
            Object.keys(vehicleData).forEach(key => {
                formData.append(key, vehicleData[key]);
            });
    
            if (isEditMode && vehicle) {
                await axios.put(`http://localhost:3004/api/vehicles/${vehicle._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert("Account Updated successfully!"); 
            } else {
                await axios.post('http://localhost:3004/api/vehicles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert("Account added successfully!"); 
            }
    
            refreshVehicles(); 
            handleCancel(); 
    
        } catch (error) {
            console.error('Error submitting vehicle data:', error);
            alert("An error occurred while submitting the form.");
        }
    };

    const handleCancel = () => {
        setVehicleData({
            vehicleid: '',
            userid: '',
            fullname: '',
            nic: '',
            contact: '',
            email: '',
            address: '',
            brand: '',
            model: '',
            year: '',
            vehicleno: '',
            engineno: '',
            chassisno: '',
            condition: ''
        });
        onCancel();
    };

    return (
        <div className="main-content">
            <h1>{isEditMode ? 'Update Account' : 'Add New Account'}</h1>

            <div className="form-container">
                <form onSubmit={handleSubmit}>

                    <label htmlFor="vehicleid">Vehicle ID:</label>
                    <input 
                        type="text" 
                        id="vehicleid" 
                        name="vehicleid" 
                        value={vehicleData.vehicleid} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[0-9]/.test(String.fromCharCode(charCode))) {
                                e.preventDefault(); 
                            }
                        }} />

                    <label htmlFor="userid">User ID:</label>
                    <input 
                        type="text" 
                        id="userid" 
                        name="userid" 
                        value={vehicleData.userid} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[0-9]/.test(String.fromCharCode(charCode))) {
                                e.preventDefault(); 
                            }
                        }} />  

                    <label htmlFor="fullname">Full Name:</label>
                    <input 
                        type="text" 
                        id="fullname" 
                        name="fullname" 
                        value={vehicleData.fullname} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[a-zA-Z\s]/.test(String.fromCharCode(charCode))) {
                                e.preventDefault();
                            }
                        }}/>

                    <label htmlFor="nic">NIC:</label>
                    <input 
                        type="text" 
                        id="nic" 
                        name="nic" 
                        value={vehicleData.nic} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const nic = e.target.value;
                            const nicRegex = /^[a-zA-Z0-9]{12}$/;
                            if (!nicRegex.test(nic)) {
                                e.preventDefault(); 
                            }
                        }} />

                    <label htmlFor="contact">Contact:</label>
                    <input 
                        type="text" 
                        id="contact" 
                        name="contact" 
                        value={vehicleData.contact} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[0-9]/.test(String.fromCharCode(charCode))) {
                                e.preventDefault();  
                            }
                        }} />

                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={vehicleData.email} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const email = e.target.value;
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(email)) {
                                e.preventDefault(); 
                            }
                        }} />

                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={vehicleData.address} onChange={handleChange} />

                    <label htmlFor="brand">Brand:</label>
                    <input type="text" id="brand" name="brand" value={vehicleData.brand} onChange={handleChange} />

                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" name="model" value={vehicleData.model} onChange={handleChange} />

                    <label htmlFor="year">Year:</label>
                    <input 
                        type="text" 
                        id="year" 
                        name="year" 
                        value={vehicleData.year} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[0-9]/.test(String.fromCharCode(charCode))) {
                                e.preventDefault();
                            }
                        }} />

                    <label htmlFor="vehicleno">Vehicle No:</label>
                    <input type="text" id="vehicleno" name="vehicleno" value={vehicleData.vehicleno} onChange={handleChange} />

                    <label htmlFor="engineno">Engine No:</label>
                    <input 
                        type="text" 
                        id="engineno" 
                        name="engineno" 
                        value={vehicleData.engineno} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[A-Z0-9]/.test(String.fromCharCode(charCode))) {
                                e.preventDefault();
                            }
                        }} />

                    <label htmlFor="chassisno">Chassis No:</label>
                    <input 
                        type="text" 
                        id="chassisno" 
                        name="chassisno" 
                        value={vehicleData.chassisno} 
                        onChange={handleChange} 
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[A-Z0-9]/.test(String.fromCharCode(charCode))) {
                                e.preventDefault();
                            }
                        }} />
                    
                    <label htmlFor="condition">Service Records:</label>
                    <input type="text" id="condition" name="condition" value={vehicleData.condition} onChange={handleChange} />

                    <div className="form-buttons">
                        <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="save">{isEditMode ? 'Update' : 'Save'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehicleForm;
