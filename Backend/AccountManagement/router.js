// routes/router.js
const express = require('express');
const { submitVehicleData, getAllVehicles } = require('../AccountManagement/controller');

const router = express.Router();

router.post('/submit-vehicle-data', submitVehicleData);
router.get('/vehicles', getAllVehicles); // Route to fetch all vehicles

module.exports = router;
