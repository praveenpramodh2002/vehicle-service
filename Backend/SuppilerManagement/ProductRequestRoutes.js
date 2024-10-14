//ProductRequestRoutes
const express = require('express');
const router = express.Router();
const { createProductRequest, getAllProductRequests, markAsSupplied } = require('./ProductRequestControl');

// Route to create a new product request
router.post('/', createProductRequest); // Correctly reference the createProductRequest function

// Route to get all pending product requests
router.get('/', getAllProductRequests); // Adjusted to match the base path

// Route to mark a product request as supplied
router.put('/:id/supplied', markAsSupplied); // Adjusted to match the base path

module.exports = router;
