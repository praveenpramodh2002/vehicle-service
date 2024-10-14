import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './hrmdb.css';
import Sidebar from "../sidebar/sidebar.js";

const Hrmdb = () => {
  const [employeeCount, setEmployeeCount] = useState(0); // State to store number of employees
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch the number of employees from the backend API
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees/count'); // Adjust the endpoint to your API
        setEmployeeCount(response.data.count); // Assuming the API returns an object with the count
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee count:', error);
        setLoading(false);
      }
    };

    fetchEmployeeCount();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content">
        <div className="header">
          <h1>HR Manager Dashboard</h1>
        </div>

        {/* Card Row: Three Cards Aligned Horizontally */}
        <div className="card-row">
          <div className="card">
            <div className="circle">
              {/* Display a loading message or the employee count */}
              <span>{loading ? 'Loading...' : employeeCount}</span>
            </div>
            <p>Total Number Of Employees</p>
          </div>
          <div className="card">
            <Link to="/addemployee" className="link">
              <img src="image/add.png" alt="Add Employee" />
              <p>Add New Employee</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/employeelist" className="link">
              <img src="image/list.png" alt="Employee List" />
              <p>Employee List</p>
            </Link>
          </div>
        </div>

        {/* Other Cards */}
        <div className="card-row">
          <div className="card">
            <Link to="/deletedemployees" className="link">
              <img src="image/deleted.png" alt="Deleted Employees" />
              <p>Deleted Employees</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/generatepayroll" className="link">
              <img src="image/payroll.jpg" alt="Generate Payrolls" />
              <p>Generate Payrolls</p>
            </Link>
          </div>
          <div className="card">
            <img src="image/salary.jpg" alt="Generate Salary Reports" />
            <p>Generate Salary Reports</p>
          </div>
        </div>
        {/* Other Cards */}
        <div className="card-row">
          <div className="card">
            <Link to="/uploadattendance" className="link">
              <img src="image/uploadattendance.png" alt="Upload Attendance" />
              <p>Add Attendance Record</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/attendancesummary" className="link">
              <img src="image/attendancesummary.png" alt="Attendance Summary" />
              <p>View Attendance Summary</p>
            </Link>
          </div>
          <div className="card">
            <img src="image/salary.jpg" alt="Generate Salary Reports" />
            <p>Generate Salary Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hrmdb;
