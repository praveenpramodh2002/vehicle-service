const express = require('express');
const router = express.Router();
const { generatePaySheet, getPaySheetByNIC } = require('../Controllers/PaySheetController');

// Route to generate a new paysheet for an employee based on NIC
router.post('/generate', generatePaySheet);

// Route to get a paysheet by NIC
router.get('/:nic', getPaySheetByNIC);

module.exports = router;
