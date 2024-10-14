// add_supp.js 
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Styles.css';

const AddSupplierForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('');
  const [error, setError] = useState('');
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (phone.length < 10 || phone.length > 12) {
      setError('Phone number must be between 10 and 12 digits.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/suppliers', {
        name,
        email,
        phone,
        address,
        product,
      });

      setError('');
      setShowSuccessOverlay(true);
    } catch (error) {
      console.error('Error adding supplier:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to add supplier');
    }
  };

  const handlePhoneInput = (event) => {
    const input = event.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhone(input);
  };

  const handleDismiss = () => {
    setShowSuccessOverlay(false);
    navigate('/view_sup');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          <img src="image/logo2.jpeg" alt="Micro Automotive" className="profile-pic" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/Home3">Home</Link>
          </li>
          <li>
            <Link to="/ViewSup">Supplier Details</Link>
          </li>
          <li>
            <Link to="/AddSupplierForm" className="active">Add New Supplier</Link>
          </li>
          <li>
            <Link to="/ProductRequests">Product Requests</Link>
          </li>
          <li>
            <Link to="/SupplierReports">Supplier Reports</Link>
          </li>
        </ul>
        <button className="signout-btn">Sign out</button>
      </aside>
      <main className="main-content">
        <h1>Add New Supplier</h1>

        <form className="supplier-form" onSubmit={handleSubmit}>
          <label>Company Name</label>
          <input
            type="text"
            placeholder="company pvt(ltd)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@123.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Phone number must be 10-12 digits"
            value={phone}
            onChange={handlePhoneInput}
            maxLength={12} // Limit input to 12 characters
            required
            pattern="\d{10,12}" // Ensures only numbers between 10 and 12 digits are valid
          />

          <label>Address</label>
          <input
            type="text"
            placeholder="1/12, xstreet, california"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label>Product Supplied</label>
          <input
            type="text"
            placeholder="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />

          <div className="form-actions3">
            <button type="button" className="cancel-btn" onClick={() => navigate("/ViewSup")}>Cancel</button>
            <button type="submit" className="save-btn">Add Supplier</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>

        {showSuccessOverlay && (
          <div className="success-popup">
            <div className="success-box">
              <h2>Success!</h2>
              <p>Supplier added successfully.</p>
              <button onClick={handleDismiss} className="success-confirm-btn">OK</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddSupplierForm;
