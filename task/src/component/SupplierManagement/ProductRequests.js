import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Styles.css'; // Ensure you have this import to apply styles

const ProductRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/product-requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching product requests', error);
      }
    };

    fetchRequests();
  }, []);

  const handleMarkAsSupplied = async (id) => {
    try {
      await axios.put(`http://localhost:3001/product-requests/${id}/supplied`);
      setRequests(requests.filter((request) => request._id !== id)); // Remove from UI after marking supplied
    } catch (error) {
      console.error('Error marking request as supplied', error);
    }
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
            <Link to="/AddSupplierForm">Add New Supplier</Link>
          </li>
          <li>
            <Link to="/ProductRequests" className="active">Product Requests</Link>
          </li>
          <li>
            <Link to="/SupplierReports">Supplier Reports</Link>
          </li>
        </ul>
        <button className="signout-btn">Sign out</button>
      </aside>
      <main className="main-content">
        <h1>Product Requests</h1>
        <ul className="request-list">
          {requests.map((request) => (
            <li key={request._id} className="request-item">
              <span className="request-product">{request.productName}</span> - 
              <span className="request-by"> Requested by: {request.requestedBy}</span>
              <button className="supply-button" onClick={() => handleMarkAsSupplied(request._id)}>Mark as Registered</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ProductRequests;

