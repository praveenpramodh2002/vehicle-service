import React, { useState, useEffect } from 'react';
import './taskForm.css';

// Form Input Component without Labels
const FormInput = ({ type, name, value, onChange, placeholder, required, min, maxLength }) => (
    <div className="form-group">
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
    </div>
);

// Form TextArea Component without Labels
const FormTextArea = ({ name, value, onChange, placeholder, required }) => (
    <div className="form-group">
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
                completionTime: data.completionTime || ''
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phoneNumber') {
            const sanitizedValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
            if (sanitizedValue.length <= 10) {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: sanitizedValue
                }));
            }
            return;
        }

        // Prevent numbers in specific fields
        const isTextField = ["title", "description", "employee"].includes(name);
        if (isTextField) {
            // Allow only alphabetic characters and spaces
            const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Remove all non-alphabetic characters
            setFormState((prevState) => ({
                ...prevState,
                [name]: sanitizedValue
            }));
            return;
        }

        if (name === 'tId') {
            const sanitizedValue = Math.max(0, parseInt(value) || 0); // Prevent negative IDs
            setFormState((prevState) => ({
                ...prevState,
                [name]: sanitizedValue.toString()
            }));
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

        if (!errors.phoneNumber && formState.phoneNumber.length === 10) {
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
                console.error('Failed to add task', err);
            }
        } else {
            alert('Please fix errors before submitting.');
        }
    };

    const handleMinimize = () => setIsMinimized(!isMinimized);

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
                        <FormInput type="number" name="tId" value={formState.tId} onChange={handleChange} placeholder="Task ID" required min="0" />
                        <FormInput type="text" name="title" value={formState.title} onChange={handleChange} placeholder="Task Title" required />
                        <FormTextArea name="description" value={formState.description} onChange={handleChange} placeholder="Task Description" required />
                        <FormInput type="text" name="employee" value={formState.employee} onChange={handleChange} placeholder="Assigned Employee" required />
                        <div className="form-group">
                            <select name="designation" value={formState.designation} onChange={handleChange} required>
                                <option value="">Select Designation</option>
                                <option value="Service Manager">Service Manager</option>
                                <option value="Automotive Technician">Automotive Technician</option>
                                <option value="Fleet Manager">Fleet Manager</option>
                            </select>
                        </div>
                        <FormInput type="tel" name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
                        <FormInput type="text" name="type" value={formState.type} onChange={handleChange} placeholder="Task Type" required />
                        <FormInput type="date" name="date" value={formState.date} onChange={handleChange} min={minDate} required />
                        <FormInput type="time" name="completionTime" value={formState.completionTime} onChange={handleChange} required />
                        <div className="form-group">
                            <select name="status" value={formState.status} onChange={handleChange} required>
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
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
