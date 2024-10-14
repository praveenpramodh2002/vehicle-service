//SupplierRoutes
const express = require('express');
const router = express.Router();

const {
    getAllSuppliers,
    addSuppliers,
    getById,
    updateSupplier,
    deleteSupplier,
} = require('./SupplierControl'); // Ensure this path is correct

// Define your routes
router.get('/', getAllSuppliers); // Route to get all suppliers
router.post('/', addSuppliers); // Route to add a new supplier
router.get('/:id', getById); // Route to get a supplier by ID
router.put('/:id', updateSupplier); // Route to update a supplier by ID
router.delete('/:id', deleteSupplier); // Route to delete a supplier by ID

module.exports = router;
