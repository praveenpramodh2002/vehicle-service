import React, { useState } from 'react';
import axios from 'axios';
import './uploadattendance.css';
import Sidebar from "../sidebar/sidebar.js";

const UploadAttendance = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'text/csv') {
            setMessage('Please upload a valid CSV file');
            setFile(null);
        } else {
            setFile(selectedFile);
            setMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please upload a file');
            return;
        }

        const formData = new FormData();
        formData.append('attendanceFile', file);

        try {
            const response = await axios.post('http://localhost:5000/attendance/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response) {
                setMessage(`Failed to upload file: ${error.response.data.message}`);
            } else {
                setMessage('Failed to upload file: Network error');
            }
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="content">
                <div className="attendance-upload-container">
                    <h2>Upload Attendance File</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Upload CSV File</label>
                            <input type="file" onChange={handleFileChange} accept=".csv" />
                        </div>
                        <button type="submit">Upload</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default UploadAttendance;
