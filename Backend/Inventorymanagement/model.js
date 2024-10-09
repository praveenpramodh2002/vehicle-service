const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  reorderLevel: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, enum: ['Available', 'Low Stock', 'Out of Stock'], required: true },
});

const Inventory = mongoose.model('Inventory', inventorySchema); // Changed model name

module.exports = Inventory;
