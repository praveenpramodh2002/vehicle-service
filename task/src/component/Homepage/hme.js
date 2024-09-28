import React from 'react';
import '../../component/Homepage/hme2.css';
import Slider from 'react-slick'; // Import the Slider component
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles

import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faUsers, faTools } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt, faEnvelope, faPhone, faCar, faOilCan, faCheck, faPaintRoller, faCarBattery } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
            <img src="image/lnew.jpeg" alt="Vehicle Service Station Logo" />
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
            <a href="book-now.html" className="book-now-btn">Book Now ></a>
         
        </nav>
    </header>


{/* Slider Section */}
<section
  className="service-center-section"
  style={{
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('image/carousel-bg-2.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="service-center-container">
    <div className="service-center-content">
    <h1 className="service-center-title1">#1</h1>
      <h1 className="service-center-title">CAR SERVICE</h1>
      <h2 className="service-center-subtitle">CHAIN IN SRI LANKA</h2>
      <button className="service-center-button">Learn more</button>
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

<div className="services-section">
      <h2 className="services-header">OUR SERVICES</h2>
      <p className="services-subheader">
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
    </div>
    <div
            className="banner"
            style={{
                backgroundImage: 'url(image/slider3.png)', // Update the path to your image
                backgroundSize: 'cover', // Cover the entire area
                backgroundPosition: 'center', // Center the image
            }}
        >
           
           
        </div>
    <div className="service-overview-container">
      <div className="service-details">
        <h2>Over <span className="highlight">28 Years</span> of Excellence in the automotive service industry</h2>
        <p>
          Micro service being Sri Lanka’s largest and the best auto service network; has the
          most diverse service portfolio.Micro service is your one stop station for all of your
          maintenance, repairs, and services. <b>Micro service Family drives to success
          based on three main pillars which are, Promptness, Respect & Oneness.</b>
        </p>
        <div className="pillar-images">
          <div className="pillar-item">
            <img src="image/n1.jpeg" alt="Promptness" />
            <div className="pillar-label promptness">PROMPTNESS</div>
          </div>
          <div className="pillar-item">
            <img src="image/n2.jpeg" alt="Respect" />
            <div className="pillar-label respect">RESPECT</div>
          </div>
          <div className="pillar-item">
            <img src="image/n3.jpeg" alt="Oneness" />
            <div className="pillar-label oneness">ONENESS</div>
          </div>
        </div>
      </div>

      <div className="network-details">
        <h2>Over <span className="highlight">40 State of the Art</span> Facilities to serve across the country</h2>
        <p>
          Our island wide network covers a vast range of services empowered by
          modern and latest technologies.
        </p>
        <div className="network-items">
          <div className="network-item">
            <img src="image/b1.jpeg" alt="Premier" />
            <p>Located in Colombo to offer your vehicle a VIP Service.</p>
          </div>
          <div className="network-item">
            <img src="image/b2.jpeg" alt="Grand" />
            <p>From car wash to body shop & workshop, all under one roof.</p>
          </div>
          <div className="network-item">
            <img src="image/b3.jpeg" alt="Ramdis" />
            <p>European/other Manufacturer Repairs & Maintenance.</p>
          </div>
          <div className="network-item">
            <img src="image/b4.jpeg" alt="Express" />
            <p>Quick detailing services with latest steam wash facilities.</p>
          </div>
          {/* Add more network items as needed */}
        </div>
      </div>
    </div>




<section className="experience-section">
      <div className="experience-container">
        <div className="experience-image">
          <img src="image/experience.jpg" alt="Mechanic working on a car" />
        </div>
        <div className="experience-content">
          <p className="experience-subheader">Who We Are</p>
          <h2 className="experience-header">We Have 25 Years Of Experience In This Field</h2>
          <p className="experience-description">
            With a rich legacy spanning 25 years, our commitment to excellence in car servicing is unwavering. 
            Our seasoned team brings a wealth of experience to ensure your vehicle receives top-notch care. 
            Trust in our expertise to keep your car running smoothly and safely.
          </p>
          <button className="btn-read-more">Read More</button>
        </div>
      </div>
    </section>
    
   
{/* Contact Us Section */}
<section className="contact-us-section">
  <h2 className="contact-us-title">Contact Us</h2>
  <p className="contact-us-description">
    At Micro Service Center Sri Lanka, we are dedicated to providing top-quality service and support for your vehicle's needs. Contact us to learn more about our services or to schedule an appointment.
  </p>
  <div className="contact-us-container">
    {/* Contact Information */}
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
      <div className="contact-social">
        <p>Contact us for a quote, support, or to join our team.</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
    {/* Map */}
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

{/* Promotional Slider Section */}
<section
  className="slider-section1"
  style={{
    backgroundImage: "url('image/white.jpg')",
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




      

      
<footer
  className="footer-section"
  style={{
    backgroundImage: 'url("image/.jpg")', // Replace with the actual image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    padding: '40px 0',
  }}
>
  <div className="footer-container">
    {/* Address Section */}
    <div className="footer-column">
      <h3>Address</h3>
      <p><i className="fas fa-map-marker-alt"></i> 456 Galle Road, Colombo 03, Sri Lanka</p>
      <p><i className="fas fa-phone-alt"></i> +94 112 345 678</p>
      <p><i className="fas fa-envelope"></i> info@microservice.lk</p>
      <div className="footer-social-icons">
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    {/* Opening Hours Section */}
    <div className="footer-column">
      <h3>Opening Hours</h3>
      <p><i className="far fa-clock"></i> Monday - Friday:<br />09.00 AM - 09.00 PM</p>
      <p><i className="far fa-clock"></i> Saturday - Sunday:<br />09.00 AM - 12.00 PM</p>
    </div>

    {/* Services Section */}
    <div className="footer-column">
      <h3>Services</h3>
      <ul className="footer-services-list">
        <li><i className="fas fa-wrench"></i> Diagnostic Test</li>
        <li><i className="fas fa-tools"></i> Engine Servicing</li>
        <li><i className="fas fa-car"></i> Tires Replacement</li>
        <li><i className="fas fa-oil-can"></i> Oil Changing</li>
        <li><i className="fas fa-broom"></i> Vacuum Cleaning</li>
      </ul>
    </div>

    {/* Newsletter Section */}
    <div className="footer-column">
      <h3>Newsletter</h3>
      <p><i className="fas fa-envelope-open-text"></i> Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
      <div className="footer-newsletter">
        <input type="email" placeholder="Your email" className="newsletter-input" />
        <button className="newsletter-btn">SIGNUP</button>
      </div>
    </div>
  </div>


  {/* Footer Bottom Section */}
  <div className="footer-bottom">
    <p>&copy; Micro service, All Rights Reserved. </p>
    <div className="footer-links">
      <a href="#">Home</a>
      <a href="#">Cookies</a>
      <a href="#">Help</a>
      <a href="#">FAQs</a>
    </div>
    <div className="footer-back-to-top">
      <a href="#"><i className="fas fa-arrow-up"></i></a>
    </div>
  </div>
</footer>

    </div>
  );
};

export default MyComponent;
