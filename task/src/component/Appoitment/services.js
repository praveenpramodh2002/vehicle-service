import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "./Header"
import { faSearch, faCalendarPlus, faCheckCircle, faClock, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/service")
      .then((response) => {
        setServices(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setIsLoading(false);
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
    <>
      <Header />
      <div className="services-container">
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
                <FontAwesomeIcon icon={faCalendarPlus} />
                Create Booking ({selectedServices.length} services)
              </button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading services...</p>
          </div>
        ) : (
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
                  <div className="card-header">
                    <div className="card-icon">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <h3>{service.name}</h3>
                  </div>
                  <div className="card-details">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faMoneyBillWave} />
                      <span>Price: Rs.{service.price}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>Duration: {service.duration} mins</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="price-tag">
                      Rs.{service.price}
                    </div>
                    <div className="duration">
                      <FontAwesomeIcon icon={faClock} />
                      {service.duration} mins
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredServices.length === 0 && (
          <div className="no-results">
            <h3>No services found</h3>
            <p>Try adjusting your search term</p>
          </div>
        )}
      </div>
    </>
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
