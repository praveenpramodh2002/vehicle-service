//DeletedSupplierModel
const mongoose = require('mongoose');

const deletedSupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  product: { type: String, required: true },
  deletedAt: { type: Date, default: Date.now }, // Set the deletedAt date to now
}, { timestamps: true });

const DeletedSupplier = mongoose.model('DeletedSupplier', deletedSupplierSchema);

module.exports = DeletedSupplier;
