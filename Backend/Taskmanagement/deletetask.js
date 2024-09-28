import React, { useState, useEffect } from 'react';
import Tasktable from './Tasktable';
import axios from 'axios';

const ParentComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [deletedTasks, setDeletedTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the server when the component mounts
        axios.get('http://localhost:3001/api/task')
            .then(response => setTasks(response.data.response))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:3001/api/task/${taskId}`)
            .then(response => {
                const deletedTask = response.data.response;
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
                setDeletedTasks(prevDeletedTasks => [...prevDeletedTasks, deletedTask]);
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleEditTask = (task) => {
        // Implement your edit logic here
        console.log('Editing task:', task);
    };

    return (
        <Tasktable
            rows={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
        />
    );
};

export default ParentComponent;
