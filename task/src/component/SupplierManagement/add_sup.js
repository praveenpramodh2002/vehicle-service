// add_sup.js 
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Styles.css';

const AddSupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    product: '',
  });

  // State variables for validation errors
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [productError, setProductError] = useState('');

  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const navigate = useNavigate();

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z0-9\s\-.,/'#&()]{0,100}$/; // Company name
  const addressRegex = /^[A-Za-z0-9\s\-.,/'#]+$/; // Address
  const phoneRegex = /^\d*$/; // Phone
  const productRegex = /^[A-Za-z0-9\s\-./&()']{0,100}$/; // Product name

  const handleSubmit = async (event) => {
    event.preventDefault();

    let valid = true;

    // Reset errors
    setError('');
    setNameError('');
    setPhoneError('');
    setAddressError('');
    setProductError('');

    // Company name validation
    if (!nameRegex.test(formData.name)) {
      setNameError(
        "Company name must be less than 100 characters and can include letters, numbers, space, dash, comma, dot, slash, apostrophe, pound, ampersand, and parentheses."
      );
      valid = false;
    }

    // Phone number validations
    if (formData.phone.length < 10 || formData.phone.length > 12) {
      setPhoneError('Phone number must be between 10 and 12 digits.');
      valid = false;
    }

    if (!phoneRegex.test(formData.phone)) {
      setPhoneError('Only numbers are allowed.');
      valid = false;
    }

    // Address validation
    if (!addressRegex.test(formData.address)) {
      setAddressError(
        'Address can only contain letters, digits, space, dash, comma, dot, slash, apostrophe, and pound.'
      );
      valid = false;
    }

    // Product name validation
    if (!productRegex.test(formData.product)) {
      setProductError(
        "Product name must be less than 100 characters and can include letters, numbers, space, dash, dot, slash, ampersand, parentheses, and apostrophe."
      );
      valid = false;
    }

    if (!valid) {
      return; // Prevent form submission if validations fail
    }

    try {
      await axios.post('http://localhost:3001/suppliers', formData);

      setError('');
      setShowSuccessOverlay(true);
    } catch (error) {
      console.error('Error adding supplier:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to add supplier');
    }
  };

  // Unified handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        if (nameRegex.test(value) || value === "") {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
          setNameError("");
        } else {
          setNameError(
            "Company name must be less than 100 characters and can include letters, numbers, space, dash, comma, dot, slash, apostrophe, pound, ampersand, and parentheses."
          );
        }
        break;

      case "phone":
        if (phoneRegex.test(value)) {
          if (value.length <= 12) {
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
            setPhoneError("");
          } else {
            setPhoneError("Cannot enter more than 12 digits.");
          }
        } else {
          setPhoneError("Only numbers are allowed.");
        }
        break;

      case "address":
        if (addressRegex.test(value) || value === "") {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
          setAddressError("");
        } else {
          setAddressError(
            "Address can only contain letters, digits, space, dash, comma, dot, slash, apostrophe, and pound."
          );
        }
        break;

      case "product":
        if (productRegex.test(value) || value === "") {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
          setProductError("");
        } else {
          setProductError(
            "Product name must be less than 100 characters and can include letters, numbers, space, dash, dot, slash, ampersand, parentheses, and apostrophe."
          );
        }
        break;

      case "email":
        // Basic email validation (optional)
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;

      default:
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }
  };

  const handleDismiss = () => {
    setShowSuccessOverlay(false);
    navigate('/ViewSup');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          <img
            src="image/logo2.jpeg"
            alt="Micro Automotive"
            className="profile-pic"
          />
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/Home3">Home</Link>
          </li>
          <li>
            <Link to="/ViewSup">Supplier Details</Link>
          </li>
          <li>
            <Link to="/AddSupplierForm" className="active">
              Add New Supplier
            </Link>
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
            name="name"
            value={formData.name}
            onChange={handleChange} // Unified handler
            placeholder="Company Pvt Ltd"
            required
            pattern="[A-Za-z0-9\s\-.,/'#&()]{0,100}"
            title="Company name must be less than 100 characters and can include letters, numbers, space, dash, comma, dot, slash, apostrophe, pound, ampersand, and parentheses."
            aria-describedby="nameError"
          />
          {nameError && (
            <p id="nameError" className="error-message">
              {nameError}
            </p>
          )}

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} // Unified handler
            placeholder="example@123.com"
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange} // Unified handler
            placeholder="Phone number must be 10-12 digits"
            maxLength={12} // Limit input to 12 characters
            required
            pattern="\d{10,12}" // Ensures only numbers between 10 and 12 digits are valid
            title="Phone number must be between 10 and 12 digits."
            aria-describedby="phoneError"
          />
          {phoneError && (
            <p id="phoneError" className="error-message">
              {phoneError}
            </p>
          )}

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange} // Unified handler
            placeholder="1/12, X Street, California"
            required
            pattern="[A-Za-z0-9\s\-.,/'#]+"
            title="Address can only contain letters, digits, space, dash, comma, dot, slash, apostrophe, and pound."
            aria-describedby="addressError"
          />
          {addressError && (
            <p id="addressError" className="error-message">
              {addressError}
            </p>
          )}

          <label>Product Supplied</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange} // Unified handler
            placeholder="Ultra Widget 3000"
            required
            pattern="[A-Za-z0-9\s\-./&()']{0,100}"
            title="Product name must be less than 100 characters and can include letters, numbers, space, dash, dot, slash, ampersand, parentheses, and apostrophe."
            aria-describedby="productError"
          />
          {productError && (
            <p id="productError" className="error-message">
              {productError}
            </p>
          )}

          {/* Display general error message */}
          {error && <p className="error-message">{error}</p>}

          <div className="form-actions3">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/ViewSup")}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add Supplier
            </button>
          </div>
        </form>

        {showSuccessOverlay && (
          <div className="success-popup">
            <div className="success-box">
              <h2>Success!</h2>
              <p>Supplier added successfully.</p>
              <button
                onClick={handleDismiss}
                className="success-confirm-btn"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddSupplierForm;
