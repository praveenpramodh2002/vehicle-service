import React, { useState, useEffect } from 'react';
import './taskForm.css';

// Form Input Component
const FormInput = ({ label, type, name, value, onChange, error, placeholder, required, min, onInput, maxLength }) => (
    <div className="form-group">
        {label && <label>{label}</label>}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onInput={onInput}
            placeholder={placeholder}
            required={required}
            min={min}
            maxLength={maxLength} // Added maxLength prop
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
        phoneNumber: '', // New field for employee phone number
        type: '',
        date: '',
        status: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        title: '',
        employee: '',
        phoneNumber: '', // Error state for phone number
        tId: '' // Error state for task ID
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

    const validatePhoneNumber = (phoneNumber) => {
        if (phoneNumber.length !== 10) {
            setErrors((prevState) => ({ ...prevState, phoneNumber: 'Phone number must be exactly 10 digits' }));
        } else {
            setErrors((prevState) => ({ ...prevState, phoneNumber: '' }));
        }
    };

    const validateTaskId = (tId) => {
        if (tId < 0) {
            setErrors((prevState) => ({ ...prevState, tId: 'Task ID must be a positive number' }));
        } else {
            setErrors((prevState) => ({ ...prevState, tId: '' }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let filteredValue = value;

        if (name === 'email') {
            filteredValue = validateEmailInput(value);
        }
        if (name === 'phoneNumber') {
            if (value.length <= 10) {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value.replace(/[^0-9]/g, '') // Allow only digits
                }));
            }
        } else if (name === 'tId') {
            if (value >= 0) {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
                validateTaskId(value);
            }
        } else {
            if (name === 'title' || name === 'employee' || name === 'type') {
                filteredValue = value.replace(/[^a-zA-Z ]/g, ''); // Prevent numbers in text fields
            }

            setFormState((prevState) => ({
                ...prevState,
                [name]: filteredValue
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number and task ID before submission
        validatePhoneNumber(formState.phoneNumber);
        validateTaskId(formState.tId);

        if (!errors.email && !errors.phoneNumber && !errors.tId && formState.phoneNumber.length === 10) {
            try {
                await addTask(formState);
                setNotification(isEdit ? 'Task updated successfully!' : 'Task added successfully!');

                setFormState({
                    tId: '',
                    title: '',
                    description: '',
                    employee: '',
                    email: '',
                    phoneNumber: '', // Reset phone number after submission
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
            phoneNumber: '',
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
                            error={errors.tId}
                            min="0" // Ensures no negative number input
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
                            label="Employee Phone Number" // New field
                            type="text"
                            name="phoneNumber"
                            value={formState.phoneNumber}
                            onChange={handleChange}
                            placeholder="Employee Phone Number"
                            required
                            maxLength={10} // Limit input to 10 digits
                            error={errors.phoneNumber}
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
