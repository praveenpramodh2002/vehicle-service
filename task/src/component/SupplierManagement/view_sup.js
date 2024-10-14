
//ViewSup.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Styles.css';

import { Link } from "react-router-dom";

const ViewSup = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/suppliers");
        setSuppliers(response.data.suppliers || []);
      } catch (error) {
        setError("Error fetching suppliers.");
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setNameSearchTerm(value);
    } else if (name === "product") {
      setProductSearchTerm(value);
    }
  };

  const handleEditClick = (supplier) => {
    navigate(`/EditSup`, { state: { supplier } });
  };

  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    console.log('Deleting supplier:', supplierToDelete); // Add this line for debugging
    try {
      const response = await axios.delete(`http://localhost:3001/suppliers/${supplierToDelete._id}`);
      console.log('Delete response:', response); // Add this line for debugging
      setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierToDelete._id));
      setShowConfirm(false);
    } catch (error) {
      setError("Error deleting supplier.");
      console.error("Error deleting supplier:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSupplierToDelete(null);
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&
      supplier.product.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

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
            <Link to="/ViewSup" className="active">Supplier Details</Link>
          </li>
          <li>
            <Link to="/AddSupplierForm">Add New Supplier</Link>
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
        <h1 >Available Suppliers</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="search-bars">
          <div className="search-bar2">
            <input
              type="text"
              name="name"
              placeholder="Search by name..."
              value={nameSearchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="search-bar2">
            <input
              type="text"
              name="product"
              placeholder="Search by product..."
              value={productSearchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>
        <div className="suppliers-container">
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier) => (
              <div className="supplier-card" key={supplier._id}>
                <div className="supplier-info">
                  <p><strong>Name:</strong> {supplier.name}</p>
                  <p><strong>Product:</strong> {supplier.product}</p>
                  <p><strong>Phone Number:</strong> {supplier.phone}</p>
                  <p><strong>Address:</strong> {supplier.address}</p>
                  <p><strong>Email:</strong> {supplier.email}</p>
                </div>
                <div className="supplier-actions">
                  <button
                    className="update-btn"
                    onClick={() => handleEditClick(supplier)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(supplier)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No suppliers found.</p>
          )}
        </div>
        {showConfirm && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this supplier? This action cannot be undone.</p>
              <button className="confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewSup;

