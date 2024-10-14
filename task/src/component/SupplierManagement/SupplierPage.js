//SupplierPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewSup from './view_sup';
import './Styles.css';
 // Navigate up one level to import styles.css

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/suppliers');
        setSuppliers(response.data.suppliers); // Ensure that you access suppliers correctly
      } catch (err) {
        console.error('Error fetching suppliers:', err);
      }
    };

    fetchSuppliers();
  }, []);

  return <ViewSup suppliers={suppliers} />;
};

export default SupplierPage;
