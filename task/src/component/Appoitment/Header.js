import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css'; // Import your CSS file here

const Header = () => {
  const location = useLocation(); // Get the current route path
  const navigate = useNavigate();  // For navigating to other routes

  // Check if the user is logged in by checking for the presence of the token
  const isLoggedIn = !!localStorage.getItem('token'); // Converts the result to a boolean

  // Function to handle smooth scrolling to a specific section
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from localStorage (or your preferred method of storing the auth token)
    localStorage.removeItem('token');
    
    // Redirect the user to the login page after logging out
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="images/lnew.jpeg" alt="Vehicle Service Station Logo" />
      </div>
      <nav className="navbar">
        {/* Regular header for the "/" route */}
        {location.pathname === '/' && (
          <>
            <a href="/">Home</a>
            <div className="dropdown">
              {!isLoggedIn && <a href="/newCustomer" className="dropdown-btn">Register</a>}
            </div>
            <a href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')}>About Us</a>
            <a href="">Packages</a>
            <a href="/bookings">Bookings</a>

            <a href="#contact-us" onClick={(e) => scrollToSection(e, 'contact-us')}>Contact</a>
            <a href="/services" className="book-now-btn">Book Now</a>

            {isLoggedIn && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </>
        )}

        {/* Header for the "/newCustomer" route */}
        {location.pathname === '/newCustomer' && (
          <>
             <a href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')}>About Us</a>
             <a href="">Packages</a>
            <a href="/bookings">Bookings</a>
            <a href="#contact-us" onClick={(e) => scrollToSection(e, 'contact-us')}>Contact</a>
            <a href="/services" className="book-now-btn">Book Now</a>
          </>
        )}

        {location.pathname === '/bookings' && (
          <>
            <a href="/">Home</a>
            <a href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')}>About Us</a>
            <a href="">Packages</a>
            <a href="/bookings">Bookings</a>
            <a href="/services">Services</a>
            <a href="/services" className="book-now-btn">Book Now</a>
            {isLoggedIn && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </>
        )}

        {location.pathname === '/services' && (
          <>
            <a href="/">Home</a>
            <a href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')}>About Us</a>
            <a href="">Packages</a>
            <a href="/bookings">Bookings</a>
            <a href="/services" className="book-now-btn">Book Now</a>
            {isLoggedIn && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </>
        )}

      {location.pathname === '/booking' && (
          <>
           <a href="/">Home</a>
             <a href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')}>About Us</a>
            <a href="/bookings">Bookings</a>
            <a href="#contact-us" onClick={(e) => scrollToSection(e, 'contact-us')}>Contact</a>
            <a href="/services" className="book-now-btn">Book Now</a>
            {isLoggedIn && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </>
        )}

        {location.pathname === '/login' && (
          <>
            <a href="/">Home</a>
            <a href="/newCustomer">Register</a>
          </>
        )}

      </nav>
    </header>
  );
};

export default Header;
