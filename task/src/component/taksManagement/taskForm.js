import React, { useState, useEffect } from 'react';
import './taskForm.css';

const TaskForm = ({ addTask, submitted, data, isEdit }) => {
    const [formState, setFormState] = useState({
        tId: '',
        title: '',
        description: '',
        employee: '',
        email: '',
        type: '',
        date: '',
        status: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        title: '',
        employee: ''
    });
    const [isMinimized, setIsMinimized] = useState(false);
    const [notification, setNotification] = useState('');
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);

        if (data) {
            setFormState({
                ...data,
                date: data.date ? data.date.split('T')[0] : ''
            });
        }
    }, [data]);

    // Function to handle the allowed characters for email
    const validateEmailInput = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
        if (!emailPattern.test(email)) {
            setErrors((prevState) => ({ ...prevState, email: 'Invalid email address' }));
        } else {
            setErrors((prevState) => ({ ...prevState, email: '' }));
        }
        return email;
    };

    // Function to prevent numbers and special characters in text fields
    const preventNumbersAndSpecialChars = (value) => {
        return value.replace(/[^a-zA-Z ]/g, ''); // Only allows letters (a-z, A-Z) and spaces
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let filteredValue = value;

        // Validate email to allow only valid email format
        if (name === 'email') {
            filteredValue = validateEmailInput(value);
        }

        // Prevent numbers and special characters in task title, employee name, and task type
        if (name === 'title' || name === 'employee' || name === 'type') {
            filteredValue = preventNumbersAndSpecialChars(value);
        }

        setFormState((prevState) => ({
            ...prevState,
            [name]: filteredValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!errors.email) {
            addTask(formState);

            setNotification(isEdit ? 'Task updated successfully!' : 'Task added successfully!');

            setTimeout(() => {
                setNotification('');
            }, 3000);

            setFormState({
                tId: '',
                title: '',
                description: '',
                employee: '',
                email: '',
                type: '',
                date: '',
                status: ''
            });
        } else {
            alert("Please fix errors before submitting.");
        }
    };

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleClose = () => {
        setFormState({
            tId: '',
            title: '',
            description: '',
            employee: '',
            email: '',
            type: '',
            date: '',
            status: ''
        });
        setErrors({});
    };

    return (
        <div className={`form-frame ${isMinimized ? 'minimized' : ''}`}>
            <div className="form-header">
                <span>Task Form</span>
                <div className="form-controls">
                    <button type="button" onClick={handleMinimize} className="minimize-btn">
                        {isMinimized ? '+' : '-' }
                    </button>
                    <button type="button" onClick={handleClose} className="close-btn">x</button>
                </div>
            </div>
            {!isMinimized && (
                <>
                    {notification && <div className="notification">{notification}</div>}
                    <form onSubmit={handleSubmit} className="form-content">
                        <div className="form-group">
                            <input
                                type="number"
                                name="tId"
                                value={formState.tId}
                                onChange={handleChange}
                                placeholder="Task ID"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="title"
                                value={formState.title}
                                onChange={handleChange}
                                placeholder="Task Title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="description"
                                value={formState.description}
                                onChange={handleChange}
                                placeholder="Task Description"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="employee"
                                value={formState.employee}
                                onChange={handleChange}
                                placeholder="Assigned Employee"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Employee Email"
                                required
                            />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="type"
                                value={formState.type}
                                onChange={handleChange}
                                placeholder="Task Type"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                name="date"
                                value={formState.date}
                                onChange={handleChange}
                                required
                                min={minDate}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="status"
                                value={formState.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <button type="submit">{isEdit ? 'Update Task' : 'Add Task'}</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default TaskForm;
