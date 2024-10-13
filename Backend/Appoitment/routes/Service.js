const express = require("express");
const router = express.Router();
const Service = require("../models/service")

// Create a new service
router.post("/", async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all services
router.get("/", async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a service by ID
router.get("/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a service by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedService) return res.status(404).json({ message: "Service not found" });
        res.status(200).json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a service by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: "Service not found" });
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
