import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MaintenanceSM.css';

const URL = "http://localhost:3001/packages";

const fetchPackages = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.packages;
  } catch (error) {
    console.error("Error fetching packages", error);
    return [];
  }
};

export default function MaintenanceSM() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      const fetchedPackages = await fetchPackages();
      setPackages(fetchedPackages);
      setLoading(false);
    };
    loadPackages();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-package/${id}`);
  };

  const handleDelete = (id) => {
    setPackageToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeletePackage = async () => {
    try {
      await axios.delete(`${URL}/${packageToDelete}`);
      setPackages(prevPackages => prevPackages.filter(pkg => pkg._id !== packageToDelete));
      setSuccessMessage("Package deleted successfully!");
    } catch (error) {
      console.error("Error deleting package", error);
      setErrorMessage("Error deleting package. Please try again.");
    } finally {
      setConfirmDelete(false);
      setPackageToDelete(null);
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    setPackageToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="sidebar">
        <div className="logo">
          {/* Sidebar Logo (Uncomment if you have a logo) */}
          {/* <img src={logo} alt="Company Logo" /> */}
        </div>
        <div className="navigation">
          <ul>
            <li><a href="/p01">Dashboard</a></li>
            <li><a href="/p4">Packages</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </div>
        <div className="tools">
          <ul>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>
        <div className="user-profile">
          <img src="https://via.placeholder.com/40" alt="User" />
          <span>User Name</span>
        </div>
      </div>

      <div className="maintenance-container">
        <h1>Service Package Maintenance</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <table className="packages-table">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? (
              packages.map(({ _id, packageName }) => (
                <tr key={_id}>
                  <td>{packageName}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(_id)}>Edit</button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(_id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No packages available</td>
              </tr>
            )}
          </tbody>
        </table>

        {confirmDelete && (
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this package?</p>
              <button className="confirm-button" onClick={confirmDeletePackage}>Yes</button>
              <button className="cancel-button" onClick={cancelDelete}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
