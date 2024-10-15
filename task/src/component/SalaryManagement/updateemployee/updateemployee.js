import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import "./updemp.css"; // Ensure this path is correct

const URL = "http://localhost:3001/employees"; // Ensure this URL matches your backend route

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

const UpdateEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState({
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
    description: "",
    phone_no: "", // Added phone number field
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        // Make sure to set employee data correctly
        setEmployee(response.data.employee || {});
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input for specific fields
    if (name === "first_name" || name === "last_name") {
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
      setEmployee({ ...employee, [name]: sanitizedValue });
    } else if (name === "phone_no") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setEmployee({ ...employee, [name]: sanitizedValue });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const dob = new Date(employee.dateofbirth);
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
    if (!nameRegex.test(employee.first_name))
      newErrors.first_name = "First Name is required";
    if (!nameRegex.test(employee.last_name))
      newErrors.last_name = "Last Name is required";

    // NIC Validation
    const nicRegex = /^(?:\d{12}|\d{9}[vx])$/i;
    if (!nicRegex.test(employee.nic)) newErrors.nic = "Valid NIC is required";
    if (employee.nic.length > 12)
      newErrors.nic = "NIC must be 12 digits or less";

    // Address Validation
    if (!employee.address) newErrors.address = "Address is required";

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employee.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(employee.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone Number Validation
    const phoneRegex = /^\d{10}$/;
    if (!employee.phone_no) {
      newErrors.phone_no = "Phone number is required";
    } else if (!phoneRegex.test(employee.phone_no)) {
      newErrors.phone_no = "Phone number must be exactly 10 digits";
    }

    // Gender Validation
    if (!employee.gender) newErrors.gender = "Gender is required";

    // Position Validation
    if (!employee.position) newErrors.position = "Position is required";

    // Department Validation
    if (!employee.department) newErrors.department = "Department is required";

    // Salary and Hours Validation
    if (!employee.basic_salary || employee.basic_salary <= 0)
      newErrors.basic_salary = "Valid Basic Salary is required";
    if (!employee.working_hours || employee.working_hours <= 0)
      newErrors.working_hours = "Valid Working Hours are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(`${URL}/${id}`, employee);
        console.log(response.data);
        alert("Employee updated successfully");
        navigate("/hrmdb");
      } catch (error) {
        console.error("There was an error updating the employee!", error);
        alert("Failed to update employee");
      }
    }
  };

  return (
    <div className="update-container15">
      <div className="sidebar15">
        <Sidebar />
      </div>
      <div className="update-form-container15">
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row15">
            <div className="form-group15">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={employee.first_name}
                onChange={handleChange}
                required
              />
              {errors.first_name && (
                <p className="error">{errors.first_name}</p>
              )}
            </div>
            <div className="form-group15">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={employee.last_name}
                onChange={handleChange}
                required
              />
              {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>
          </div>
          <div className="form-row15">
            <div className="form-group15">
              <label>NIC:</label>
              <input
                type="text"
                name="nic"
                value={employee.nic}
                onChange={handleChange}
                required
              />
              {errors.nic && <p className="error">{errors.nic}</p>}
            </div>
            <div className="form-group15">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateofbirth"
                value={employee.dateofbirth}
                onChange={handleChange}
                required
              />
              {errors.dateofbirth && (
                <p className="error">{errors.dateofbirth}</p>
              )}
            </div>
          </div>
          <div className="form-group15">
            <label>Address:</label>
            <textarea
              name="address"
              value={employee.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-row15">
            <div className="form-group15">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group15">
              <label>Gender:</label>
              <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>
          </div>
          <div className="form-row15">
            <div className="form-group15">
              <label>Position:</label>
              <select
                name="position"
                value={employee.position}
                onChange={handleChange}
                required
              >
                <option value="">Select Position</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && <p className="error">{errors.position}</p>}
            </div>
            <div className="form-group15">
              <label>Department:</label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              {errors.department && <p className="error">{errors.department}</p>}
            </div>
          </div>
          <div className="form-row15">
            <div className="form-group15">
              <label>Basic Salary:</label>
              <input
                type="number"
                name="basic_salary"
                value={employee.basic_salary}
                onChange={handleChange}
                required
              />
              {errors.basic_salary && (
                <p className="error">{errors.basic_salary}</p>
              )}
            </div>
            <div className="form-group15">
              <label>Working Hours:</label>
              <input
                type="number"
                name="working_hours"
                value={employee.working_hours}
                onChange={handleChange}
                required
              />
              {errors.working_hours && (
                <p className="error">{errors.working_hours}</p>
              )}
            </div>
          </div>
          <div className="form-group15">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_no"
              value={employee.phone_no}
              onChange={handleChange}
              required
            />
            {errors.phone_no && <p className="error">{errors.phone_no}</p>}
          </div>
          <button type="submit" className="submit-button">Update Employee</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
