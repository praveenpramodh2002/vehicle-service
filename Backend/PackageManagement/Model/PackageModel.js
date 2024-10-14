// PackageModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  packageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  specialOffer: {
    type: Number,
    required: true,
  },
  servicesIncluded: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Export the model
module.exports = mongoose.model("Package", packageSchema);
