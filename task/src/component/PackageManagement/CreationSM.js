import './CreationSM.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function CreationSM({ onPackageCreated }) {
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    price: '',
    servicesIncluded: '',
    specialOffer: '', // optional
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPackageData({
      ...packageData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/packages", packageData);
      onPackageCreated(); 
      setPackageData({
        packageName: '',
        description: '',
        price: '',
        servicesIncluded: '',
        specialOffer: '',
      });
    } catch (error) {
      console.log("Error creating package", error);
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo1">
          <img src="/image/logo1.jpeg" alt="Logo" />
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/p4">Packages</a></li>
            <li><a href="/p3">Create</a></li>
          </ul>
        </nav>
        <div className="tools">
          <ul>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </div>
        <div className="user-profile">
          <img src="path_to_profile_image" alt="User" />
          <span>John Doe</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="creation-container8">
        <div className="logo-container8">
          {/* Add logo here */}
        </div>
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
                placeholder="Price (₨)"
              />
              <p>Price (₨ / package)</p>
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
              <p>Special Offer (₨ / package)</p>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="submit-button8" type="submit">
            Create Package
          </button>
        </form>
      </main>
    </div>
  );
}
