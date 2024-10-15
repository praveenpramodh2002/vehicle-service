import React, { useEffect, useState } from 'react';
import './inventoryForm.css'; // Assuming you have a CSS file for styles

const InventoryForm = ({ addInventory, submitted, data, isEdit }) => {
    const [inventoryData, setInventoryData] = useState({
        itemId: '',
        itemName: '',
        quantity: '',
        unitPrice: '',  // New Unit Price field
        totalPrice: '', // New Total Price field (auto-calculated)
        supplier: '',
        reorderLevel: '',
        dateAdded: '',
        status: '',
        category: '', 
    });

    // Set initial form data if in edit mode
    useEffect(() => {
        if (isEdit && data) {
            setInventoryData({
                ...data,
                category: data.category || '',
            });
        }
    }, [data, isEdit]);

    // Prevent negative or invalid input for numeric fields
    const preventInvalidNumbers = (e) => {
        if (e.key === '-' || e.key === '+' || e.key === 'e') {
            e.preventDefault();
        }
    };

    const preventInvalidSupplierChars = (e) => {
        const regex = /^[0-9]+$/; // Block numeric input for supplier name
        if (regex.test(e.key)) {
            e.preventDefault();
        }
    };

    const preventInvalidNameChars = (e) => {
        const regex = /[^a-zA-Z\s]/; // Block numbers and special characters
        if (regex.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData((prevData) => {
            const updatedData = { ...prevData, [name]: value };

            // Auto-calculate total price whenever quantity or unit price changes
            if (name === 'quantity' || name === 'unitPrice') {
                const quantity = parseFloat(updatedData.quantity) || 0;
                const unitPrice = parseFloat(updatedData.unitPrice) || 0;
                updatedData.totalPrice = (quantity * unitPrice).toFixed(2);
            }

            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addInventory(inventoryData);
    };

    const today = new Date().toISOString().split('T')[0]; // Get today's date

    return (
        <div className="inventory-form-box">
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
                        min="1"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="itemName"
                        value={inventoryData.itemName}
                        onChange={handleChange}
                        onKeyDown={preventInvalidNameChars}
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
                        min="1"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="unitPrice"
                        value={inventoryData.unitPrice}
                        onChange={handleChange}
                        onKeyDown={preventInvalidNumbers}
                        placeholder="Unit Price"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="totalPrice"
                        value={inventoryData.totalPrice}
                        readOnly // Total price is calculated automatically
                        placeholder="Total Price"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="supplier"
                        value={inventoryData.supplier}
                        onChange={handleChange}
                        onKeyDown={preventInvalidSupplierChars}
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
                        min="1"
                    />
                </div>

                <div>
                    <input
                        type="date"
                        name="dateAdded"
                        value={inventoryData.dateAdded}
                        onChange={handleChange}
                        required
                        min={today}
                        max={today}
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
