import './EditPackage.css'; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditPackage({ onPackageUpdated }) {
  const { id } = useParams(); 
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    price: '',  
    specialOffer: '',
    servicesIncluded: '',
  });
  
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/packages/${id}`);
        const fetchedPackage = response.data.package;  
        setPackageData({
          ...fetchedPackage,
          price: fetchedPackage.price !== undefined ? String(fetchedPackage.price) : '',  
          specialOffer: fetchedPackage.specialOffer !== undefined ? String(fetchedPackage.specialOffer) : '', 
        });
      } catch (error) {
        console.error("Error fetching package data", error);
      }
    };
    fetchPackage();
  }, [id]);

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
      price: typeof packageData.price === 'string' ? packageData.price.replace(/,/g, '') : '',
      specialOffer: typeof packageData.specialOffer === 'string' ? packageData.specialOffer.replace(/,/g, '') : '',
    };

    const priceValue = parseFloat(formattedData.price);
    const specialOfferValue = parseFloat(formattedData.specialOffer);

    if (specialOfferValue > priceValue) {
      alert("Special offer cannot exceed the price.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/packages/${id}`, formattedData);
      onPackageUpdated();
      alert("Package updated successfully!");
    } catch (error) {
      console.log("Error updating package", error);
    }
  };
  return (
    <div className="page-container88">
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

      <main className="edit-container88">
    <h1 className="edit-title88">Edit Package</h1>
    
    <form className="edit-form88" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Package Name"
        className="input-field88"
        id="packageName"
        value={packageData.packageName}
        onChange={handleChange}
        maxLength="62"
        minLength="5"
        required
      />
      <textarea
        placeholder="Description"
        className="input-field88"
        id="description"
        value={packageData.description}
        onChange={handleChange}
        required
      />
      <textarea
        placeholder="Services Included"
        className="input-field88"
        id="servicesIncluded"
        value={packageData.servicesIncluded}
        onChange={handleChange}
        required
      />
      <div className="flex-wrap-container88">
        <div className="flex-item88">
          <input
            type="text"
            id="price"
            value={packageData.price}
            onChange={handleChange}
            maxLength="7"
            required
            className="input-field88"
            placeholder="Price (₨)"
          />
          <p>Price (₨ / package)</p>
        </div>
        <div className="flex-item88">
          <input
            type="text"
            id="specialOffer"
            value={packageData.specialOffer}
            onChange={handleChange}
            maxLength="7"
            className="input-field88"
            placeholder="Special Offer (optional)"
          />
          <p>Special Offer (₨ / package)</p>
        </div>
      </div>

      <button className="submit-button88" type="submit">
        Update Package
      </button>
    </form>
  </main>
</div>
  );
}
