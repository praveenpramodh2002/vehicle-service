import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Axios from 'axios';

const MainComponent = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/task')
            .then(response => {
                setTasks(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    }, []);

    return (
        <div className="main-container">
            <Sidebar />
            <Dashboard1 tasks={tasks} />
        </div>
    );
};

export default MainComponent;
