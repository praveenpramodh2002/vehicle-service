import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  MailOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./main.css";
import axios from "axios";

const Dashboard1 = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const [employeeCount, setEmployeeCount] = useState(0); // State to store number of employees
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch the number of employees from the backend API
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/employees/count"
        ); // Adjust the endpoint to your API
        setEmployeeCount(response.data.count); // Assuming the API returns an object with the count
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee count:", error);
        setLoading(false);
      }
    };

    fetchEmployeeCount();
  }, []);

  return (
    <div className="container">
      <div className={`sidebar12 ${collapsed ? "collapsed" : ""}`}>
        <div className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className="logo">
          <img src="image/logo2.jpeg" alt="Micro Automotive" />
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <HomeOutlined /> <a href="main">Home</a>
            </li>
            <li>
              <FileSearchOutlined /> <a href="#">Tracking</a>
            </li>
            <li>
              <BarChartOutlined /> <a href="report">Reports</a>
            </li>
            <li>
              <FileSearchOutlined />
              <a href="task">Task Overview</a>
            </li>
          </ul>
        </nav>
        <div className="tools">
          <p>Tools</p>
          <ul>
            <li>
              <MailOutlined />
              <span>Inbox</span>
            </li>
            <li>
              <SettingOutlined />
              <span>Settings</span>
            </li>
            <li>
              <QuestionCircleOutlined />
              <a href="#">Help</a>
            </li>
          </ul>
        </div>
        <div className="user-profile">
          <img src="user2.jpeg" alt="User" />
          <span>Joe Max</span>
          <button className="logout-button">Log Out</button>
        </div>
      </div>

      <div className={`dashboard ${collapsed ? "collapsed" : ""}`}>
        <div className="content">
          <div className="header">
            <h1>HR Manager Dashboard</h1>
          </div>

          {/* Card Row: Three Cards Aligned Horizontally */}
          <div className="card-row">
            <div className="card">
              {/* Display a loading message or the employee count */}
              <span>{loading ? "Loading..." : employeeCount}</span>
              <p>Total Number Of Employees</p>
            </div>
            <div className="card">
              <Link to="/task" className="hrmdb-link">
                <img src="image/task.jpeg" alt="Employee List" />

                <p>Add New Task</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/report" className="hrmdb-link">
                <img src="image/task.jpeg" alt="Employee List" />

                <p>Task Reports</p>
              </Link>
            </div>
          </div>

          {/* Other Cards */}
          <div className="card-row">
            <div className="card">
              <Link to="/addemployee" className="hrmdb-link">
                <img src="add.png" alt="Add Employee" />
                <p>Add New Employee</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/employeelist" className="hrmdb-link">
                <img src="list.png" alt="Employee List" />
                <p>Employee List</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/tracking" className="hrmdb-link">
                <img src="attendance.webp" alt="Task Tracking" />
                <p>Task Tracking</p>
              </Link>
            </div>
          </div>

          {/* Other Cards */}
          <div className="card-row">
            <div className="card">
              <Link to="/generatepayroll" className="hrmdb-link">
                <img src="payroll.jpg" alt="Generate Payrolls" />
                <p>Generate Payrolls</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/paysheets" className="hrmdb-link">
                <img src="salary.jpg" alt="Generate Salary Reports" />
                <p>Generate Salary Reports</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/deletedemployees" className="hrmdb-link">
                <img src="deleted.png" alt="Deleted Employees" />
                <p>Deleted Employees</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
