import React, { useEffect, useState } from 'react';
import './inventoryForm.css'; // Assuming you have a CSS file for styles

const InventoryForm = ({ addInventory, submitted, data, isEdit }) => {
    const [inventoryData, setInventoryData] = useState({
        itemId: '',
        itemName: '',
        quantity: '',
        supplier: '',
        reorderLevel: '',
        dateAdded: '',
        status: '',
        category: '', // Add category field
    });

    useEffect(() => {
        if (isEdit && data) {
            setInventoryData({
                itemId: data.itemId,
                itemName: data.itemName,
                quantity: data.quantity,
                supplier: data.supplier,
                reorderLevel: data.reorderLevel,
                dateAdded: data.dateAdded,
                status: data.status,
                category: data.category || '', // Include category if editing
            });
        }
    }, [data, isEdit]);

    // Prevent negative values and non-numeric input for numbers
    const preventInvalidNumbers = (e) => {
        if (e.key === '-' || e.key === '+' || e.key === 'e') {
            e.preventDefault();
        }
    };

    // Prevent numbers and special characters for supplier
    const preventInvalidSupplierChars = (e) => {
        const regex = /^[0-9]+$/; // Only digits are not allowed
        if (regex.test(e.key)) {
            e.preventDefault();
        }
    };

    // Prevent numbers and special characters for itemName
    const preventInvalidNameChars = (e) => {
        const regex = /[^a-zA-Z\s]/;
        if (regex.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addInventory(inventoryData);
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="inventory-form-box"> {/* Add a box around the form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="number"
                        name="itemId"
                        value={inventoryData.itemId}
                        onChange={handleChange}
                        onKeyDown={preventInvalidNumbers}
                        placeholder="Inventory ID"
                        required
                        min="1" // Ensure it's a positive number
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="itemName"
                        value={inventoryData.itemName}
                        onChange={handleChange}
                        onKeyDown={preventInvalidNameChars} // Prevent numbers or special characters
                        placeholder="Item Name"
                        required
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="quantity"
                        value={inventoryData.quantity}
                        onChange={handleChange}
                        onKeyDown={preventInvalidNumbers}
                        placeholder="Quantity"
                        required
                        min="1" // Ensure quantity is greater than zero
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="supplier"
                        value={inventoryData.supplier}
                        onChange={handleChange}
                        onKeyDown={preventInvalidSupplierChars} // Prevent numbers
                        placeholder="Supplier"
                        required
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="reorderLevel"
                        value={inventoryData.reorderLevel}
                        onChange={handleChange}
                        onKeyDown={preventInvalidNumbers}
                        placeholder="Reorder Level"
                        required
                        min="1" // Ensure it's a positive number
                    />
                </div>

                <div>
                    <input
                        type="date"
                        name="dateAdded"
                        value={inventoryData.dateAdded}
                        onChange={handleChange}
                        required
                        min={today} // Prevent selecting past dates
                        max={today} // Prevent selecting tomorrow's date
                    />
                </div>

                <div>
                    <select
                        name="category"
                        value={inventoryData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Parts">Parts</option>
                        <option value="Tools">Tools</option>
                        <option value="Supplies">Supplies</option>
                        <option value="Equipment">Equipment</option>
                    </select>
                </div>

                <div>
                    <select
                        name="status"
                        value={inventoryData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                <button type="submit">
                    {isEdit ? 'Update Inventory Item' : 'Add Inventory Item'}
                </button>
            </form>
        </div>
    );
};

export default InventoryForm;
