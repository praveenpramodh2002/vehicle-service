const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    nic: { type: String, required: true },
    arrivedTime: { type: String, required: true },
    departedTime: { type: String, required: true },
    date: { type: Date, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ["Present", "Absent", "Leave", "Late"]  // Ensure "Late" is included
    }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
