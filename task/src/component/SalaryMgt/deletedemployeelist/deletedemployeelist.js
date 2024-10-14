import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/sidebar";
import "./emplist.css"; // Ensure this path is correct

const URL = "http://localhost:5000/employees/deletedemployees"; // Ensure this URL matches your backend route

const DeletedEmployeeList = () => {
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  useEffect(() => {
    const fetchDeletedEmployees = async () => {
      try {
        const response = await axios.get(URL);
        console.log(response.data); // Log the response data to inspect it
        setDeletedEmployees(response.data.deletedEmployees || []);
      } catch (error) {
        console.error("Error fetching deleted employee data:", error);
      }
    };

    fetchDeletedEmployees();
  }, []);

  const filteredDeletedEmployees = deletedEmployees.filter((employee) => {
    return (
      (employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!departmentFilter || employee.department === departmentFilter) &&
      (!positionFilter || employee.position === positionFilter) &&
      (!salaryFilter || employee.basic_salary <= parseInt(salaryFilter))
    );
  });

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <div className="header">
          <h1>Deleted Employee List</h1>
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
              <th>Last Name</th>
              <th>NIC</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Position</th>
              <th>Department</th>
              <th>Basic Salary</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeletedEmployees.length > 0 ? (
              filteredDeletedEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.nic}</td>
                  <td>{new Date(employee.dateofbirth).toLocaleDateString()}</td>
                  <td>{employee.address}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.basic_salary}</td>
                  <td>{employee.working_hours}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No deleted employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletedEmployeeList;
