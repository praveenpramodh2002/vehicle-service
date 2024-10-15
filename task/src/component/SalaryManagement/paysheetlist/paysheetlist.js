// PaysheetList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import "./paysheetlist.css"; // Make sure this CSS file includes relevant styles

const URL = "http://localhost:3001/paysheet"; // Adjust this to your backend route

const PaysheetList = () => {
    const [paysheets, setPaysheets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaysheets = async () => {
            try {
                const response = await axios.get(URL);
                setPaysheets(response.data); // Assuming response is an array of paysheets
            } catch (error) {
                console.error("Error fetching paysheets:", error);
                alert("Failed to fetch paysheets. Please try again.");
            }
        };

        fetchPaysheets();
    }, []);

    const handleViewPaysheet = (nic) => {
        navigate(`/paysheet/${nic}`); // Navigate to specific paysheet details
    };

    return (
        <div className="paysheet-container">
            <div className="paysheet-sidebar">
                <Sidebar />
            </div>
            <div className="paysheet-content">
                <h1>Paysheet List</h1>
                <table className="paysheet-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>NIC</th>
                            <th>Net Salary</th>
                            <th>Generated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paysheets.map((paysheet) => (
                            <tr key={paysheet.nic}>
                                <td>{paysheet.employee_name}</td>
                                <td>{paysheet.position}</td>
                                <td>{paysheet.department}</td>
                                <td>{paysheet.nic}</td>
                                <td>{paysheet.netSalary}</td>
                                <td>{new Date(paysheet.generatedAt).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleViewPaysheet(paysheet.nic)} className="paysheet-view-button">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaysheetList;
