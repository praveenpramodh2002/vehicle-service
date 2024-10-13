import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import './Packages.css';

const URL = "http://localhost:5000/packages";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const response = await axios.get(URL);
        setPackages(response.data.packages);
        setFilteredPackages(response.data.packages);
      } catch (error) {
        console.error("Error fetching packages", error);
      }
    };

    loadPackages();
  }, []);

  // Filter packages based on the search query
  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredPackages(packages);
      setNoResults(false);
      return;
    }

    const filtered = packages.filter((pkg) =>
      pkg.packageName.toLowerCase().includes(query.toLowerCase()) ||
      pkg.servicesIncluded.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPackages(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Format prices (e.g., 10,00,000)
  const formatPrice = (value) => {
    if (!isNaN(value) && value !== '') {
      return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value);
    }
    return value;
  };

  // Print report using jsPDF and jsPDF-Autotable
  const handlePrint = () => {
    const doc = new jsPDF();

// Add Company Logo at Top-Left Corner
doc.addImage("/image/logo.jpeg", "PNG", 5, 5, 40, 30); // Adjusted to x=5, y=-5, width=50, height=50

// Set Font and Color for Company Name
doc.setFontSize(20); // Adjusted font size to 20
doc.setTextColor(40, 114, 178); // Set color to RGB (40, 114, 178)
doc.text("Micro Service Center", 10, 45); // Positioned at x=10, y=45

// Contact Information
doc.setFontSize(12);
doc.setTextColor(0, 0, 0);
const date = new Date().toLocaleDateString();
doc.text(`Date: ${date}`, 160, 67); // Adjusted date position to x=160, y=45

doc.text("72/A, Makumbura, Pannipitiya", 10, 55); // Position: x=10, y=55
doc.text("+94 112203203", 10, 61); // Position: x=10, y=61
doc.text("microservicecenter@gmail.com", 10, 67); // Position: x=10, y=67

// Draw a line below the header
doc.setLineWidth(0.8);
doc.line(10, 72, 200, 72); // Draw a line from x1=10, y1=72 to x2=200, y2=72

// Add Title for Current Suppliers
doc.setFontSize(16); // Slightly smaller for table titles
doc.setTextColor(40, 114, 178);
doc.text("Available Packages", 10, 80); // x=10, y=80


    // Define the columns for the table
    const tableColumn = ['Package Name', 'Description', 'Services Included', 'Price (₨)', 'Special Offer (₨)', 'Total Price (₨)'];

    // Define the rows for the table
    const tableRows = filteredPackages.map(pkg => {
      const totalPrice = pkg.price - pkg.specialOffer;
      return [
        pkg.packageName,
        pkg.description,
        pkg.servicesIncluded,
        formatPrice(pkg.price),
        formatPrice(pkg.specialOffer),
        formatPrice(totalPrice)
      ];
    });

    // Generate the table
    doc.autoTable({
      startY: 90, // Position the table below the heading and contact information
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 10,
        halign: 'left',
      },
      headStyles: {
        fillColor: [40, 114, 178],
      },
      theme: 'striped', // Optional, to make the table look better
    });

    // Save the PDF
    doc.save('Package_Report.pdf');
  };

  return (
    <div>
      <h2 className="package-header">Available Packages</h2>

      <div className="search-container">
        <div className="search-inner">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search packages..."
            className="search-input"
          />
        </div>
      </div>

      <div className="package-table-container">
        {noResults ? (
          <p>No packages found</p>
        ) : (
          <table className="package-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Description</th>
                <th>Services Included</th>
                <th>Price (₨)</th>
                <th>Special Offer (₨)</th>
                <th>Total Price (₨)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.map((pkg, index) => {
                const totalPrice = pkg.price - pkg.specialOffer;
                return (
                  <tr key={index}>
                    <td>{pkg.packageName}</td>
                    <td>{pkg.description}</td>
                    <td>{pkg.servicesIncluded}</td>
                    <td>{formatPrice(pkg.price)}</td>
                    <td>{formatPrice(pkg.specialOffer)}</td>
                    <td>{formatPrice(totalPrice)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <button onClick={handlePrint} className="print-button">
        Download Report
      </button>
    </div>
  );
}
