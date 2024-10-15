const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedEmployeeSchema = new Schema({
    first_name: String,
    last_name: String,
    nic: String,
    dateofbirth: Date,
    address: String,
    phoneno: String,
    email: String,
    gender: String,
    position: String,
    department: String,
    basic_salary: Number,
    working_hours: Number,
    deletedAt: { type: Date, default: Date.now }, // Timestamp when the employee was deleted
}, { collection: 'deletedemployees' });

module.exports = mongoose.model("DeletedEmployee", deletedEmployeeSchema);
