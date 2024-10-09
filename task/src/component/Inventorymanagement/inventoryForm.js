import React, { useEffect, useState } from 'react';

const TaskForm = ({ addInventory, submitted, data, isEdit }) => {
    const [inventoryData, setInventoryData] = useState({
        iId: '',
        title: '',
        description: '',
        employee: '',
        type: '',
        date: '',
        status: '',
    });

    useEffect(() => {
        if (isEdit && data) {
            setInventoryData({
                iId: data.iId,
                title: data.title,
                description: data.description,
                employee: data.employee,
                type: data.type,
                date: data.date,
                status: data.status,
            });
        }
    }, [data, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addInventory(inventoryData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="iId"
                value={inventoryData.iId}
                onChange={handleChange}
                placeholder="Inventory ID"
                required
            />
            <input
                type="text"
                name="itemName"
                value={inventoryData.itemName}
                onChange={handleChange}
                placeholder="itemName"
                required
            />
            <input
                type="text"
                name="quantity"
                value={inventoryData.quantity}
                onChange={handleChange}
                placeholder="quantity"
            />
            <input
                type="text"
                name="employee"
                value={inventoryData.employee}
                onChange={handleChange}
                placeholder="Assigned Employee"
            />
            <input
                type="text"
                name="type"
                value={inventoryData.type}
                onChange={handleChange}
                placeholder="Type"
                required
            />
            <input
                type="date"
                name="date"
                value={inventoryData.date}
                onChange={handleChange}
                required
            />
            <select
                name="status"
                value={inventoryData.status}
                onChange={handleChange}
                required
            >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
            </select>
            <button type="submit">
                {isEdit ? 'Update Inventory Item' : 'Add Inventory Item'}
            </button>
        </form>
    );
};

export default TaskForm;
