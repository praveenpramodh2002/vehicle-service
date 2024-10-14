// PackageRoutes.js
const express = require("express");
const router = express.Router();
const packageController = require("../Controllers/PackageController"); // Import the controller


// Define routes
router.get("/", packageController.getAllPackages); // GET request to fetch all packages
router.post("/", packageController.createPackage); // POST request to create a new package
router.get("/:id", packageController.getById);
router.put("/:id", packageController.updatePackages);
router.delete("/:id", packageController.deletePackages);

// Export the router
module.exports = router;
