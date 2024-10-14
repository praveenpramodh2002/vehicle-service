// SupplierReports.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import './Styles.css';

// Ensure this path is correct
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SupplierReports = () => {
  const [currentSuppliers, setCurrentSuppliers] = useState([]);
  const [deletedSuppliers, setDeletedSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const currentResponse = await axios.get("http://localhost:3001/suppliers");
        setCurrentSuppliers(currentResponse.data.suppliers || []); // Ensure it's an array

        const deletedResponse = await axios.get("http://localhost:3001/deleted-suppliers");
        setDeletedSuppliers(deletedResponse.data.suppliers || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Company Logo at Top-Left Corner
    doc.addImage("image/logo1.jpeg" , "JPEG", 5, -5, 50, 50); // x=5, y=-5, width=30, height=30

    // Set Font and Color for Company Name
    doc.setFontSize(20); // Adjust font size as needed
    doc.setTextColor(40, 114, 178); // Adjust RGB as needed
    doc.text("Micro Service Center", 10, 45); // x=10, y=45

    // Contact Information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 160, 67); // x=160, y=67

    doc.text("72/A, Makumbura, Pannipitiya", 10, 55); // x=10, y=55
    doc.text("+94 112203203", 10, 61); // x=10, y=61
    doc.text("microservicecenter@gmail.com", 10, 67); // x=10, y=67

    // Draw a line below the header
    doc.setLineWidth(0.8);
    doc.line(10, 72, 200, 72); // x1=10, y1=72 to x2=200, y2=72

    // Add Title for Current Suppliers
    doc.setFontSize(16); // Slightly smaller for table titles
    doc.setTextColor(40, 114, 178);
    doc.text("Current Suppliers", 10, 80); // x=10, y=80

    // Define Table Columns and Rows for Current Suppliers
    const currentColumns = [
      { header: "Name", dataKey: "name" },
      { header: "Email", dataKey: "email" },
      { header: "Phone", dataKey: "phone" },
      { header: "Address", dataKey: "address" },
      { header: "Product", dataKey: "product" },
      { header: "Created Date", dataKey: "createdAt" },
    ];

    const currentRows = currentSuppliers.map((supplier) => ({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      product: supplier.product,
      createdAt: new Date(supplier.createdAt).toLocaleDateString(),
    }));

    // Add Current Suppliers Table
    doc.autoTable({
      startY: 85, // Start below the "Current Suppliers" title
      head: [currentColumns.map(col => col.header)],
      body: currentRows.map(row => currentColumns.map(col => row[col.dataKey])),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 114, 178], textColor: 255 },
      theme: "striped",
      margin: { left: 10, right: 10 }, // Margins for better readability
    });

    // Add Title for Deleted Suppliers
    const finalYCurrent = doc.lastAutoTable.finalY || 85;
    doc.setFontSize(16);
    doc.setTextColor(40, 114, 178);
    doc.text("Deleted Suppliers", 10, finalYCurrent + 20); // x=10, y=finalYCurrent + 20

    // Define Table Columns and Rows for Deleted Suppliers
    const deletedColumns = [
      { header: "Name", dataKey: "name" },
      { header: "Email", dataKey: "email" },
      { header: "Phone", dataKey: "phone" },
      { header: "Address", dataKey: "address" },
      { header: "Product", dataKey: "product" },
      { header: "Created Date", dataKey: "createdAt" },
      { header: "Deleted Date", dataKey: "deletedAt" },
    ];

    const deletedRows = deletedSuppliers.map((supplier) => ({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      product: supplier.product,
      createdAt: new Date(supplier.createdAt).toLocaleDateString(),
      deletedAt: supplier.deletedAt ? new Date(supplier.deletedAt).toLocaleDateString() : "N/A",
    }));

    // Add Deleted Suppliers Table
    doc.autoTable({
      startY: finalYCurrent + 25, // Start below the "Deleted Suppliers" title
      head: [deletedColumns.map(col => col.header)],
      body: deletedRows.map(row => deletedColumns.map(col => row[col.dataKey])),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 114, 178], textColor: 255 },
      theme: "striped",
      margin: { left: 10, right: 10 }, // Margins for better readability
    });

    // Save the PDF
    doc.save("Supplier Report.pdf");
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
            <Link to="/ProductRequests">Product Requests</Link>
          </li>
          <li>
            <Link to="/SupplierReports" className="active">Supplier Reports</Link>
          </li>
        </ul>
        <button className="signout-btn">Sign out</button>
      </aside>

      <div className="main-content">
      <h1>Supplier Reports</h1>
        <div className="reports-container">
          <div className="tables-container1">
            <div className="table-container1">
              <h2>Current Suppliers</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Product</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSuppliers.map((supplier) => (
                    <tr key={supplier._id}>
                      <td>{supplier.name}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.product}</td>
                      <td>{new Date(supplier.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-container1">
              <h2>Deleted Suppliers</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Product</th>
                    <th>Created Date</th>
                    <th>Deleted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedSuppliers.length > 0 ? (
                    deletedSuppliers.map((supplier) => (
                      <tr key={supplier._id}>
                        <td>{supplier.name}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.address}</td>
                        <td>{supplier.product}</td>
                        <td>{new Date(supplier.createdAt).toLocaleDateString()}</td>
                        <td>{supplier.deletedAt ? new Date(supplier.deletedAt).toLocaleDateString() : "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No deleted suppliers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Button to generate PDF */}
          <button onClick={generatePDF} className="print-btn">Generate PDF Report</button>
        </div>
      </div>
    </div>
  );
};

export default SupplierReports;
