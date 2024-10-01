import React, { useState, useEffect } from 'react';
import './taskForm.css';

// Form Input Component
const FormInput = ({ label, type, name, value, onChange, error, placeholder, required, min }) => (
    <div className="form-group">
        {label && <label>{label}</label>}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
        />
        {error && <div className="error">{error}</div>}
    </div>
);

// Form TextArea Component
const FormTextArea = ({ label, name, value, onChange, placeholder, required }) => (
    <div className="form-group">
        {label && <label>{label}</label>}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    </div>
);

const TaskForm = ({ addTask, data, isEdit }) => {
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

    const validateEmailInput = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrors((prevState) => ({ ...prevState, email: 'Invalid email address' }));
        } else {
            setErrors((prevState) => ({ ...prevState, email: '' }));
        }
        return email;
    };

    const preventNumbersAndSpecialChars = (value) => {
        return value.replace(/[^a-zA-Z ]/g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let filteredValue = value;

        if (name === 'email') {
            filteredValue = validateEmailInput(value);
        }
        if (name === 'title' || name === 'employee' || name === 'type') {
            filteredValue = preventNumbersAndSpecialChars(value);
        }

        setFormState((prevState) => ({
            ...prevState,
            [name]: filteredValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!errors.email) {
            try {
                await addTask(formState);
                setNotification(isEdit ? 'Task updated successfully!' : 'Task added successfully!');

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

                window.location.reload();
            } catch (err) {
                console.error("Failed to add task", err);
            }
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
                        {isMinimized ? '+' : '-'}
                    </button>
                    <button type="button" onClick={handleClose} className="close-btn">x</button>
                </div>
            </div>
            {!isMinimized && (
                <>
                    {notification && <div className="notification">{notification}</div>}
                    <form onSubmit={handleSubmit} className="form-content">
                        <FormInput
                            label="Task ID"
                            type="number"
                            name="tId"
                            value={formState.tId}
                            onChange={handleChange}
                            placeholder="Task ID"
                            required
                        />
                        <FormInput
                            label="Task Title"
                            type="text"
                            name="title"
                            value={formState.title}
                            onChange={handleChange}
                            placeholder="Task Title"
                            required
                            error={errors.title}
                        />
                        <FormTextArea
                            label="Task Description"
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                            placeholder="Task Description"
                            required
                        />
                        <FormInput
                            label="Assigned Employee"
                            type="text"
                            name="employee"
                            value={formState.employee}
                            onChange={handleChange}
                            placeholder="Assigned Employee"
                            required
                            error={errors.employee}
                        />
                        <FormInput
                            label="Employee Email"
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="Employee Email"
                            required
                            error={errors.email}
                        />
                        <FormInput
                            label="Task Type"
                            type="text"
                            name="type"
                            value={formState.type}
                            onChange={handleChange}
                            placeholder="Task Type"
                            required
                        />
                        <FormInput
                            label="Date"
                            type="date"
                            name="date"
                            value={formState.date}
                            onChange={handleChange}
                            required
                            min={minDate}
                        />
                        <div className="form-group">
                            <label>Status</label>
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
