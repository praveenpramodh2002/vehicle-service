import React from 'react';
import '../../component/Homepage/hme.css'; // Import your CSS file here
import Slider from 'react-slick'; // Import the Slider component
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const MyComponent = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="images/lnew.jpeg" alt="Vehicle Service Station Logo" />
        </div>
        <nav className="navbar">
          <a href="dashboard.htm">Home</a>
          <div className="dropdown">
            <a href="services.html" className="dropdown-btn">Services</a>
            <div className="dropdown-content">
              <a href="#">Diagnostic Test</a>
              <a href="#">Engine Servicing</a>
              <a href="#">Tires Replacement</a>
              <a href="#">Vacuum Cleaning</a>
            </div>
          </div>
          <a href="appointments.html">About Us</a>
          <a href="employees.html">Packages</a>
          <a href="reports.html">Contact</a>
          <a href="book-now.html" className="book-now-btn">Book Now </a>
        </nav>
      </header>

      {/* Slider Section */}
      <section
        className="service-center-section"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/carousel-bg-2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: '50px 0', // Add padding
        }}
      >
        <div className="service-center-container">
          <div className="service-center-content" style={{ textAlign: 'center', color: 'white' }}>
            <h1 className="service-center-title1">#1</h1>
            <h1 className="service-center-title">CAR SERVICE</h1>
            <h2 className="service-center-subtitle">CHAIN IN SRI LANKA</h2>
            <button className="service-center-button" style={{ backgroundColor: '#ff6347', color: 'white' }}>Learn more</button>
          </div>
          <div className="service-center-banner">
            <div className="service-center-banner-content">
              <p className="service-center-guarantee">GUARANTEED</p>
              <p className="service-center-percentage">100%</p>
              <p className="service-center-satisfaction">SATISFACTION</p>
              <p className="service-center-excellence">UNMATCHED EXCELLENCE OF</p>
              <p className="service-center-years">28 YEARS</p>
              <p className="service-center-since">SINCE 1994</p>
            </div>
          </div>
        </div>
      </section>

      <div className="services-section" style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h2 className="services-header">OUR SERVICES</h2>
        <p className="services-subheader">
          Committed to provide <span className="highlight">the best care</span> with supervision and trust.
        </p>
        <div className="services-cards">
          <div className="service-card" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px', margin: '10px' }}>
            <img src="images/s1.jpeg" alt="Periodic Maintenance" className="service-image" />
            <h3 className="service-title">Periodic Maintenance</h3>
            <ul className="service-list">
              <li>Inspection Reports</li>
              <li><span className="highlight">Wash & Grooming</span></li>
              <li>Waxing</li>
              <li>Undercarriage Degreasing</li>
              <li>Lube Services</li>
            </ul>
          </div>
          {/* Add more service cards as needed */}
        </div>
      </div>

      {/* Contact Us Section */}
      <section className="contact-us-section" style={{ padding: '40px 0', backgroundColor: '#f1f1f1' }}>
        <h2 className="contact-us-title">Contact Us</h2>
        <p className="contact-us-description">
          At Micro Service Center Sri Lanka, we are dedicated to providing top-quality service and support for your vehicle's needs. Contact us to learn more about our services or to schedule an appointment.
        </p>
        <div className="contact-us-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="contact-info" style={{ flex: 1 }}>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <div>
                <h3>ADDRESS:</h3>
                <p>456 Galle Road, Colombo 03, Sri Lanka</p>
              </div>
            </div>
            {/* Add more contact info items as needed */}
          </div>
          <div className="contact-map" style={{ flex: 1 }}>
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.960460358693!2d79.8545534143341!3d6.927078094989657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597385a711b9%3A0xb3c1d6ae6f183a61!2sGalle%20Rd%2C%20Colombo%20003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1630918484463!5m2!1sen!2slk"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section" style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0' }}>
        <div className="footer-container">
          <div className="footer-column">
            <h3>Address</h3>
            <p><i className="fas fa-map-marker-alt"></i> 456 Galle Road, Colombo 03, Sri Lanka</p>
            <p><i className="fas fa-phone-alt"></i> +94 112 345 678</p>
            <p><i className="fas fa-envelope"></i> info@microservice.lk</p>
          </div>
          {/* Add more footer columns as needed */}
        </div>
      </footer>
    </div>
  );
};

export default MyComponent;
