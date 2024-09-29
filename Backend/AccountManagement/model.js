const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleid: { type: String, required: true },
  userid: { type: String, required: true },
  fullname: { type: String, required: true },
  nic: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, },
  address: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  vehicleno: { type: String, required: true },
  engineno: { type: String, required: true },
  chassisno: { type: String, required: true },
  condition: { type: String, required: true },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
