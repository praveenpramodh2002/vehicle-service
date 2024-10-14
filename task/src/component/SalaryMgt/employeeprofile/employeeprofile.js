import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import "./empprofile.css"; // Optional: Add your CSS for styling

const URL = "http://localhost:5000/employees"; // Ensure this URL matches your backend route

const EmployeeProfile = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setEmployee(response.data.employee || {});
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update-employee/${id}`); // Navigate to update page
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        alert("Employee deleted successfully.");
        navigate("/employeelist"); // Redirect to employee list page
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="employee-profile">
        <h1>Employee Profile</h1>
        <div className="profile-details">
          <p><strong>First Name:</strong> {employee.first_name}</p>
          <p><strong>Last Name:</strong> {employee.last_name}</p>
          <p><strong>NIC:</strong> {employee.nic}</p>
          <p><strong>Date of Birth:</strong> {employee.dateofbirth}</p>
          <p><strong>Address:</strong> {employee.address}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Basic Salary:</strong> {employee.basic_salary}</p>
          <p><strong>Working Hours:</strong> {employee.working_hours}</p>
          <p><strong>Description:</strong> {employee.description}</p>
        </div>
        <div className="actions">
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
