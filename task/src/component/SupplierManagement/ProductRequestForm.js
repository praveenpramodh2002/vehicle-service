import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ProductRequestForm.css';
import { 
    HomeOutlined, 
    FileSearchOutlined, 
    BarChartOutlined, 
    MailOutlined, 
    QuestionCircleOutlined, 
    SettingOutlined 
} from '@ant-design/icons';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="logo">
      <img src="image/logo2.jpeg" alt="Micro Automotive" />
    </div>
    <div className="navigation">
      <ul>
        <li><HomeOutlined /> <a href="">Home </a></li>
        <li><FileSearchOutlined /> <a href="requestproducts">Request Products</a></li>
        <li><BarChartOutlined /> <a href="inventoryreport">Inventory Reports</a></li>
        <li><FileSearchOutlined /> <a href="Addinventory"> Add Inventory </a></li>
      </ul>
    </div>
    <div className="tools">
      <p>Tools</p>
      <ul>
        <li><MailOutlined /><span>Inbox</span></li>
        <li><SettingOutlined /> <a href="#">Settings</a></li>
        <li><QuestionCircleOutlined /> <a href="#">Help</a></li>
      </ul>
    </div>
    <div className="user-profile">
      <img src="user2.jpeg" alt="User" />
      <span>Joe Max</span>
      <button className="logout-button">Log Out</button>
    </div>
  </aside>
);

const ProductRequestForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setErrorMessage(""); // Clear any previous error messages

    // Validate the inputs
    if (!productName || !requestedBy) {
      setErrorMessage("Please fill in all fields.");
      return; // Exit the function if validation fails
    }

    try {
      // Send a POST request to the backend
      await axios.post("http://localhost:3001/product-requests", {
        productName,
        requestedBy,
      });

      // Clear the input fields
      setProductName("");
      setRequestedBy("");

      // Navigate to the product requests page after successful submission
      navigate("/Addinventory");
    } catch (error) {
      // Handle any errors that occur during the request
      setErrorMessage("Error submitting the request. Please try again.");
      console.error("Error submitting the request:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
      <h1 className="product-request-title">Request a Product</h1>
        <div className="product-request-container">
          <form className="product-request-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="product-request-input"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)} // Update state on input change
            />
            <input
              type="text"
              className="product-request-input"
              placeholder="Requested By"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)} // Update state on input change
            />
            <button type="submit" className="product-request-button">Submit Request</button>
            {errorMessage && <div className="product-request-error">{errorMessage}</div>} {/* Display error messages */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductRequestForm;
