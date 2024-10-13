const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken"); // Assuming you have this middleware

// Middleware to fetch vehicle by ID
async function getVehicle(req, res, next) {
    let vehicle;
    try {
        vehicle = await Vehicle.findById(req.params.id).populate("customer");
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.vehicle = vehicle;
    next();
}

// Helper function to authorize vehicle owner
function authorizeCustomer(req, res, next) {
    if (res.vehicle.customer._id.toString() !== req.user.customerId) {
        return res.status(403).json({ message: "Access forbidden" });
    }
    next();
}

// @route   POST /vehicle
// @desc    Create a new vehicle
// @access  Protected
router.post("/", authenticateToken, async (req, res) => {
    const { make, model, year, licensePlate } = req.body;
    const customer = req.user.customerId; // Assuming customer ID comes from the authenticated user

    try {
        const newVehicle = new Vehicle({
            make,
            model,
            year,
            licensePlate,
            customer
        });

        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   GET /vehicle
// @desc    Get all vehicles
// @access  Protected
router.get("/", authenticateToken, async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate("customer");
        res.status(200).json(vehicles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /vehicle/:id
// @desc    Get a vehicle by ID
// @access  Protected
router.get("/:id", authenticateToken, getVehicle, authorizeCustomer, (req, res) => {
    res.status(200).json(res.vehicle);
});

// @route   PUT /vehicle/:id
// @desc    Update a vehicle by ID
// @access  Protected
router.put("/:id", authenticateToken, getVehicle, authorizeCustomer, async (req, res) => {
    const { make, model, year, licensePlate } = req.body;

    if (make) res.vehicle.make = make;
    if (model) res.vehicle.model = model;
    if (year) res.vehicle.year = year;
    if (licensePlate) res.vehicle.licensePlate = licensePlate;

    try {
        const updatedVehicle = await res.vehicle.save();
        res.status(200).json(updatedVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /vehicle/:id
// @desc    Delete a vehicle by ID
// @access  Protected
router.delete("/:id", authenticateToken, getVehicle, authorizeCustomer, async (req, res) => {
    try {
        await res.vehicle.remove();
        res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
