// DeletedSupplierRoutes.js

const express = require("express");
const router = express.Router();
const SupplierController = require("./SupplierControl");

// Route to get all Deleted Suppliers
router.get("/", SupplierController.getDeletedSuppliers);

// Optionally, you could add more routes related to deleted suppliers, like restoring a supplier or other operations, if needed.

// Example: Restore a deleted supplier
// router.put("/:id/restore", SupplierController.restoreDeletedSupplier);

module.exports = router;
