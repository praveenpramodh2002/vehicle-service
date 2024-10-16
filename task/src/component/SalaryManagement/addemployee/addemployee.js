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
    phoneno: "",
    gender: "",
    position: "",
    department: "",
    basic_salary: "",
    working_hours: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const dob = new Date(employeeData.dateofbirth);
  
    if (!employeeData.dateofbirth) {
      newErrors.dateofbirth = "Date of birth is required";
    } else if (dob > today) {
      newErrors.dateofbirth = "Date of birth cannot be in the future";
    } else {
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
  
      if (age < 18) {
        newErrors.dateofbirth = "Employee must be at least 18 years old";
      }
    }

    // Name Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(employeeData.first_name)) newErrors.first_name = "First Name is required";
    if (!nameRegex.test(employeeData.last_name)) newErrors.last_name = "Last Name is required";

    // NIC Validation
    const nicRegex = /^(?:\d{12}|\d{9}[vx])$/i;
    if (!nicRegex.test(employeeData.nic)) newErrors.nic = "Valid NIC is required";
    if (employeeData.nic.length > 12) newErrors.nic = "NIC must be 12 digits or less";

    // Address Validation
    if (!employeeData.address) newErrors.address = "Address is required";

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employeeData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(employeeData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone Number Validation
    const phoneRegex = /^\d{10}$/;
    if (!employeeData.phoneno) {
      newErrors.phoneno = "Phone number is required";
    } else if (!phoneRegex.test(employeeData.phoneno)) {
      newErrors.phoneno = "Phone number must be exactly 10 digits";
    }

    // Gender Validation
    if (!employeeData.gender) newErrors.gender = "Gender is required";

    // Position Validation
    if (!employeeData.position) newErrors.position = "Position is required";

    // Department Validation
    if (!employeeData.department) newErrors.department = "Department is required";

    // Salary and Hours Validation
    if (!employeeData.basic_salary || employeeData.basic_salary <= 0) newErrors.basic_salary = "Valid Basic Salary is required";
    if (!employeeData.working_hours || employeeData.working_hours <= 0) newErrors.working_hours = "Valid Working Hours are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Employee data:", employeeData);  // This will log the whole employee object
      console.log("Date of Birth:", employeeData.dateofbirth);  // Specifically log the dateofbirth value

      try {
        const response = await axios.post("http://localhost:3001/employees", employeeData);
        console.log(response.data);
        alert("Employee added successfully");
        navigate("/hrmdb");
      } catch (error) {
        console.error("There was an error adding the employee!", error);
        alert("Failed to add employee");
      }
    } else {
      alert("Please fix the errors in the form");
    }
};


  return (
    <div className="add-employee-container">
      <div className="add-employee-sidebar">
        <Sidebar />
      </div>
      <div className="add-employee-form-container">
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
              {errors.first_name && <p className="error">{errors.first_name}</p>}
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
                maxLength={12}
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
  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
/>
              {errors.dateofbirth && <p className="error">{errors.dateofbirth}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneno"
                value={employeeData.phoneno}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.phoneno && <p className="error">{errors.phoneno}</p>}
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
              {errors.department && <p className="error">{errors.department}</p>}
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
              {errors.basic_salary && <p className="error">{errors.basic_salary}</p>}
            </div>
            <div className="form-group">
              <label>Working Hours</label>
              <input
                type="number"
                name="working_hours"
                value={employeeData.working_hours}
                onChange={handleChange}
              />
              {errors.working_hours && <p className="error">{errors.working_hours}</p>}
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={employeeData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
