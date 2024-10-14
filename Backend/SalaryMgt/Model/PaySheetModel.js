// PaySheetModel.js
const mongoose = require('mongoose');

const PaySheetSchema = new mongoose.Schema({
    employee_name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
        unique: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    epfDeduction: {
        type: Number,
        required: true,
    },
    etfDeduction: {
        type: Number,
        required: true,
    },
    additionalDeductions: {
        type: Number,
        default: 0,
    },
    incentives: {
        type: Number,
        default: 0,
    },
    netSalary: {
        type: Number,
        required: true,
    },
    generatedAt: {
        type: Date,
        default: Date.now,
    },
});


// Create a model from the schema
const PaySheet = mongoose.model('PaySheet', PaySheetSchema);

module.exports = PaySheet;
