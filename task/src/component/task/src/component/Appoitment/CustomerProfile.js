import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

// Utility function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Reusable InputField Component
const InputField = ({ label, type, name, value, onChange, disabled }) => (
  <div className="form-group">
    <label>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

const CustomerProfile = () => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
    },
    nic: '',
    birthday: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch customer details using the customer ID from the cookie
  useEffect(() => {
    const customerId = getCookie('customerId');
    if (customerId) {
      axios
        .get(`http://localhost:3001/customer/${customerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          setCustomer(response.data);
        })
        .catch(() => {
          setErrorMessage('Failed to fetch customer details');
        });
    }
  }, []);

  // Handle input change for fields other than address
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
    setIsEditing(true);
  };

  // Handle input change for address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: { ...prevCustomer.address, [name]: value },
    }));
    setIsEditing(true);
  };

  // Save updated customer details
  const handleSave = useCallback(() => {
    const customerId = getCookie('customerId');
    if (customerId) {
      axios
        .patch(`http://localhost:3001/customer/${customerId}`, customer, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(() => {
          setSuccessMessage('Profile updated successfully');
          setIsEditing(false);
        })
        .catch(() => {
          setErrorMessage('Failed to update profile');
        });
    }
  }, [customer]);

  return (
    <div className="customer-profile">
      <h2>Customer Profile</h2>

      {/* Display error or success messages */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Form for customer profile */}
      <form>
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={customer.firstName}
          onChange={handleInputChange}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={customer.lastName}
          onChange={handleInputChange}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={customer.email}
          onChange={handleInputChange}
          disabled
        />
        <InputField
          label="Phone"
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleInputChange}
        />
        <InputField
          label="Street"
          type="text"
          name="street"
          value={customer.address.street}
          onChange={handleAddressChange}
        />
        <InputField
          label="City"
          type="text"
          name="city"
          value={customer.address.city}
          onChange={handleAddressChange}
        />
        <InputField
          label="NIC"
          type="text"
          name="nic"
          value={customer.nic}
          onChange={handleInputChange}
        />
        <InputField
          label="Birthday"
          type="date"
          name="birthday"
          value={customer.birthday}
          onChange={handleInputChange}
        />

        {/* Show Save button if any field is edited */}
        {isEditing && (
          <button type="button" onClick={handleSave}>
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerProfile;
