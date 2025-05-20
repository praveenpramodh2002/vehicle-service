import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
        <img src="image/lnew.jpeg" alt="Vehicle Service Station Logo" />
      </div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <span>Services</span>
          <div className="dropdown-content">
            <a href="#diagnostic">Diagnostic Test</a>
            <a href="#engine">Engine Servicing</a>
            <a href="#tires">Tires Replacement</a>
            <a href="#cleaning">Vacuum Cleaning</a>
          </div>
        </div>
        <Link to="#about-us" onClick={(e) => scrollToSection(e, 'about-us')}>About Us</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="#contact-us" onClick={(e) => scrollToSection(e, 'contact-us')}>Contact</Link>
        <Link to="/book" className="book-now-btn">Book Now</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            <FontAwesomeIcon icon={faUser} /> Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
