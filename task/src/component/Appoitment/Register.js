// src/components/Register.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Ensure you create a CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: ''
    },
    vehicles: [{
      make: '',
      model: '',
      year: '',
      licensePlate: ''
    }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleVehicleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicles = [...formData.vehicles];
    updatedVehicles[index][name] = value;
    setFormData(prev => ({
      ...prev,
      vehicles: updatedVehicles
    }));
  };

  const handleAddVehicle = () => {
    setFormData(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, {
        make: '',
        model: '',
        year: '',
        licensePlate: ''
      }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register-page">
      {/* Circular Background Elements */}
      <div className="circle-bg">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>

      <div className="register-container">
        <div className="register-header">
          <h2>Create Your Account</h2>
          <p>Join our vehicle service community</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Address Information</h3>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="street">Street Address</label>
                <input
                  type="text"
                  id="street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  required
                  placeholder="Enter your street address"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter your city"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Vehicle Information</h3>
            {formData.vehicles.map((vehicle, index) => (
              <div key={index} className="vehicle-section">
                <div className="vehicle-header">
                  <h4>Vehicle {index + 1}</h4>
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-vehicle"
                      onClick={() => {
                        const updatedVehicles = formData.vehicles.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, vehicles: updatedVehicles }));
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`make-${index}`}>Make</label>
                    <input
                      type="text"
                      id={`make-${index}`}
                      name="make"
                      value={vehicle.make}
                      onChange={(e) => handleVehicleChange(index, e)}
                      required
                      placeholder="Enter vehicle make"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`model-${index}`}>Model</label>
                    <input
                      type="text"
                      id={`model-${index}`}
                      name="model"
                      value={vehicle.model}
                      onChange={(e) => handleVehicleChange(index, e)}
                      required
                      placeholder="Enter vehicle model"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`year-${index}`}>Year</label>
                    <input
                      type="number"
                      id={`year-${index}`}
                      name="year"
                      value={vehicle.year}
                      onChange={(e) => handleVehicleChange(index, e)}
                      required
                      placeholder="Enter vehicle year"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`licensePlate-${index}`}>License Plate</label>
                    <input
                      type="text"
                      id={`licensePlate-${index}`}
                      name="licensePlate"
                      value={vehicle.licensePlate}
                      onChange={(e) => handleVehicleChange(index, e)}
                      required
                      placeholder="Enter license plate"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add-vehicle-btn"
              onClick={handleAddVehicle}
            >
              + Add Another Vehicle
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Create Account</button>
            <p className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
