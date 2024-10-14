import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManagerLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/managers/login', formData);
            if (response.data.success) {
                // Assuming the server returns an email or phone number
                setEmail(response.data.email);
                setIsOtpSent(true); // Set state to show OTP form
                alert('OTP sent to your email/phone');
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            alert('Login failed');
        }
    };
    

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/managers/verify-otp', { email, otp });
            alert('Login successful');
            navigate("/hrmdb");
        } catch (err) {
            console.error(err);
            alert('Invalid OTP');
        }
    };

    return (
        <div>
            <h2>Manager Login</h2>
            {!isOtpSent ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div>
                        <label>Enter OTP:</label>
                        <input type="text" name="otp" value={otp} onChange={handleOtpChange} required />
                    </div>
                    <button type="submit">Verify OTP</button>
                </form>
            )}
        </div>
    );
};

export default ManagerLogin;
