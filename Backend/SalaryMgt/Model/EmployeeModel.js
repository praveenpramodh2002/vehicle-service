const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    basic_salary: {
        type: String,
        required: true
    },
    working_hours: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/, // Regex to ensure the phone number contains exactly 10 digits
    }
});

module.exports = mongoose.model("Employee", employeeSchema);
