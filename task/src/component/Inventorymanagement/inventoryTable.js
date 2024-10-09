import React from 'react';

const TaskTable = ({ rows, onEditInventory, onDeleteInventory }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Inventory ID</th>
                    <th>itemName</th>
                    <th>quantity</th>
                    <th>Assigned Employee</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row._id}>
                        <td>{row.iId}</td>
                        <td>{row.itemName}</td>
                        <td>{row.quantity}</td>
                        <td>{row.employee}</td>
                        <td>{row.type}</td>
                        <td>{new Date(row.date).toLocaleDateString()}</td>
                        <td>{row.status}</td>
                        <td>
                            <button onClick={() => onEditInventory(row)}>Edit</button>
                            <button onClick={() => onDeleteInventory(row._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskTable;
