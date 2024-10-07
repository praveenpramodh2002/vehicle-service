import React, { useState, useEffect } from 'react';
import './taskForm.css';

// Form Input Component
const FormInput = ({ label, type, name, value, onChange, error, placeholder, required, min, maxLength }) => (
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
            maxLength={maxLength}
        />
        {error && <div className="error">{error}</div>}
    </div>
);

// Form TextArea Component
const FormTextArea = ({ label, name, value, onChange, placeholder, required, error }) => (
    <div className="form-group">
        {label && <label>{label}</label>}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
        {error && <div className="error">{error}</div>}
    </div>
);

const TaskForm = ({ addTask, data, isEdit }) => {
    const [formState, setFormState] = useState({
        tId: '',
        title: '',
        description: '',
        employee: '',
        designation: '',
        phoneNumber: '',
        type: '',
        date: '',
        completionTime: '',
        status: ''
    });

    const [errors, setErrors] = useState({
        phoneNumber: '',
        tId: '',
        description: ''
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
                date: data.date ? data.date.split('T')[0] : '',
                completionTime: data.completionTime || '' // Ensure to load completionTime
            });
        }
    }, [data]);

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

        if (name === 'phoneNumber') {
            if (value.length <= 10) {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value.replace(/[^0-9]/g, '')
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
        } else if (name === 'title') {
            if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            }
        } else if (name === 'employee') {
            if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            } else {
                alert('Employee name cannot contain numbers or special characters.');
            }
        } else if (name === 'description') {
            if (!/\d/.test(value) || value === '') {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
                setErrors((prevState) => ({
                    ...prevState,
                    description: ''
                }));
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    description: 'Task description cannot contain numerical values'
                }));
            }
        } else {
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        validatePhoneNumber(formState.phoneNumber);
        validateTaskId(formState.tId);

        if (!errors.phoneNumber && !errors.tId && !errors.description && formState.phoneNumber.length === 10) {
            try {
                await addTask(formState);
                setNotification(isEdit ? 'Task updated successfully!' : 'Task added successfully!');

                setFormState({
                    tId: '',
                    title: '',
                    description: '',
                    employee: '',
                    designation: '',
                    phoneNumber: '',
                    type: '',
                    date: '',
                    completionTime: '',
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
            designation: '',
            phoneNumber: '',
            type: '',
            date: '',
            completionTime: '',
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
                    <form onSubmit={handleSubmit} className="form-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                        <FormInput
                            label="Task ID"
                            type="number"
                            name="tId"
                            value={formState.tId}
                            onChange={handleChange}
                            placeholder="Task ID"
                            required
                            error={errors.tId}
                            min="0"
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
                            error={errors.description}
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
                        <div className="form-group">
                            <label>Employee Designation</label>
                            <select
                                name="designation"
                                value={formState.designation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Designation</option>
                                <option value="Service Manager">Service Manager</option>
                                <option value="Service Advisor">Service Advisor</option>
                                <option value="Automotive Technician">Automotive Technician</option>
                                <option value="Parts Specialist">Parts Specialist</option>
                                <option value="Customer Service Representative">Customer Service Representative</option>
                                <option value="Detailing Specialist">Detailing Specialist</option>
                                <option value="Alignment Specialist">Alignment Specialist</option>
                                <option value="Diagnostic Specialist">Diagnostic Specialist</option>
                                <option value="Service Consultant">Service Consultant</option>
                                <option value="Fleet Manager">Fleet Manager</option>
                                <option value="General Manager">General Manager</option>
                            </select>
                        </div>
                        <FormInput
                            label="Phone Number"
                            type="tel"
                            name="phoneNumber"
                            value={formState.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
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
                            label="Completion Date"
                            type="date"
                            name="date"
                            value={formState.date}
                            onChange={handleChange}
                            min={minDate}
                            required
                        />
                        <FormInput
                            label="Completion Time"
                            type="time"
                            name="completionTime"
                            value={formState.completionTime}
                            onChange={handleChange}
                            required
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
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button type="submit" className="submit-btn">{isEdit ? 'Update Task' : 'Add Task'}</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default TaskForm;
