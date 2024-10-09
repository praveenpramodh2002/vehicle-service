const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  iId: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: String },
  employee: { type: String },
  type: { type: String },
  date: { type: Date },
  status: { type: String },
});

const Inventory = mongoose.model('Inventory', inventorySchema); // Changed model name

module.exports = Inventory;
