import React, { useState, useEffect } from 'react';
import './vehicleForm.css';  
import axios from 'axios';

const AddVehicleForm = ({ vehicle, isEditMode, refreshVehicles, onCancel }) => {
    const [step, setStep] = useState(1); 
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

    // Unique ID counters
    const [vehicleCounter, setVehicleCounter] = useState(1);
    const [userCounter, setUserCounter] = useState(1);

    const generateUniqueId = (prefix, counter) => {
        return `${prefix}${String(counter).padStart(4, '0')}`; // Formats the counter to four digits
    };

    // Fetch current highest IDs
    const fetchCurrentIds = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/vehicles'); // Update to your actual endpoint
            const vehicles = response.data;

            if (vehicles.length > 0) {
                const maxVehicleId = Math.max(...vehicles.map(v => parseInt(v.vehicleid.replace('VEHICLE', ''))));
                const maxUserId = Math.max(...vehicles.map(v => parseInt(v.userid.replace('USER', ''))));

                setVehicleCounter(maxVehicleId + 1);
                setUserCounter(maxUserId + 1);
            }
        } catch (error) {
            console.error('Error fetching current IDs:', error);
        }
    };

    useEffect(() => {
        fetchCurrentIds(); // Fetch current IDs on mount

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
        } else {
            // Automatically generate IDs for new vehicle
            setVehicleData((prevData) => ({
                ...prevData,
                vehicleid: generateUniqueId('VEHICLE', vehicleCounter), 
                userid: generateUniqueId('USER', userCounter)      
            }));
        }
    }, [isEditMode, vehicle, vehicleCounter, userCounter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validatePersonalData = () => {
        const { fullname, nic, email } = vehicleData;
        return fullname && nic && email; 
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validatePersonalData()) {
            setStep(2); 
        } else {
            alert("Please fill in all personal data fields correctly.");
        }
    };

    const validateForm = () => {
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isValid = validateForm();
        if (!isValid) return; 
    
        const isConfirmed = window.confirm(isEditMode 
            ? "Are you sure you want to Update the form?" 
            : "Are you sure you want to Submit the form?"
        );
        if (!isConfirmed) return;
    
        try {
            const formData = new FormData();
            Object.keys(vehicleData).forEach(key => {
                formData.append(key, vehicleData[key]);
            });
    
            if (isEditMode && vehicle) {
                await axios.put(`http://localhost:3001/api/vehicles/${vehicle._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert("Account Updated successfully!"); 
            } else {
                await axios.post('http://localhost:3001/api/vehicles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert("Account added successfully!"); 
                
                setVehicleCounter(prevCounter => prevCounter + 1);
                setUserCounter(prevCounter => prevCounter + 1);
                
                setVehicleData({
                    vehicleid: generateUniqueId('VEHICLE', vehicleCounter + 1), 
                    userid: generateUniqueId('USER', userCounter + 1),
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
        setStep(1); 
        onCancel();
    };

    return (
        <div className="main-content">
            <h1>{isEditMode ? 'Update Account' : 'Add New Account'}</h1>

            <div className="form-container">
                <form onSubmit={step === 1 ? handleNext : handleSubmit}>
                    {step === 1 && (
                        <>
                           {/* User Data Table 
                            <label htmlFor="vehicleid">Vehicle ID:</label>
                            <input 
                                type="text" 
                                id="vehicleid" 
                                name="vehicleid" 
                                value={vehicleData.vehicleid} 
                                readOnly 
                            />

                           <label htmlFor="userid">User ID:</label>
                            <input 
                                type="text" 
                                id="userid" 
                                name="userid" 
                                value={vehicleData.userid} 
                                readOnly 
                            />  */}

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
                                }} 
                            />

                            <label htmlFor="nic">NIC:</label>
                            <input 
                                type="text" 
                                id="nic" 
                                name="nic" 
                                value={vehicleData.nic} 
                                onChange={(e) => {
                                    const nic = e.target.value;
                                    const nicRegex = /^[0-9XV]*$/;
                                    if (nic.length <= 12 && nicRegex.test(nic)) {
                                        handleChange(e); 
                                    } else {
                                        e.preventDefault();
                                    } 
                                }} 
                            />

                            <label htmlFor="contact">Contact:</label>
                            <input 
                                type="text" 
                                id="contact" 
                                name="contact" 
                                value={vehicleData.contact} 
                                onChange={(e) => {
                                    const contact = e.target.value;
                                    if (/^[0-9]*$/.test(contact) && contact.length <= 10) {
                                        handleChange(e);
                                    } else {
                                        e.preventDefault();
                                    } 
                                }} 
                                onKeyPress={(e) => {
                                    const charCode = e.charCode;
                                    if (!/[0-9]/.test(String.fromCharCode(charCode))) {
                                        e.preventDefault();
                                    }
                                }} 
                            />

                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={vehicleData.email} 
                                onChange={handleChange} 
                            />

                            <label htmlFor="address">Address:</label>
                            <input 
                                type="text" 
                                id="address" 
                                name="address" 
                                value={vehicleData.address} 
                                onChange={handleChange} 
                            />
                            
                            <div className="form-buttons">
                                <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                                <button type="submit" className="save">Next</button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>

                            <label htmlFor="vehicleno">Vehicle No:</label>
                            <input type="text" id="vehicleno" name="vehicleno" value={vehicleData.vehicleno} onChange={handleChange} />

                            <label htmlFor="brand">Brand:</label>
                            <input type="text" id="brand" name="brand" value={vehicleData.brand} onChange={handleChange} />

                            <label htmlFor="model">Model:</label>
                            <input type="text" id="model" name="model" value={vehicleData.model} onChange={handleChange} />

                            <label htmlFor="year">Year:</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={vehicleData.year}
                                onChange={(e) => {
                                const year = e.target.value;
                                const currentYear = new Date().getFullYear();
                            if (year <= currentYear && year.length <= 4) {
                            handleChange(e);  
                            } else {
                            e.preventDefault(); 
                            } }}
                            onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!/[0-9]/.test(String.fromCharCode(charCode))) {
                            e.preventDefault();
                            } }} />

                            <label htmlFor="engineno">Engine No:</label>
                            <input type="text" id="engineno" name="engineno" value={vehicleData.engineno} onChange={handleChange} />

                            <label htmlFor="chassisno">Chassis No:</label>
                            <input type="text" id="chassisno" name="chassisno" value={vehicleData.chassisno} onChange={handleChange} />

                            <label htmlFor="condition">Services:</label>
                            <input type="text" id="condition" name="condition" value={vehicleData.condition} onChange={handleChange} />

                            <div className="form-buttons">
                                <button type="button" className="cancel" onClick={() => setStep(1)}>Back</button>
                                <button type="submit" className="save">Save</button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddVehicleForm;
