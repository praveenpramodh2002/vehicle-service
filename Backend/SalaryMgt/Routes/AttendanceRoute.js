const express = require('express');
const router = express.Router(); // Ensure this is declared first
const { uploadAttendance, getAttendanceSummary, getAttendanceMonthly } = require('../Controllers/AttendanceController');

// Route to upload attendance data
router.post('/upload', uploadAttendance);

// Route to get attendance summary
router.get('/summary', getAttendanceSummary);
router.get('/monthly', getAttendanceMonthly);

// Export the router
module.exports = router;
