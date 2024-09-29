import React, { useState, useEffect } from 'react';
import './vehicleForm.css';  
import axios from 'axios';

const AddVehicleForm = ({ vehicle, isEditMode, refreshVehicles, onCancel }) => {
    const [vehicleData, setVehicleData] = useState({
        brand: 'Toyota',
        model: '',
        year: '',
        vehicleno: '',
        engineno: '',
        chassisno: '',
        vehicleid: '',
        userid: '001',
        vehicleimage: null,
        condition: ''
    });

    // Populate the form with the existing vehicle data when in edit mode
    useEffect(() => {
        if (isEditMode && vehicle) {
            setVehicleData({
                brand: vehicle.brand || '',
                model: vehicle.model || '',
                year: vehicle.year || '',
                vehicleno: vehicle.vehicleno || '',
                engineno: vehicle.engineno || '',
                chassisno: vehicle.chassisno || '',
                vehicleid: vehicle.vehicleid || '',
                userid: vehicle.userid || '',
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(vehicleData).forEach(key => {
                if (key === 'vehicleimage' && vehicleData[key]) {
                    formData.append('vehicleimage', vehicleData[key]);
                } else {
                    formData.append(key, vehicleData[key]);
                }
            });

            if (isEditMode && vehicle) {
                // Update the vehicle
                await axios.put(`http://localhost:3002/api/vehicles/${vehicle._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Add a new vehicle
                await axios.post('http://localhost:3002/api/vehicles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            refreshVehicles(); // Refresh the vehicle list
            handleCancel(); // Reset form data or close the form
        } catch (error) {
            console.error('Error submitting vehicle data:', error);
            // Handle the error state here to show feedback to the user
        }
    };

    const handleCancel = () => {
        setVehicleData({
            vehicleid: '',
            userid: '',
            brand: '',
            model: '',
            year: '',
            vehicleno: '',
            engineno: '',
            chassisno: '',
            condition: ''
        });
        onCancel(); // Call the onCancel prop to close or reset the form
    };

};

export default AddVehicleForm;
