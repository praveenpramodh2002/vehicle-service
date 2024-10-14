import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './vehicleTable.css';

const VehicleTable = ({ vehicles, onEditVehicle, onDeleteVehicle, onRestoreVehicle, onPermanentlyDelete, isDeletedTable }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState('vehicleno'); 

    const filteredVehicles = vehicles.filter(vehicle => {
        const valueToCheck = vehicle[filterOption] ? vehicle[filterOption].toString().toLowerCase() : '';
        return valueToCheck.includes(searchQuery.toLowerCase());
    });

    const handlePrint = () => {
        const doc = new jsPDF();
        
        doc.setFontSize(24);
        doc.setTextColor(40, 114, 178); 
        doc.text('Microservice Center', 14, 22);

          // Contact Information
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0); 
          const date = new Date().toLocaleDateString();
          doc.text(`Date: ${date}`, 160, 22);
          doc.text('72/A, Makumbura, Pannipitiya', 14, 30);
          doc.text('+94 112203203', 14, 36);
          doc.text('microservicecenter@gmail.com', 14, 42);
    
        doc.setLineWidth(0.8);
        doc.line(14, 45, 196, 45);
    
        doc.setFontSize(18);
        doc.setTextColor(40, 114, 178); 
        doc.text('User Details', 14, 55);
    
        doc.autoTable({
            startY: 60,
            head: [['Full Name', 'NIC', 'Contact', 'Email', 'Address']],
            body: filteredVehicles.map(vehicle => [
                vehicle.fullname,
                vehicle.nic,
                vehicle.contact,
                vehicle.email,
                vehicle.address,
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [40, 114, 178], 
                textColor: [255, 255, 255] 
            },
            styles: {
                lineColor: [0, 0, 0], 
                lineWidth: 0.5
            }
        });
    
        doc.setTextColor(40, 114, 178); 
        doc.text('Vehicle Details', 14, doc.previousAutoTable.finalY + 20);
    
        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 28,
            head: [['NIC','Vehicle No','Brand', 'Model', 'Year','Engine No', 'Chassis No', 'Service Record']],
            body: filteredVehicles.map(vehicle => [
                vehicle.nic,
                vehicle.vehicleno,
                vehicle.brand,
                vehicle.model,
                vehicle.year,
                vehicle.engineno, 
                vehicle.chassisno,
                vehicle.condition,
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [40, 114, 178], 
                textColor: [255, 255, 255] 
            },
            styles: {
                lineColor: [0, 0, 0], 
                lineWidth: 0.5
            }
        });
    
   
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); 
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    
        doc.save('Microservice_Center_Report.pdf');
    };
    
    
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchQuery') {
            setSearchQuery(value);
        } else {
            setFilterOption(value);
        }
    };

    return (
        <div className="table_container1">
            <div className="TableHeader1">
            <div className="total-vehicles">
            <h3>{isDeletedTable ? 'Total Deleted Accounts' : 'Total Accounts'}: {filteredVehicles.length}</h3>
            </div>

                <div className="search_box1">
                    <label className="search_container1">
                        <input
                            type="text"
                            placeholder="Search..."
                            name="searchQuery"
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <select name="filterOption1" value={filterOption} onChange={handleInputChange}>
                            <option value="nic">NIC</option>
                            <option value="vehicleno">Vehicle No</option>
                           
                        </select>
                    </label>
                </div>
             
                {!isDeletedTable && (
                    <button className="btn1" onClick={handlePrint}>Download Report</button>
                )}
            </div>
    
            {/* User Data Table */}
            <h2>{isDeletedTable ? 'Deleted User Data' : 'User Data'}</h2>
            <div class="accounttable">
            <table>
                <thead>
                    <tr>
                       {/* <th>User ID</th> */}
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
                                {/*<td>{vehicle.userid}</td> */}
                                <td>{vehicle.fullname}</td>
                                <td>{vehicle.nic}</td>
                                <td>{vehicle.contact}</td>
                                <td>{vehicle.email}</td>
                                <td>{vehicle.address}</td>
                                {!isDeletedTable && (
                                    <td>
                                        <button className='updateBtn1' onClick={() => onEditVehicle(vehicle)}>
                                            Update
                                        </button>
                                        <button className='deleteBtn1' onClick={() => onDeleteVehicle(vehicle._id)}>
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
                         {/* <th>User ID</th> */}
                        {/*<th>Vehicle ID</th>*/}
                        <th>NIC</th>
                        <th>Vehicle No</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Year</th>
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
                            {/* <td>{vehicle.userid}</td>*/}
                            {/* <td>{vehicle.vehicleid}</td>*/}
                                <td>{vehicle.nic}</td>
                                <td>{vehicle.vehicleno}</td>
                                <td>{vehicle.brand}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.engineno}</td>
                                <td>{vehicle.chassisno}</td>
                                <td>{vehicle.condition}</td>
                                {!isDeletedTable && (
                                    <td>
                                        <button className='updateBtn1' onClick={() => onEditVehicle(vehicle)}>
                                            Update
                                        </button>
                                        <button className='deleteBtn1' onClick={() => onDeleteVehicle(vehicle._id)}>
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
        </div>
    );
    
};

export default VehicleTable;
