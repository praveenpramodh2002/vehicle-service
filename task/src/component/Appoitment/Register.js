// src/components/Register.js

import React, { useState } from 'react';
import './Register.css'; // Ensure you create a CSS file for styling

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({ street: '', city: '' });
  const [vehicles, setVehicles] = useState([{ make: '', model: '', year: '', licensePlate: '' }]);

  const handleVehicleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedVehicles = [...vehicles];
    updatedVehicles[index][name] = value;
    setVehicles(updatedVehicles);
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, { make: '', model: '', year: '', licensePlate: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the data to your API or server
    console.log('Registering customer:', { firstName, lastName, email, phone, address, vehicles });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Address - Street:</label>
          <input
            type="text"
            id="street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Address - City:</label>
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicles:</label>
          {vehicles.map((vehicle, index) => (
            <div key={index} className="vehicle-form">
              <h4>Vehicle {index + 1}</h4>
              <div className="form-group">
                <label htmlFor={`make-${index}`}>Make:</label>
                <input
                  type="text"
                  id={`make-${index}`}
                  name="make"
                  value={vehicle.make}
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`model-${index}`}>Model:</label>
                <input
                  type="text"
                  id={`model-${index}`}
                  name="model"
                  value={vehicle.model}
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`year-${index}`}>Year:</label>
                <input
                  type="number"
                  id={`year-${index}`}
                  name="year"
                  value={vehicle.year}
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`licensePlate-${index}`}>License Plate:</label>
                <input
                  type="text"
                  id={`licensePlate-${index}`}
                  name="licensePlate"
                  value={vehicle.licensePlate}
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddVehicle}>Add Another Vehicle</button>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
