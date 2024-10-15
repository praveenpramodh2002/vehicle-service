import React, { useState, useEffect } from "react";
// Import the logo from the src folder
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Styles.css";

const EditSup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { supplier } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    product: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        product: supplier.product,
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3001/suppliers/${supplier._id}`,
        formData
      );
      setShowConfirm(false);
      navigate("/ViewSup"); // Navigate back to view suppliers after successful update
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const cancelUpdate = () => {
    setShowConfirm(false);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          <img src="image/logo2.jpeg" alt="Micro Automotive" className="profile-pic" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/">
              Home
            </Link>
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
        <h1>Edit Supplier Details</h1>
        <form className="supplier-form" onSubmit={handleSubmit}>
          <label>Full Name (Person or Company)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />

          <label>Product Supplied</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="Enter product supplied"
          />

          <div className="form-actions3">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/ViewSup")}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
        {showConfirm && (
          <div className="edit-confirmation-overlay">
            <div className="edit-confirmation-box">
              <h2>Confirm Update</h2>
              <p>Are you sure you want to save these changes?</p>
              <button className="edit-confirm-btn" onClick={confirmUpdate}>
                Yes, Save
              </button>
              <button className="edit-cancel-btn" onClick={cancelUpdate}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditSup;
