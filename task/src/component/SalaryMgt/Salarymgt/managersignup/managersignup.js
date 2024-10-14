import React, { useState } from 'react';
import axios from 'axios';
import './managersignup.css';

const ManagerSignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        nic: '',
        email: '',
        username: '',
        password: '',
        position: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/managers', formData);
            console.log(response.data);
            alert('Manager added successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to add manager');
        }
    };

    return (
        <div>
            <h2>Manager Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>NIC:</label>
                    <input type="text" name="nic" value={formData.nic} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Position:</label>
                    <select name="position" value={formData.position} onChange={handleChange} required>
                        <option value="">Select Position</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Service Manager">Service Manager</option>
                        <option value="Inventory Manager">Inventory Manager</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default ManagerSignupForm;
