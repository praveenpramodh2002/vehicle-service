import React, { useState, useEffect } from 'react';
import '../../component/Homepage/hme2.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs, faUsers, faTools, faMapMarkerAlt, faEnvelope, faPhone, faCar, faOilCan,
  faCheck, faPaintRoller, faCarBattery, faUser, faBars, faTimes, faClock, faBroom
} from '@fortawesome/free-solid-svg-icons';

const MyComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div>
      {/* Header with Sticky Navigation */}
      <header className={`header ${isNavOpen ? 'nav-open' : ''}`}>
        <div className="logo">
          <img src="image/lnew.jpeg" alt="Vehicle Service Station Logo" />
        </div>
        <nav className={`navbar ${isNavOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setIsNavOpen(false)}>Home</a>
          <div className="dropdown">
            <a href="#services" className="dropdown-btn">Services</a>
            <div className="dropdown-content">
              <a href="#diagnostic">Diagnostic Test</a>
              <a href="#engine">Engine Servicing</a>
              <a href="#tires">Tires Replacement</a>
              <a href="#cleaning">Vacuum Cleaning</a>
            </div>
          </div>
          <a href="#about" onClick={() => setIsNavOpen(false)}>About Us</a>
          <a href="#packages" onClick={() => setIsNavOpen(false)}>Packages</a>
          <a href="#contact" onClick={() => setIsNavOpen(false)}>Contact</a>
          <a href="#book" className="book-now-btn">Book Now</a>
          <a href="#login" className="login-btn" onClick={() => setIsNavOpen(false)}>
            <FontAwesomeIcon icon={faUser} /> Login
          </a>
        </nav>
        <div className="mobile-nav-toggle" onClick={toggleNav}>
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
        </div>
      </header>

      {/* Slider Section */}
      <section id="home" className="service-center-section">
        <div className="service-center-video">
          <video autoPlay loop muted>
            <source src="videonew.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="service-center-container">
          <div className="service-center-content">
            <h1 className="service-center-title1">#1</h1>
            <h1 className="service-center-title">CAR SERVICE</h1>
            <h2 className="service-center-subtitle">CHAIN IN SRI LANKA</h2>
            <button className="service-center-button">Learn more</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2 className="services-header">OUR SERVICES</h2>
        <p className="services-subheader1">
          Committed to provide <span className="highlight">the best care</span> with supervision and trust.
        </p>
        <div className="services-cards">
          <div className="service-card">
            <img src="image/s1.jpeg" alt="Periodic Maintenance" className="service-image" />
            <h3 className="service-title">Periodic Maintenance</h3>
            <ul className="service-list">
              <li>Inspection Reports</li>
              <li><span className="highlight">Wash & Grooming</span></li>
              <li>Waxing</li>
              <li>Undercarriage Degreasing</li>
              <li>Lube Services</li>
            </ul>
          </div>
          <div className="service-card">
            <img src="image/s2.jpeg" alt="Paints & Repairs" className="service-image" />
            <h3 className="service-title">Paints & Repairs</h3>
            <ul className="service-list">
              <li>Insurance Claims</li>
              <li><span className="highlight">Nano Coating</span></li>
              <li>Spare Parts Replacement</li>
              <li>Mechanical Repair</li>
              <li>Full Paints</li>
            </ul>
          </div>
          <div className="service-card">
            <img src="image/s3.jpeg" alt="Terminal Services" className="service-image" />
            <h3 className="service-title">Terminal Services</h3>
            <ul className="service-list">
              <li>Battery Services</li>
              <li><span className="highlight">Engine Tune-up</span></li>
              <li>Lube Services</li>
              <li>Windscreen Treatments</li>
              <li>Tyre Replacements</li>
            </ul>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src="image/experience.jpg" alt="Mechanic working on a car" />
          </div>
          <div className="about-content">
            <p className="about-subheader">Who We Are</p>
            <h2 className="about-header">We Have 25 Years Of Experience In This Field</h2>
            <p className="about-description">
              With a rich legacy spanning 25 years, our commitment to excellence in car servicing is unwavering.
              Our seasoned team brings a wealth of experience to ensure your vehicle receives top-notch care.
              Trust in our expertise to keep your car running smoothly and safely.
            </p>
            <button className="btn-read-more">Read More</button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="contact-us-section">
        <h2 className="contact-us-title">Contact Us</h2>
        <p className="contact-us-description">
          At Micro Service Center Sri Lanka, we are dedicated to providing top-quality service and support for your vehicle's needs.
          Contact us to learn more about our services or to schedule an appointment.
        </p>
        <div className="contact-us-container">
          <div className="contact-info">
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <div>
                <h3>ADDRESS:</h3>
                <p>456 Galle Road, Colombo 03, Sri Lanka</p>
              </div>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <div>
                <h3>EMAIL:</h3>
                <p>info@microservice.lk</p>
                <p>support@microservice.lk</p>
              </div>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <div>
                <h3>CALL US:</h3>
                <p>+94 112 345 678</p>
                <p>+94 112 876 543</p>
              </div>
            </div>
          </div>
          <div className="contact-map">
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

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Address</h3>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 456 Galle Road, Colombo 03, Sri Lanka</p>
            <p><FontAwesomeIcon icon={faPhone} /> +94 112 345 678</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@microservice.lk</p>
          </div>
          <div className="footer-column">
            <h3>Opening Hours</h3>
            <p><FontAwesomeIcon icon={faClock} /> Mon-Fri: 09.00 AM - 09.00 PM</p>
            <p><FontAwesomeIcon icon={faClock} /> Sat-Sun: 09.00 AM - 12.00 PM</p>
          </div>
          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li><FontAwesomeIcon icon={faTools} /> Diagnostic Test</li>
              <li><FontAwesomeIcon icon={faCogs} /> Engine Servicing</li>
              <li><FontAwesomeIcon icon={faCar} /> Tires Replacement</li>
              <li><FontAwesomeIcon icon={faOilCan} /> Oil Changing</li>
              <li><FontAwesomeIcon icon={faBroom} /> Vacuum Cleaning</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Newsletter</h3>
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Micro Service. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyComponent;