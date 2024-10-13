import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedServices = [], totalPrice = 0, totalTime = 0 } = location.state || {};

  const [form, setForm] = useState({
    customerName: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    axios.post('http://localhost:3001/bookings', {
      customerName: form.customerName,
      date: form.date,
      time: form.time,
      services: selectedServices,
      totalPrice,
      totalTime
    })
    .then(response => {
      navigate('/bookingConfirmation'); // Redirect to a confirmation page
    })
    .catch(error => {
      console.error('Error creating booking:', error);
    });
  };

  return (
    <div className="create-booking-container">
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="summary">
          <h3>Selected Services:</h3>
          <ul>
            {selectedServices.map((serviceId) => (
              <li key={serviceId}>{serviceId}</li> 
            ))}
          </ul>
          <p>Total Price: Rs.{totalPrice}</p>
          <p>Total Time: {totalTime} mins</p>
        </div>
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default CreateBooking;
