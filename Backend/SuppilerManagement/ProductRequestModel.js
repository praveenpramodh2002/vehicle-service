// ProductRequestModel.js
const mongoose = require('mongoose');

const productRequestSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  requestedBy: { type: String, required: true }, // For tracking who made the request
  status: { type: String, default: 'Pending' },  // 'Pending', 'Supplied'
}, { timestamps: true });

const ProductRequest = mongoose.model('ProductRequest', productRequestSchema);

module.exports = ProductRequest;
