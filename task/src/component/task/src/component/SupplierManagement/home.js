import React from "react";
import { Link } from "react-router-dom";
import './Styles.css';

const Home = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          <img src="image/logo2.jpeg" alt="Micro Automotive" className="profile-pic" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/Home3" className="active" >Home</Link>
          </li>
          <li>
            <Link to="/ViewSup">Supplier Details</Link>
          </li>
          <li>
            <Link to="/AddSupplierForm">Add New Supplier</Link>
          </li>
          <li>
            <Link to="/ProductRequests">Product Requests</Link>
          </li>
          <li>
            <Link to="/SupplierReports">Supplier Reports</Link>
          </li>
        </ul>
        <button className="signout-btn">Sign out</button>
      </aside>
      <main className="main-content">
        <h1 className="h1-home">Supplier Manager Dashboard</h1>
        <div className="dashboard-options">
          <Link to="/Viewsup" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="option">
              <img src="/image/add.png" alt="Add" />
              <h2>Manage Suppliers</h2>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
