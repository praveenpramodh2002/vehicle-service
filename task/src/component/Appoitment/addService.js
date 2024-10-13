import React, { useState } from 'react';
import axios from 'axios';
import './addService.css';

function AddService() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8070/service', formData)
            .then(response => {
                alert('Service added successfully!');
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    duration: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the service!', error);
            });
    };

    return (
        <div className="add-service">
            <h2>Add a New Service</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Duration (in minutes):
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Add Service</button>
            </form>
        </div>
    );
}

export default AddService;
