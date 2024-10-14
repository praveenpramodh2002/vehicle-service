import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Bookings.css';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [nextFourMonths, setNextFourMonths] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/booking')
      .then(response => {
        setBookings(response.data);
        setFilteredBookings(response.data); // Initially display all bookings
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings.');
      });
    
    const currentMonth = new Date().getMonth(); // 0 is January, 11 is December
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const upcomingMonths = [];

    for (let i = 0; i <= 3; i++) { // Start from 0 to include the current month
      const monthIndex = (currentMonth + i) % 12;
      upcomingMonths.push({ index: monthIndex + 1, name: months[monthIndex] });
    }

    setNextFourMonths(upcomingMonths);
  }, []);

  const handleDelete = (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/booking/${bookingId}`)
        .then(response => {
          setBookings(bookings.filter((booking) => booking._id !== bookingId));
          filterByMonth(selectedMonth, bookings.filter((booking) => booking._id !== bookingId));
        })
        .catch(error => {
          console.error('Error deleting booking:', error);
          setError('Failed to delete booking. Please try again later.');
        });
    }
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    filterByMonth(month, bookings);
  };

  const filterByMonth = (month, bookingsList) => {
    if (month === '') {
      setFilteredBookings(bookingsList);
    } else {
      const filtered = bookingsList.filter(booking => {
        const bookingMonth = new Date(booking.bookingDate).getMonth() + 1; // +1 because months are 0-indexed in JavaScript Date
        return bookingMonth === parseInt(month);
      });
      setFilteredBookings(filtered);
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Quality Report",
    onAfterPrint: () => alert("Quality Report Successfully Downloaded!"),
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setTextColor(40, 114, 178);
    doc.text('Microservice Center', 14, 22);

    // Contact Information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 160, 22);
    doc.text('72/A, Makumbura, Pannipitiya', 14, 30);
    doc.text('+94 112203203', 14, 36);
    doc.text('microservicecenter@gmail.com', 14, 42);

    // Line
    doc.setLineWidth(0.8);
    doc.line(14, 45, 196, 45);

    // Booking Details in PDF
    let yOffset = 55; // Start y-axis position for booking details
    filteredBookings.forEach((booking, index) => {
      doc.text(`Booking ${index + 1}`, 14, yOffset);
      doc.text(`Services: ${booking.services.map(service => service.name).join(', ')}`, 14, yOffset + 8);
      doc.text(`Total Price: Rs.${booking.totalPrice}`, 14, yOffset + 16);
      doc.text(`Total Time: ${booking.totalTime} mins`, 14, yOffset + 24);
      doc.text(`Date: ${new Date(booking.bookingDate).toLocaleDateString()}`, 14, yOffset + 32);
      doc.text(`Time: ${booking.bookingTime}`, 14, yOffset + 40);
      
      yOffset += 50; // Add space for the next booking
    });

    // Save the PDF
    doc.save('booking-report.pdf');
  };

  return (
    <div className="bookings-container">
      <h2>Bookings</h2>
      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        <button onClick={generatePDF} className='downloadBtn'>Download PDF</button>
        <label htmlFor="month-filter">Filter by Month: </label>
        
        <select id="month-filter" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All Months</option>
          {nextFourMonths.map(month => (
            <option key={month.index} value={month.index}>{month.name}</option>
          ))}
        </select>
      </div>

      <div ref={ComponentsRef}>
        <div className='microService'>
          <h1>Micro Service 
          
          </h1>
        </div>
        
        <table >
          <thead>
            <tr>
              <th>Services</th>
              <th>Total Price</th>
              <th>Total Time</th>
              <th>Date</th>
              <th>Time</th>
              <th className='noPrint'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.services.map(service => service.name).join(', ')}</td>
                <td>Rs.{booking.totalPrice}</td>
                <td>{booking.totalTime} mins</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.bookingTime}</td>
                <td className='noPrint'>
                  <Link to={`/updateBooking/${booking._id}`}>
                    <button className="update">Update</button>
                  </Link>
                  <button className="delete" onClick={() => handleDelete(booking._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
