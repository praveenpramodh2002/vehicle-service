import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/sidebar";
import "./emplist.css"; // Ensure this path is correct

const URL = "http://localhost:3001/employees"; // Ensure this URL matches your backend route

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(URL);
        setEmployees(response.data.employees || []);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    return (
      (employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!departmentFilter || employee.department === departmentFilter) &&
      (!positionFilter || employee.position === positionFilter) &&
      (!salaryFilter ||
        parseInt(employee.basic_salary) <= parseInt(salaryFilter))
    );
  });

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <div className="header">
          <h1>Employee List</h1>
        </div>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Service">Service</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Collision Repair">Collision Repair</option>
            <option value="Sales">Sales</option>
            <option value="Parts">Parts</option>
          </select>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="">All Positions</option>
            <option value="Engineer">Engineer</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Advisor">Advisor</option>
            <option value="Technician">Technician</option>
            <option value="Specialist">Specialist</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Clerk">Clerk</option>
          </select>
          <input
            type="number"
            placeholder="Max Salary"
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
          />
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>NIC</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Basic Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.nic}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.basic_salary}</td>
                  <td>
                    <Link to={`/employee/${employee._id}`} className="link">
                      <button>View Profile</button>
                    </Link>

                    <Link to={`/generatepayroll/${employee.nic}`} className="link">
                      <button>Generate Payroll</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
