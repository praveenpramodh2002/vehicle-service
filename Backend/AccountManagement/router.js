const express = require('express');
const Vehicle = require('./model'); 
const multer = require('multer');
const path = require('path');
const DeletedVehicle = require('./deletedModel'); 
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save to uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
    }
});

const upload = multer({ storage: storage });

// GET route to fetch all vehicles
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST route to add a vehicle
router.post('/vehicles', upload.single('vehicleimage'), async (req, res) => {
    try {
        const vehicleData = {
            ...req.body,
            vehicleimage: req.file ? req.file.path : null // Save the image path
        };
        const vehicle = new Vehicle(vehicleData);
        await vehicle.save();
        res.status(201).send(vehicle);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT route to update a vehicle
router.put('/vehicles/:id', upload.single('vehicleimage'), async (req, res) => {
    try {
        const vehicleData = {
            ...req.body,
            vehicleimage: req.file ? req.file.path : req.body.vehicleimage // Save the image path if file is updated, else keep the old image
        };
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, vehicleData, { new: true });
        if (!vehicle) return res.status(404).send('Vehicle not found');
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Store deleted vehicles temporarily in an array or a separate collection.
let deletedVehicles = [];

// Route to handle soft deletion (move to deletedVehicles array)
router.delete('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).send('Vehicle not found');
        deletedVehicles.push(vehicle); // Store deleted vehicle in a separate array
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET route to fetch all deleted vehicles
router.get('/deletedVehicles', async (req, res) => {
    try {
        const deletedVehicles = await DeletedVehicle.find();
        res.status(200).json(deletedVehicles);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to fetch deleted vehicles
router.get('/deleted-vehicles', (req, res) => {
    res.status(200).json(deletedVehicles);
});

// Route to restore a deleted vehicle
router.post('/restore-vehicle/:id', async (req, res) => {
    const vehicleId = req.params.id;
    const vehicle = deletedVehicles.find(v => v._id == vehicleId);

    if (vehicle) {
        const newVehicle = new Vehicle(vehicle);
        await newVehicle.save();
        deletedVehicles = deletedVehicles.filter(v => v._id !== vehicleId); // Remove from deleted vehicles
        res.status(200).send(newVehicle);
    } else {
        res.status(404).send('Vehicle not found in deleted list');
    }
});

// Route to permanently delete a vehicle
router.delete('/permanently-delete/:id', (req, res) => {
    const vehicleId = req.params.id;
    deletedVehicles = deletedVehicles.filter(v => v._id !== vehicleId); // Remove from deleted vehicles
    res.status(200).send({ message: 'Vehicle permanently deleted' });
});

module.exports = router;
