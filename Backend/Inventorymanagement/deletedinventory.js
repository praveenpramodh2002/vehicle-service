import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParentComponent = () => {
    const [inventory, setInventory] = useState([]);
    const [deletedInventory, setDeletedInventory] = useState([]);

    useEffect(() => {
        // Fetch tasks from the server when the component mounts
        axios.get('http://localhost:3001/api/inventory')
            .then(response => setInventory(response.data.response))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleDeleteInventory = (taskId) => {
        axios.delete(`http://localhost:3001/api/inventory/${inventoryId}`)
            .then(response => {
                const deletedInventory = response.data.response;
                setInventory(prevInventory => prevInventory.filter(inventory=> inventory._id !== inventoryId));
                setDeletedInventory(prevDeletedInventory => [...prevDeletedInventory, deletedInventory]);
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleEditInventory = (task) => {
        // Implement your edit logic here
        console.log('Editing inventory:', inventory);
    };

    return (
        <Tasktable
            rows={inventory}
            onEditInventory={handleEditInventory}
            onDeleteInventory={handleDeleteInventory}
        />
    );
};

export default ParentComponent;
