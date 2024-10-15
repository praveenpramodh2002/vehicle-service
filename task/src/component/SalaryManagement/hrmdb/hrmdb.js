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
        const response = await axios.get('http://localhost:3001/employees/count'); // Adjust the endpoint to your API
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
    <div className="hrmdb-container">
      <div className="hrmdb-sidebar">
        <Sidebar />
      </div>

      <div className="hrmdb-content">
        <div className="hrmdb-header">
          <h1>HR Manager Dashboard</h1>
        </div>

        {/* Card Row: Three Cards Aligned Horizontally */}
        <div className="hrmdb-card-row">
          <div className="hrmdb-card">
            <div className="hrmdb-circle">
              {/* Display a loading message or the employee count */}
              <span>{loading ? 'Loading...' : employeeCount}</span>
            </div>
            <p>Total Number Of Employees</p>
          </div>
          <div className="hrmdb-card">
            <Link to="/addemployee" className="hrmdb-link">
              <img src="add.png" alt="Add Employee" />
              <p>Add New Employee</p>
            </Link>
          </div>
          <div className="hrmdb-card">
            <Link to="/employeelist" className="hrmdb-link">
              <img src="list.png" alt="Employee List" />
              <p>Employee List</p>
            </Link>
          </div>
        </div>

        {/* Other Cards */}
        <div className="hrmdb-card-row">
          <div className="hrmdb-card">
            <Link to="/deletedemployees" className="hrmdb-link">
              <img src="deleted.png" alt="Deleted Employees" />
              <p>Deleted Employees</p>
            </Link>
          </div>
          <div className="hrmdb-card">
            <Link to="/generatepayroll" className="hrmdb-link">
              <img src="payroll.jpg" alt="Generate Payrolls" />
              <p>Generate Payrolls</p>
            </Link>
          </div>
          <div className="hrmdb-card">
            <Link to="/paysheets" className="hrmdb-link">
              <img src="salary.jpg" alt="Generate Salary Reports" />
              <p>Generate Salary Reports</p>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Hrmdb;
