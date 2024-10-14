const express = require("express");
const router = express.Router();
const EmployeeController = require("../Controllers/EmployeeController");

// Route for getting employee count
router.get('/count', EmployeeController.getEmployeeCount);

// Route for fetching all deleted employees
router.get('/deletedemployees', EmployeeController.getAllDeletedEmployees);

// Routes for basic employee operations
router.get("/", EmployeeController.getAllEmployees);               // Fetch all employees
router.post("/", EmployeeController.addEmployees);                 // Add a new employee
router.get("/:id", EmployeeController.getById);                    // Fetch employee by ID
router.put("/:id", EmployeeController.updateEmployee);             // Update employee by ID
router.delete("/:id", EmployeeController.deleteEmployee);          // Delete employee by ID

// Route to fetch employee by NIC
router.get('/nic/:nic', EmployeeController.getByNIC);

module.exports = router;
