import React, { useState } from 'react';
import { 
    HomeOutlined,
    FileSearchOutlined,
    BarChartOutlined,
    MailOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './main.css';

const Dashboard1 = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className="logo">
          <img src="image/logo2.jpeg" alt="Micro Automotive" />
        </div>
        <nav className="navigation">
          <ul>
            <li><HomeOutlined /> <a href="main">Home</a></li>
            <li><FileSearchOutlined /> <a href="#">Tracking</a></li>
            <li><BarChartOutlined /> <a href="report">Reports</a></li>
            <li><FileSearchOutlined /><a href="task">Task Overview</a></li>
          </ul>
        </nav>
        <div className="tools">
          <p>Tools</p>
          <ul>
            <li><MailOutlined /><span>Inbox</span></li>
            <li><SettingOutlined /><span>Settings</span></li>
            <li><QuestionCircleOutlined /><a href="#">Help</a></li>
          </ul>
        </div>
        <div className="user-profile">
          <img src="user2.jpeg" alt="User" />
          <span>Joe Max</span>
          <button className="logout-button">Log Out</button>
        </div>
      </div>

      <div className={`dashboard ${collapsed ? 'collapsed' : ''}`}>
        <div className="content">
          <div className="header">
            <h1>HR Manager Dashboard</h1>
          </div>

          {/* Card Row: Three Cards Aligned Horizontally */}
          <div className="card-row">
            <div className="card">
              <img src="image/Attend.jpeg" alt="Add Employee" />
              <p>Attendance Percentage</p>
            </div>
            <div className="card">
              
                <img src="image/employee.jpeg" alt="Add Employee" />
                <p>Add New Employee</p>
              
            </div>
            <div className="card">
              
                <img src="image/task.jpeg" alt="Employee List" />
                <a href="task">
                <p>Task management</p></a>
              
            </div>
          </div>

          {/* Other Cards */}
          <div className="card-row">
            <div className="card">
              <img src="image/report11.jpeg" alt="Generate Reports" />
              <p>Generate Attendance Reports</p>
            </div>
            <div className="card">
              <img src="image/paysalary.jpeg" alt="Generate Payrolls" />
              <p>Generate Payrolls</p>
            </div>
            <div className="card">
              <img src="image/salary.jpeg" alt="Generate Salary Reports" />
              <p>Generate Salary Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
