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
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
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
    setPackageToDelete(id); // Set the package to delete
    setConfirmDelete(true); // Open the confirmation dialog
  };

  const confirmDeletePackage = async () => {
    try {
      await axios.delete(`${URL}/${packageToDelete}`);
      setPackages(prevPackages => prevPackages.filter(pkg => pkg._id !== packageToDelete));
      setSuccessMessage("Package deleted successfully!"); // Set success message
    } catch (error) {
      console.error("Error deleting package", error);
      setErrorMessage("Error deleting package. Please try again."); // Set error message
    } finally {
      setConfirmDelete(false); // Close the confirmation dialog
      setPackageToDelete(null); // Reset package to delete
    }

    // Clear messages after a few seconds
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  const cancelDelete = () => {
    setConfirmDelete(false); // Close the confirmation dialog
    setPackageToDelete(null); // Reset package to delete
  };

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }


  return (
    <div className="page-container55">

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

      <div className="maintenance-container55">
        <h1>Service Package Maintenance</h1>
        {successMessage && <div className="success-message55">{successMessage}</div>}
        {errorMessage && <div className="error-message55">{errorMessage}</div>}
        <table className="packages-table55">
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
                    <button className="edit-button55" onClick={() => handleEdit(_id)}>Edit</button>
                  </td>
                  <td>
                    <button className="delete-button55" onClick={() => handleDelete(_id)}>Delete</button>
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
          <div className="modal55">
            <div className="modal-content55">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this package?</p>
              <button className="confirm-button55" onClick={confirmDeletePackage}>Yes</button>
              <button className="cancel-button55" onClick={cancelDelete}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
