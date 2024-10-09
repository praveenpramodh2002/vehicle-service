import React, { useState } from 'react';
import './inventorytable.css';
import { jsPDF } from 'jspdf';

const InventoryTable = ({ rows, onEditInventory, onDeleteInventory }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Function to generate the PDF report
    const generateReport = () => {
        const doc = new jsPDF();

        // Title
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

        // Line Separator
        doc.setLineWidth(0.8);
        doc.line(14, 45, 196, 45);

        // Table Header
        const headers = ['Inventory ID', 'Item Name', 'Quantity', 'Supplier', 'Reorder Level', 'Date Added', 'Status'];
        const columnWidths = [30, 50, 20, 40, 25, 30, 20]; // Adjust widths as needed
        const headerHeight = 10;
        const startY = 55;

        // Header row
        headers.forEach((header, index) => {
            doc.text(header, 14 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), startY);
        });

        // Table Rows
        rows.forEach((row, rowIndex) => {
            const y = startY + headerHeight + (rowIndex + 1) * 10; // 10 is row height
            doc.text(row.itemId, 14, y);
            doc.text(row.itemName, 14 + columnWidths[0], y);
            doc.text(row.quantity.toString(), 14 + columnWidths[0] + columnWidths[1], y);
            doc.text(row.supplier, 14 + columnWidths[0] + columnWidths[1] + columnWidths[2], y);
            doc.text(row.reorderLevel.toString(), 14 + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y);
            doc.text(new Date(row.dateAdded).toLocaleDateString(), 14 + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], y);
            doc.text(row.status, 14 + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], y);
        });

        // Save the PDF
        doc.save('inventory_report.pdf');
    };

    // Filter rows based on the search term
    const filteredRows = rows.filter(row =>
        row.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.itemId.toString().includes(searchTerm) ||
        row.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button className="generate-report" onClick={generateReport}>Generate Report</button>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Inventory ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Supplier</th>
                        <th>Reorder Level</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.length > 0 ? (
                        filteredRows.map((row) => (
                            <tr key={row._id}>
                                <td>{row.itemId}</td>
                                <td>{row.itemName}</td>
                                <td>{row.quantity}</td>
                                <td>{row.supplier}</td>
                                <td>{row.reorderLevel}</td>
                                <td>{new Date(row.dateAdded).toLocaleDateString()}</td>
                                <td>{row.status}</td>
                                <td>
                                    <button className="edit" onClick={() => onEditInventory(row)}>Edit</button>
                                    <button className="delete" onClick={() => onDeleteInventory(row._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No inventory items found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
