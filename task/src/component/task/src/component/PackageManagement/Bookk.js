import React, { useEffect, useState } from "react";
import "./Bookk.css";

export default function Bookk() {
  const [bookingDateTime, setBookingDateTime] = useState("");

  // Generate random date between 5 to 10 days from today
  useEffect(() => {
    const randomDate = generateRandomDate();
    setBookingDateTime(randomDate);
  }, []);

  // Function to generate a random date and time within the next 5 to 10 days
  const generateRandomDate = () => {
    const today = new Date();
    
    // Set range for 5 to 10 days after today
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 5);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 10);

    // Generate a random time between minDate and maxDate
    const randomTime = Math.floor(Math.random() * (maxDate.getTime() - minDate.getTime())) + minDate.getTime();
    const randomDateTime = new Date(randomTime);

    const date = randomDateTime.toLocaleDateString(); // Format date as "MM/DD/YYYY"
    const time = randomDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format time as "HH:MM AM/PM"

    return `${date} at ${time}`;
  };

  return (
    <div className="booking-confirmation2">
      <h1>Booking Confirmation</h1>
      
      {/* Booking Details Section */}
      <div className="booking-details2">
        <h2>Your Package: Premium Car Wash</h2>
        <p><strong>Description:</strong> A full-service car wash including interior cleaning, waxing, and polishing.</p>
        <p><strong>Price:</strong> ₨1200</p>
        <p><strong>Special Offer:</strong> ₨200 Off</p>
        <p><strong>Total Price:</strong> ₨1000</p>
        <p><strong>Booking Date & Time:</strong> {bookingDateTime}</p> {/* Display randomly generated date and time */}
      </div>
      
      {/* Footer Section */}
      <div className="booking-footer2">
        <p>Thank you for booking with us! We look forward to seeing you at the scheduled time.</p>
        <p>&copy; 2024 Car Service Station. All Rights Reserved.</p>
      </div>
    </div>
  );
}
