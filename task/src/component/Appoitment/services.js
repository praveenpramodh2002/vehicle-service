import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    axios
      .get("http://localhost:8070/service")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    const selectedService = services.find((service) => service._id === value);

    if (checked) {
      setSelectedServices([...selectedServices, selectedService]);
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service._id !== value)
      );
    }
  };

  const calculateTotal = () => {
    return selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
  };

  const calculateTotalTime = () => {
    return selectedServices.reduce(
      (total, service) => total + service.duration,
      0
    );
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="services-container"
      style={{
        backgroundImage: "url('/image/back2.jpg')", // Add the path to your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "70vh", // Full page height
        padding: "20px"
      }}
    >
      <div className="services-top-bar">
        <div className="search-input-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="services-search-input"
          />
        </div>

        {selectedServices.length > 0 && (
          <Link
            to="/booking"
            state={{
              selectedServices: selectedServices.map((service) => ({
                serviceId: service._id,
                name: service.name,
              })),
              totalPrice: calculateTotal(),
              totalTime: calculateTotalTime(),
            }}
          >
            <button className="services-create-booking-button">
              <FontAwesomeIcon icon={faCalendarPlus} /> Create Booking
            </button>
          </Link>
        )}
      </div>

      <div className="services-service-grid">
        {filteredServices.map((service) => (
          <div key={service._id} className="services-service-card">
            <input
              type="checkbox"
              id={`service-${service._id}`}
              value={service._id}
              checked={selectedServices.some(s => s._id === service._id)}
              onChange={handleServiceChange}
            />
            <label htmlFor={`service-${service._id}`}>
              <h3><FontAwesomeIcon icon={faCheckCircle} /> {service.name}</h3>
              <p>Price: Rs.{service.price}</p>
              <p>Time: {service.duration} mins</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Slider Section for "Contact Us"
<section
  className="slider-section1"
  style={{
    backgroundImage: "url('images/white.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px 0", // Adjust padding as needed
  }}
>
  <div className="slider-content">
    <p className="slider-contact">Contact Us</p>
    <h1 className="slider-header">Experience Premier Vehicle Care in Sri Lanka</h1>
    <p className="slider-description">
      Discover unmatched service quality and precision care at Micro Service Center Sri Lanka. Your vehicle deserves the best – let us make it feel brand new again.
    </p>
    <div className="slider-buttons">
      <button className="btn btn-contact">Contact Us</button>
    </div>
  </div>
</section>

export default Services;
