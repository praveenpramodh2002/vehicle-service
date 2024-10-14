const Supplier = require("./SupplierModel");
const DeletedSupplier = require("./DeletedSupModel");

// Get all suppliers
const getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();
        if (!suppliers.length) {
            return res.status(404).json({ message: "No suppliers found" });
        }
        return res.status(200).json({ suppliers });
    } catch (err) {
        console.error("Error fetching suppliers:", err);
        return res.status(500).json({ message: "Error fetching suppliers", error: err.message });
    }
};

// Add a new supplier
const addSuppliers = async (req, res, next) => {
    const { name, email, phone, address, product } = req.body;

    try {
        const newSupplier = new Supplier({ name, email, phone, address, product });
        await newSupplier.save();
        return res.status(201).json({ supplier: newSupplier });
    } catch (err) {
        console.error("Error adding supplier:", err);
        return res.status(500).json({ message: "Unable to add supplier", error: err.message });
    }
};

// Get supplier by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        return res.status(200).json({ supplier });
    } catch (err) {
        console.error("Error fetching supplier by ID:", err);
        return res.status(500).json({ message: "Error fetching supplier by ID", error: err.message });
    }
};

// Update supplier
const updateSupplier = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, phone, address, product } = req.body;

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            address,
            product,
        }, { new: true }); // Return the updated document

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Unable to update supplier" });
        }

        return res.status(200).json({ supplier: updatedSupplier });
    } catch (err) {
        console.error("Error updating supplier:", err);
        return res.status(500).json({ message: "Error updating supplier", error: err.message });
    }
};

// Delete supplier and move to DeletedSuppliers
const deleteSupplier = async (req, res, next) => {
    const id = req.params.id;

    try {
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        const deletedSupplier = new DeletedSupplier({
            name: supplier.name,
            email: supplier.email,
            phone: supplier.phone,
            address: supplier.address,
            product: supplier.product,
        });

        await deletedSupplier.save();
        await Supplier.findByIdAndDelete(id);

        return res.status(200).json({ message: "Supplier deleted and moved to Deleted Suppliers" });
    } catch (err) {
        console.error("Error during deletion:", err);
        return res.status(500).json({ message: "Error during deletion", error: err.message });
    }
};

// Fetch all deleted suppliers
const getDeletedSuppliers = async (req, res, next) => {
    try {
        const deletedSuppliers = await DeletedSupplier.find();
        if (!deletedSuppliers.length) {
            return res.status(404).json({ message: "No deleted suppliers found" });
        }
        return res.status(200).json({ suppliers: deletedSuppliers });
    } catch (err) {
        console.error("Error fetching deleted suppliers:", err);
        return res.status(500).json({ message: "Error fetching deleted suppliers", error: err.message });
    }
};

exports.getDeletedSuppliers = getDeletedSuppliers;
exports.getAllSuppliers = getAllSuppliers;
exports.addSuppliers = addSuppliers;
exports.getById = getById;
exports.updateSupplier = updateSupplier;
exports.deleteSupplier = deleteSupplier;
