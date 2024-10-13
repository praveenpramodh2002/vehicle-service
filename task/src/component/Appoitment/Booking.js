import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faDollarSign, faConciergeBell } from '@fortawesome/free-solid-svg-icons'; // Import icons
import "react-datepicker/dist/react-datepicker.css";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const { selectedServices, totalPrice, totalTime } = location.state;

  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingCreated, setBookingCreated] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();
  const minDate = today;
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

  const fetchAvailableTimes = async (date) => {
    try {
      const response = await axios.get(`http://localhost:8070/booking/available-times?date=${date}`);
      setAvailableTimes(response.data);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setError("Failed to fetch available times.");
    }
  };

  const handleDateChange = (date) => {
    setBookingDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      fetchAvailableTimes(formattedDate);
    }
  };

  const handleBooking = async () => {
    if (!bookingDate || !bookingTime) {
      setError("Please select a date and time for the booking.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8070/booking", {
        services: selectedServices.map(service => ({
          serviceId: service.serviceId,
          name: service.name,
        })),
        totalPrice,
        totalTime,
        bookingDate: bookingDate.toISOString().split('T')[0],
        bookingTime,
      });

      if (response.status === 201) {
        setBookingCreated(true);
        setError("");
      }
    } catch (error) {
      console.error("Error details:", error.response.data);
      setError("Error creating booking: " + error.message);
    }
  };

  return (
    <div className="booking-container">
      <h2 align="center">Create Booking</h2>
      <div className="booking-details">
        <p>
          <FontAwesomeIcon icon={faConciergeBell} /> <strong>Services Selected:</strong>{" "}
          {selectedServices.map((service) => (
            <span key={service.serviceId}>{service.name}</span>
          )).reduce((prev, curr) => [prev, ', ', curr])}
        </p>
        <p>
          <FontAwesomeIcon icon={faDollarSign} /> <strong>Total Price:</strong> Rs.{totalPrice}
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} /> <strong>Total Time:</strong> {totalTime} mins
        </p>
      </div>
      <div className="booking-form">
        <div className="date-picker-container">
          <FontAwesomeIcon icon={faCalendarAlt} className="date-picker-icon" />
          <DatePicker
            selected={bookingDate}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="date-picker"
          />
        </div>
        <select
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
          disabled={!availableTimes.length}
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <button onClick={handleBooking}>Confirm Booking</button>
        {error && <p className="error">{error}</p>}
        {bookingCreated && <p className="success">Booking successfully created!</p>}
      </div>
    </div>
  );
};

export default Booking;
