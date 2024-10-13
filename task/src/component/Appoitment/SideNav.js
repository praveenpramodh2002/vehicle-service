import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  // Placeholder customer data
  const customer = {
    name: 'John Doe',
    profileImage: 'https://via.placeholder.com/50' // Placeholder image URL
  };

  return (
    <div className="nav-container">
      <div className="top-bar">
        <img src={customer.profileImage} alt="Profile" className="profile-image" />
        <span className="customer-name">{customer.name}</span>
      </div>
      <div className="nav-bar">
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
