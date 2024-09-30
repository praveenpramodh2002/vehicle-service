// src/components/VehicleForm.js
import React, { useState } from 'react';
import axios from 'axios';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    vehicleid: '',
    userid: '',
    fullname: '',
    nic: '',
    contact: '',
    email: '',
    address: '',
    brand: '',
    model: '',
    year: '',
    vehicleno: '',
    engineno: '',
    chassisno: '',
    condition: '',
  });

  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log form data

    try {
        const response = await axios.post('http://localhost:3001/api/submit-vehicle-data', formData);

      setMessage(response.data.message);
      // Clear the form
      setFormData({
        vehicleid: '',
        userid: '',
        fullname: '',
        nic: '',
        contact: '',
        email: '',
        address: '',
        brand: '',
        model: '',
        year: '',
        vehicleno: '',
        engineno: '',
        chassisno: '',
        condition: '',
      });
    } catch (error) {
      console.error('Error submitting vehicle data:', error);
      setMessage(error.response?.data?.message || 'An error occurred while submitting the form.');
    }
  };

  return (
    <div>
      <h2>Submit Vehicle Data</h2>
      <form onSubmit={handleSubmit}>
        <label>Vehicle ID:</label>
        <input type="text" name="vehicleid" value={formData.vehicleid} onChange={handleChange} required /><br />

        <label>User ID:</label>
        <input type="text" name="userid" value={formData.userid} onChange={handleChange} required /><br />

        <label>Full Name:</label>
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required /><br />

        <label>NIC:</label>
        <input type="text" name="nic" value={formData.nic} onChange={handleChange} required /><br />

        <label>Contact:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required /><br />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required /><br />

        <label>Brand:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required /><br />

        <label>Model:</label>
        <input type="text" name="model" value={formData.model} onChange={handleChange} required /><br />

        <label>Year:</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} required /><br />

        <label>Vehicle No:</label>
        <input type="text" name="vehicleno" value={formData.vehicleno} onChange={handleChange} required /><br />

        <label>Engine No:</label>
        <input type="text" name="engineno" value={formData.engineno} onChange={handleChange} required /><br />

        <label>Chassis No:</label>
        <input type="text" name="chassisno" value={formData.chassisno} onChange={handleChange} required /><br />

        <label>Condition:</label>
        <input type="text" name="condition" value={formData.condition} onChange={handleChange} required /><br />

        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VehicleForm;
