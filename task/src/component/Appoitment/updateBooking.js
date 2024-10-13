import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./updateBooking.css";

const UpdateBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]); // Available times from server
  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
  });

  // Fetch the booking details by ID
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/booking/${id}`);
        setBooking(response.data);
        setFormData({
          bookingDate: new Date(response.data.bookingDate).toISOString().split("T")[0],
          bookingTime: response.data.bookingTime,
        });
      } catch (error) {
        console.error("Error fetching booking:", error);
        setError("Failed to fetch booking details.");
      }
    };
    fetchBooking();
  }, [id]);

  // Function to validate date selection (limit to today and future dates, max 3 months)
  const isDateWithinLimit = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Max 3 months from today

    return selectedDate >= today && selectedDate <= maxDate;
  };

  // Function to fetch available times for the selected date
  const fetchAvailableTimes = async (date) => {
    if (!isDateWithinLimit(date)) {
      setError("Please select a valid date (within the next 3 months).");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8070/booking/available-times?date=${date}`);
      setAvailableTimes(response.data); // Assuming the response contains available times
      setError("");
    } catch (error) {
      console.error("Error fetching available times:", error);
      setError("Failed to fetch available times.");
    }
  };

  // Handle changes in the form inputs (date and time)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "bookingDate") {
      fetchAvailableTimes(value); // Fetch available times when the date changes
    }
  };

  // Handle form submission (update booking)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDateWithinLimit(formData.bookingDate)) {
      setError("Please select a valid date within the allowed range.");
      return;
    }

    try {
      await axios.put(`http://localhost:8070/booking/${id}`, formData);
      navigate("/bookings");
    } catch (error) {
      console.error("Error updating booking:", error);
      setError("Failed to update booking.");
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="update-booking-container">
      <h2>Update Booking</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookingDate">Booking Date</label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]} // Min date is today
            max={new Date(new Date().setMonth(new Date().getMonth() + 3))
              .toISOString()
              .split("T")[0]} // Max date is 3 months from today
          />
        </div>

        <div className="form-group">
          <label htmlFor="bookingTime">Booking Time</label>
          <select
            id="bookingTime"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            required
            disabled={!availableTimes.length} // Disable if no available times
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
