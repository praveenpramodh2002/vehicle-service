import React, { useState, useEffect } from 'react';
import '../../component/Homepage/hme2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs, faUsers, faTools, faMapMarkerAlt, faEnvelope, faPhone, faCar, faOilCan,
  faCheck, faPaintRoller, faCarBattery, faUser, faBars, faTimes, faClock, faBroom, faChevronDown,
  faArrowUp, faChevronRight, faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const MyComponent = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Handle mobile navigation if needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    // Add your newsletter subscription logic here
    console.log('Newsletter subscription:', email);
    e.target.reset();
  };

  return (
    <div>
      {/* Advanced Navigation Bar */}
      <header className="header">
        <div className="logo">
          <img src="image/lnew.jpeg" alt="Vehicle Service Station Logo" />
        </div>
        <nav className="navbar">
          <a href="/">Home</a>
          <div className="dropdown">
            <a href="#" className="dropdown-btn">Services</a>
            <div className="dropdown-content">
              <a href="#diagnostic">Diagnostic Test</a>
              <a href="#engine">Engine Servicing</a>
              <a href="#tires">Tires Replacement</a>
              <a href="#cleaning">Vacuum Cleaning</a>
            </div>
          </div>
          <a href="#about">About Us</a>
          <a href="#packages">Packages</a>
        
          <a href="#contact">Contact</a>
          <a href="/Services" className="book-now-btn">Book Now</a>
          <a href="/login" className="login-btn">
            <FontAwesomeIcon icon={faUser} /> Login
          </a>
        </nav>
      </header>

      {/* Enhanced Home Section */}
      <section id="home" className="service-center-section">
        <div className="service-center-video">
          <video autoPlay loop muted playsInline>
            <source src="videonew.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="service-center-container">
          <div className="service-center-content">
            <h1 className="service-center-title1">#1</h1>
            <h1 className="service-center-title">CAR SERVICE</h1>
            <h2 className="service-center-subtitle">CHAIN IN SRI LANKA</h2>
            <button className="service-center-button" onClick={scrollToServices}>
              Learn more
            </button>
          </div>
        </div>
        <div className="scroll-down" onClick={scrollToServices}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </section>

      {/* Advanced Services Section */}
      <section id="advanced-services" className="advanced-services-section">
        <div className="advanced-services-container">
          <div className="section-header">
            <h2>OUR Services</h2>
            <p>Experience cutting-edge automotive solutions with our advanced service offerings</p>
          </div>
          
          <div className="advanced-services-grid">
            <div className="advanced-service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faCar} />
              </div>
              <div className="service-details">
                <h3>Performance Tuning</h3>
                <p>Optimize your vehicle's performance with our advanced tuning services</p>
                <ul className="service-features">
                  <li>Engine Remapping</li>
                  <li>ECU Optimization</li>
                  <li>Performance Testing</li>
                </ul>
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>

            <div className="advanced-service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faTools} />
              </div>
              <div className="service-details">
                <h3>Hybrid & Electric</h3>
                <p>Specialized services for modern hybrid and electric vehicles</p>
                <ul className="service-features">
                  <li>Battery Diagnostics</li>
                  <li>Motor Maintenance</li>
                  <li>Charging System Repair</li>
                </ul>
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>

            <div className="advanced-service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faCogs} />
              </div>
              <div className="service-details">
                <h3>Advanced Diagnostics</h3>
                <p>State-of-the-art diagnostic solutions for complex issues</p>
                <ul className="service-features">
                  <li>Computer Diagnostics</li>
                  <li>System Analysis</li>
                  <li>Performance Monitoring</li>
                </ul>
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>
          </div>

          <div className="advanced-services-cta">
            <div className="cta-content">
              <h3>Ready to Experience Advanced Automotive Care?</h3>
              <p>Book your advanced service appointment today and get a free vehicle assessment</p>
              <button className="cta-button" onClick={() => window.location.href = '#book'}>
                Book Advanced Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="why-choose-section">
        <div className="why-choose-container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>Experience excellence in automotive care with our comprehensive services</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faTools} />
              </div>
              <h3>Expert Technicians</h3>
              <p>Our certified technicians have years of experience in handling all types of vehicles with precision and care.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3>Quick Service</h3>
              <p>We value your time. Our efficient service ensures your vehicle is back on the road as quickly as possible.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <h3>Quality Parts</h3>
              <p>We use only genuine and high-quality parts to ensure the best performance and longevity of your vehicle.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faCar} />
              </div>
              <h3>Modern Equipment</h3>
              <p>State-of-the-art diagnostic tools and equipment for accurate problem detection and efficient repairs.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>Customer Support</h3>
              <p>24/7 customer support to assist you with any queries or emergency services you might need.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faOilCan} />
              </div>
              <h3>Regular Maintenance</h3>
              <p>Comprehensive maintenance packages to keep your vehicle running smoothly and efficiently.</p>
            </div>
          </div>

          <div className="why-choose-cta">
            <h3>Ready to Experience the Best?</h3>
            <p>Book your service appointment today and get a free vehicle inspection!</p>
            <button className="cta-button" onClick={() => window.location.href = '#book'}>
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <p>Hear from our satisfied customers about their experience with us</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </div>
                <p>"Excellent service! The team was professional and completed the work on time. My car runs better than ever."</p>
                <div className="testimonial-author">
                  <img src="/client1.jpeg" alt="Client" />
                  <div className="author-info">
                    <h4>John Smith</h4>
                    <p>Regular Customer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </div>
                <p>"The best auto service center I've been to. Their attention to detail and customer service is outstanding."</p>
                <div className="testimonial-author">
                  <img src="/client2.jpeg" alt="Client" />
                  <div className="author-info">
                    <h4>Sarah Johnson</h4>
                    <p>Business Owner</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </div>
                <p>"Quick, reliable, and affordable. They fixed my car's issues right the first time. Highly recommended!"</p>
                <div className="testimonial-author">
                  <img src="/client3.jpeg" alt="Client" />
                  <div className="author-info">
                    <h4>Michael Brown</h4>
                    <p>Fleet Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="news" className="news-section">
        <div className="news-container">
          <div className="section-header">
            <h2>Latest News & Updates</h2>
            <p>Stay informed about our latest services, offers, and automotive tips</p>
          </div>

          <div className="news-grid">
            <div className="news-card">
              <div className="news-image">
                <img src="/news1.jpeg" alt="New Diagnostic Equipment" />
                <div className="news-date">
                  <span className="day">15</span>
                  <span className="month">Mar</span>
                </div>
              </div>
              <div className="news-content">
                <h3>New Diagnostic Equipment</h3>
                <p>We've upgraded our diagnostic equipment to provide even better service to our customers.</p>
                <a href="#" className="read-more">Read More <FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>

            <div className="news-card">
              <div className="news-image">
                <img src="/news2.jpeg" alt="Summer Maintenance Tips" />
                <div className="news-date">
                  <span className="day">10</span>
                  <span className="month">Mar</span>
                </div>
              </div>
              <div className="news-content">
                <h3>Summer Maintenance Tips</h3>
                <p>Essential tips to keep your vehicle running smoothly during the summer months.</p>
                <a href="#" className="read-more">Read More <FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>

            <div className="news-card">
              <div className="news-image">
                <img src="/news3.jpeg" alt="Special Weekend Offer" />
                <div className="news-date">
                  <span className="day">05</span>
                  <span className="month">Mar</span>
                </div>
              </div>
              <div className="news-content">
                <h3>Special Weekend Offer</h3>
                <p>Get 20% off on all maintenance services this weekend. Book your appointment now!</p>
                <a href="#" className="read-more">Read More <FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>

          <div className="news-cta">
            <p>Want to stay updated with our latest news and offers?</p>
            <button className="subscribe-button" onClick={() => window.location.href = '#newsletter'}>
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section id="packages" className="packages-section">
        <div className="packages-container">
          <div className="section-header">
            <h2>Our Service Packages</h2>
            <p>Choose from our comprehensive service packages designed to meet your vehicle's needs</p>
          </div>

          <div className="packages-grid">
            <div className="package-card basic">
              <div className="package-header">
                <h3>Basic Package</h3>
                <div className="package-price">
                  <span className="currency">Rs.</span>
                  <span className="amount">5,000</span>
                  <span className="period">/service</span>
                </div>
              </div>
              <ul className="package-features">
                <li>Oil Change & Filter</li>
                <li>Brake Inspection</li>
                <li>Tire Rotation</li>
                <li>Basic Diagnostics</li>
                <li>Fluid Level Check</li>
              </ul>
              <button className="package-btn">Select Package</button>
            </div>

            <div className="package-card premium">
              <div className="package-badge">Popular</div>
              <div className="package-header">
                <h3>Premium Package</h3>
                <div className="package-price">
                  <span className="currency">Rs.</span>
                  <span className="amount">10,000</span>
                  <span className="period">/service</span>
                </div>
              </div>
              <ul className="package-features">
                <li>All Basic Package Services</li>
                <li>Full Engine Tune-up</li>
                <li>AC System Check</li>
                <li>Battery Testing</li>
                <li>Transmission Check</li>
                <li>Free Car Wash</li>
              </ul>
              <button className="package-btn">Select Package</button>
            </div>

            <div className="package-card ultimate">
              <div className="package-header">
                <h3>Ultimate Package</h3>
                <div className="package-price">
                  <span className="currency">Rs.</span>
                  <span className="amount">15,000</span>
                  <span className="period">/service</span>
                </div>
              </div>
              <ul className="package-features">
                <li>All Premium Package Services</li>
                <li>Complete Engine Overhaul</li>
                <li>Performance Optimization</li>
                <li>Interior Deep Cleaning</li>
                <li>Paint Protection</li>
                <li>1 Year Warranty</li>
              </ul>
              <button className="package-btn">Select Package</button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section id="support" className="support-section">
        <div className="support-container">
          <div className="section-header">
            <h2>24/7 Customer Support</h2>
            <p>We're here to help you with any questions or concerns about your vehicle</p>
          </div>

          <div className="support-grid">
            <div className="support-card">
              <div className="support-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h3>Emergency Support</h3>
              <p>24/7 roadside assistance and emergency support for your vehicle</p>
              <a href="tel:+94112345678" className="support-link">
                Call Now: +94 112 345 678
              </a>
            </div>

            <div className="support-card">
              <div className="support-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3>Email Support</h3>
              <p>Get detailed responses to your queries within 24 hours</p>
              <a href="mailto:support@microservice.lk" className="support-link">
                support@microservice.lk
              </a>
            </div>

            <div className="support-card">
              <div className="support-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3>Service Hours</h3>
              <p>Visit our service center during our extended hours</p>
              <div className="support-hours">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className="support-card">
              <div className="support-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <h3>Live Chat</h3>
              <p>Chat with our experts for instant support</p>
              <button className="chat-btn">Start Live Chat</button>
            </div>
          </div>

          <div className="support-cta">
            <h3>Need Immediate Assistance?</h3>
            <p>Our team is ready to help you with any vehicle-related issues</p>
            <div className="support-buttons">
              <button className="support-btn primary">Schedule Service</button>
              <button className="support-btn secondary">Contact Support</button>
            </div>
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
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10k+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Expert Staff</div>
              </div>
            </div>
            <button className="btn-read-more">
              <span>Read More</span>
            </button>
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
        <div className="footer-waves">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-info">
              <div className="footer-logo">
                <img src="image/lnew.jpeg" alt="Vehicle Service Logo" />
                <h3>Micro Service</h3>
              </div>
              <p>Your trusted partner in automotive excellence. We provide top-quality service and maintenance for all your vehicle needs.</p>
              <div className="footer-contact">
                <div className="contact-item">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>+94 112 345 678</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>info@microservice.lk</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>456 Galle Road, Colombo 03</span>
                </div>
              </div>
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h4>Services</h4>
                <ul>
                  <li><a href="#diagnostic">Diagnostic Test</a></li>
                  <li><a href="#engine">Engine Servicing</a></li>
                  <li><a href="#tires">Tires Replacement</a></li>
                  <li><a href="#cleaning">Vacuum Cleaning</a></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#blog">Blog</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for the latest updates and offers.</p>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="input-group">
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                </div>
              </form>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#" className="social-link" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className="social-link" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="social-link" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; {new Date().getFullYear()} Micro Service. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>

        {showBackToTop && (
          <button 
            className="back-to-top" 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}
      </footer>
    </div>
  );
};

export default MyComponent;