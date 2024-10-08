import React, { useState } from "react";
import axios from "axios";
import "./addemp.css"; // Import the CSS file
import Sidebar from "../sidebar/sidebar";
import { useNavigate } from "react-router-dom";



const positions = [
  "Engineer",
  "Supervisor",
  "Advisor",
  "Technician",
  "Specialist",
  "Mechanic",
  "Clerk",
];
const departments = [
  "Service",
  "Mechanical",
  "Electrical",
  "Collision Repair",
  "Sales",
  "Parts",
];

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    nic: "",
    dateofbirth: "",
    address: "",
    email: "",
    gender: "",
    position: "",
    department: "",
    basic_salary: "",
    working_hours: "",
    description: "", // Added Description field
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input for name fields to letters and spaces only
    if (name === "first_name" || name === "last_name") {
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-letter characters
      setEmployeeData({ ...employeeData, [name]: sanitizedValue });
    } else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const dob = new Date(employeeData.dateofbirth);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    // Age Validation
    if (age < 18) {
      newErrors.dateofbirth = "Employee must be at least 18 years old";
    }

    // Name Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(employeeData.first_name))
      newErrors.first_name = "First Name is required";
    if (!nameRegex.test(employeeData.last_name))
      newErrors.last_name = "Last Name is required";

    // NIC Validation
    const nicRegex = /^(?:\d{12}|\d{9}[vx])$/i;
    if (!nicRegex.test(employeeData.nic))
      newErrors.nic = "Valid NIC is required";

    // Address Validation
    if (!employeeData.address) newErrors.address = "Address is required";

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employeeData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(employeeData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    // Gender Validation
    if (!employeeData.gender) newErrors.gender = "Gender is required";

    // Position Validation
    if (!employeeData.position) newErrors.position = "Position is required";

    // Department Validation
    if (!employeeData.department)
      newErrors.department = "Department is required";

    // Salary and Hours Validation
    if (!employeeData.basic_salary || employeeData.basic_salary <= 0)
      newErrors.basic_salary = "Valid Basic Salary is required";
    if (!employeeData.working_hours || employeeData.working_hours <= 0)
      newErrors.working_hours = "Valid Working Hours are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/employees",
          employeeData
        );
        console.log(response.data);
        alert("Employee added successfully");
        navigate("/hrmdb");
        // Optionally, redirect to the employee list or clear the form
      } catch (error) {
        console.error("There was an error adding the employee!", error);
        alert("Failed to add employee");
      }
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="form-container">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={employeeData.first_name}
                onChange={handleChange}
              />
              {errors.first_name && (
                <p className="error">{errors.first_name}</p>
              )}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={employeeData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>NIC</label>
              <input
                type="text"
                name="nic"
                value={employeeData.nic}
                onChange={handleChange}
                max={12}
              />
              {errors.nic && <p className="error">{errors.nic}</p>}
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateofbirth"
                value={employeeData.dateofbirth}
                onChange={handleChange}
              />
              {errors.dateofbirth && (
                <p className="error">{errors.dateofbirth}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={employeeData.address}
              onChange={handleChange}
            ></textarea>
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={employeeData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Position</label>
              <select
                name="position"
                value={employeeData.position}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              {errors.position && <p className="error">{errors.position}</p>}
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={employeeData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="error">{errors.department}</p>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Basic Salary</label>
              <input
                type="number"
                name="basic_salary"
                value={employeeData.basic_salary}
                onChange={handleChange}
              />
              {errors.basic_salary && (
                <p className="error">{errors.basic_salary}</p>
              )}
            </div>
            <div className="form-group">
              <label>Working Hours Per Week</label>
              <input
                type="number"
                name="working_hours"
                value={employeeData.working_hours}
                onChange={handleChange}
              />
              {errors.working_hours && (
                <p className="error">{errors.working_hours}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Description</label> {/* Added Description label */}
            <textarea
              name="description"
              value={employeeData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className="form-group">
            <button type="submit">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
