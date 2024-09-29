import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from 'prop-types';
import './vehicleTable.css';

const VehicleTable = ({ vehicles = [], onEditVehicle, onDeleteVehicle, onRestoreVehicle, onPermanentlyDelete, isDeletedTable }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState('vehicleno');

    // Filter vehicles based on search query and selected filter option
    const filteredVehicles = Array.isArray(vehicles) ? vehicles.filter(vehicle => {
        const valueToCheck = vehicle[filterOption] ? vehicle[filterOption].toString().toLowerCase() : '';
        return valueToCheck.includes(searchQuery.toLowerCase());
    }) : [];

    // Generate PDF
    const handlePrint = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Account Report', 14, 22);

        // User data table
        doc.autoTable({
            startY: 30,
            head: [['User ID', 'Full Name', 'NIC', 'Contact', 'Email', 'Address']],
            body: filteredVehicles.map(vehicle => [
                vehicle.userid,
                vehicle.fullname,
                vehicle.nic,
                vehicle.contact,
                vehicle.email,
                vehicle.address,
            ]),
        });

        // Vehicle data table
        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['User ID', 'Vehicle ID', 'Brand', 'Model', 'Year', 'Vehicle No', 'Engine No', 'Chassis No', 'Service Record']],
            body: filteredVehicles.map(vehicle => [
                vehicle.userid,
                vehicle.vehicleid,
                vehicle.brand,
                vehicle.model,
                vehicle.year,
                vehicle.vehicleno,
                vehicle.engineno,
                vehicle.chassisno,
                vehicle.condition,
            ]),
        });

        doc.save('User_Accounts_report.pdf');
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchQuery') {
            setSearchQuery(value);
        } else {
            setFilterOption(value);
        }
    };

    return (
        <div className="table_container">
            <div className="TableHeader">
                <div className="total-vehicles">
                    <h3>{isDeletedTable ? 'Total Deleted Accounts' : 'Total Accounts'}: {filteredVehicles.length}</h3>
                </div>

                <div className="search_box">
                    <label className="search_container">
                        <input
                            type="text"
                            placeholder="Search..."
                            name="searchQuery"
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <select name="filterOption" value={filterOption} onChange={handleInputChange}>
                            <option value="userid">User ID</option>
                            <option value="vehicleno">Vehicle No</option>
                        </select>
                    </label>
                </div>

                {!isDeletedTable && (
                    <button className="btn" onClick={handlePrint}>Download Report</button>
                )}
            </div>

            {/* User Data Table */}
            <h2>{isDeletedTable ? 'Deleted User Data' : 'User Data'}</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Full Name</th>
                        <th>NIC</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Address</th>
                        {!isDeletedTable && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.userid}</td>
                                <td>{vehicle.fullname}</td>
                                <td>{vehicle.nic}</td>
                                <td>{vehicle.contact}</td>
                                <td>{vehicle.email}</td>
                                <td>{vehicle.address}</td>
                                {!isDeletedTable && (
                                    <td>
                                        <button className='updateBtn' onClick={() => onEditVehicle(vehicle)}>
                                            Update
                                        </button>
                                        <button className='deleteBtn' onClick={() => onDeleteVehicle(vehicle._id)}>
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Vehicle Data Table */}
            <h2>{isDeletedTable ? 'Deleted Vehicle Data' : 'Vehicle Data'}</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Vehicle ID</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Vehicle No</th>
                        <th>Engine No</th>
                        <th>Chassis No</th>
                        <th>Service Records</th>
                        {!isDeletedTable && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.userid}</td>
                                <td>{vehicle.vehicleid}</td>
                                <td>{vehicle.brand}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.vehicleno}</td>
                                <td>{vehicle.engineno}</td>
                                <td>{vehicle.chassisno}</td>
                                <td>{vehicle.condition}</td>
                                {!isDeletedTable && (
                                    <td>
                                        <button className='updateBtn' onClick={() => onEditVehicle(vehicle)}>
                                            Update
                                        </button>
                                        <button className='deleteBtn' onClick={() => onDeleteVehicle(vehicle._id)}>
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

VehicleTable.propTypes = {
    vehicles: PropTypes.array,
    onEditVehicle: PropTypes.func.isRequired,
    onDeleteVehicle: PropTypes.func.isRequired,
    onRestoreVehicle: PropTypes.func,
    onPermanentlyDelete: PropTypes.func,
    isDeletedTable: PropTypes.bool.isRequired,
};

export default VehicleTable;
