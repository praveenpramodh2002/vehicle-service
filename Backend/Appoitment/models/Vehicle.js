const mongoose = require('mongoose');
const { Schema } = mongoose;

// Vehicle Schema
const VehicleSchema = new Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent Overwrite Model Error by checking if the model already exists
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
