import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PDetails.css';
import heroBg from './hero-bg.jpg'; // Adjust the path as necessary


const URL = "http://localhost:3001/packages";

export default function PDetails() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const response = await axios.get(URL);
      setPackages(response.data.packages);
    } catch (error) {
      console.error("Error fetching packages", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handlePackageClick = (pkg) => {
    navigate('/p7', { state: { package: pkg } }); // Navigate to /p7 with the selected package
  };

  return (
    <div className='pdetails'>
      {/* Hero Section */}
      <section 
  className="hero-section" 
  style={{ backgroundImage: `url(${heroBg})` }}// Use the imported image here
>
  <div className="hero-content">
    <h1 className="hero-title"> Service Packages</h1>
    <p className="hero-subtitle">Choose the package that suits your vehicle's needs.</p>
    <button className="hero-btn" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
      Explore Packages
    </button>
  </div>
</section>


{/* Packages Section */}
<div className="packages-section">
  <div className="packages-header-container">
    <h2 className="packages-header1">Available</h2>
    <h2 className="packages-header2">Packages</h2>
  </div>
  <div className="packages-list">
    {packages.map((pkg, index) => (
      <div key={index} className="package-name" onClick={() => handlePackageClick(pkg)}>
        {pkg.packageName} {/* Display package name as clickable */}
      </div>
    ))}
  </div>
</div>






{/* Introduction Section */}
<div className="introduction-section">
      <h2>OUR SERVICES</h2>
      <p>
        We are a full-service vehicle care station dedicated to providing top-notch services to keep your vehicle running smoothly. 
        With a team of experienced mechanics and a wide range of service packages, we ensure the highest level of quality and customer satisfaction.
      </p>
      <p>
        Whether you need a quick wash, routine maintenance, or extensive repairs, we’ve got you covered. Choose a package that fits your needs, 
        and let our team handle the rest!
      </p>
    </div>







<footer className="footer-section">
  <div className="footer-container">
    <div className="footer-column">
      <h3>About Us</h3>
      <p>
        We provide a full range of vehicle care services, ensuring your car remains in top condition. From routine maintenance to complex repairs, our expert mechanics are here to help.
      </p>
    </div>

    <div className="footer-column">
      <h3>Contact Us</h3>
      <ul>
        <li><strong>Address:</strong> 123 Auto Lane, Cityville, ST 45678</li>
        <li><strong>Phone:</strong> (123) 456-7890</li>
        <li><strong>Email:</strong> support@carservicestation.com</li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Working Hours</h3>
      <ul>
        <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
        <li>Saturday: 8:00 AM - 4:00 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </div>

   {/* <div className="footer-column">
      <h3>Follow Us</h3>
      <div className="social-icons">
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
      </div>
    </div> */} 
  </div>

  <div className="footer-bottom">
    <p>&copy; 2024 Car Service Station. All Rights Reserved.</p>
  </div>
</footer>



      
    </div>
  );
}
