import './CreationSM.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function CreationSM({ onPackageCreated }) {
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    price: '',
    servicesIncluded: '',
    specialOffer: '', // specialOffer is now the last field, it's optional
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Formatter for numbers with commas (e.g., 10,000)
  const formatPrice = (value) => {
    const numericValue = value.replace(/,/g, ''); // Remove commas for the numeric value
    if (!isNaN(numericValue) && numericValue !== '') {
      return new Intl.NumberFormat('en-IN').format(numericValue); // Add commas back
    }
    return value;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "price" || id === "specialOffer") {
      const numericValue = value.replace(/,/g, ''); // Remove commas for processing
      if (/^[0-9]*$/.test(numericValue) && numericValue <= 1000000) { // Max price limit of 100000
        setPackageData({
          ...packageData,
          [id]: formatPrice(numericValue), // Format value with commas
        });
      }
    } else if (id === "packageName" || id === "description" || id === "servicesIncluded") {
      // Allow only letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setPackageData({
          ...packageData,
          [id]: value,
        });
      }
    } else {
      setPackageData({
        ...packageData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...packageData,
      price: packageData.price.replace(/,/g, ''), // Remove commas for submission
      specialOffer: packageData.specialOffer ? packageData.specialOffer.replace(/,/g, '') : '', 
    };

    // Validate that the special offer is not greater than the price
    if (formattedData.specialOffer && parseFloat(formattedData.specialOffer) > parseFloat(formattedData.price)) {
      setErrorMessage("Special offer cannot be greater than the price.");
      return; // Stop submission
    }

    // Clear the error message before submission
    setErrorMessage('');

    try {
      await axios.post("http://localhost:3001/packages", formattedData);
      onPackageCreated(); 
      setPackageData({
        packageName: '',
        description: '',
        price: '',
        servicesIncluded: '',
        specialOffer: '', // Reset special offer after successful submission
      });
    } catch (error) {
      console.log("Error creating package", error);
    }
  };

  return (
    <div className="layout8">
    <aside className="sidebarManu23">
      <div className="logo1">
        <img src="/image/logo1.jpeg" alt="Logo" />
      </div>
      <nav className="navigation23">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/p4">Packages</a></li>
          <li><a href="/p3">Create</a></li>
        </ul>
      </nav>
      <div className="tools23">
        <ul>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </div>
      <div className="user-profile23">
        <img src="path_to_profile_image" alt="User" />
        <span>John Doe</span>
      </div>
    </aside>

    {/* Main Content */}
    <main className="creation-container8">
      <h1 className="creation-title8">Create New Package</h1>
      <form className="creation-form8" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Package Name"
          className="input-field8"
          id="packageName"
          value={packageData.packageName}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Description"
          className="input-field8"
          id="description"
          value={packageData.description}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Services Included"
          className="input-field8"
          id="servicesIncluded"
          value={packageData.servicesIncluded}
          onChange={handleChange}
          required
        />
        <div className="flex-wrap-container8">
          <div className="flex-item8">
            <input
              type="text"
              id="price"
              value={packageData.price}
              onChange={handleChange}
              required
              className="input-field8"
              placeholder="Price (Rs)"
            />
            <p>Price (Rs / package)</p>
          </div>
          <div className="flex-item8">
            <input
              type="text"
              id="specialOffer"
              value={packageData.specialOffer}
              onChange={handleChange}
              className="input-field8"
              placeholder="Special Offer (optional)"
            />
            <p>Special Offer (Rs / package)</p>
          </div>
        </div>

        {errorMessage && <p className="error-message8">{errorMessage}</p>}

        <button className="submit-button8" type="submit">
          Create Package
        </button>
      </form>
    </main>
  </div>
  );
}
