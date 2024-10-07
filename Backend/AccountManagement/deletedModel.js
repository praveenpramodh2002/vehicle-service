const mongoose = require('mongoose');

const deletedVehicleSchema = new mongoose.Schema({
    userid: String,
    fullname: String,
    nic: String,
    contact: String,
    email: String,
    address: String,
    vehicleid: String,
    brand: String,
    model: String,
    year: Number,
    vehicleno: String,
    engineno: String,
    chassisno: String,
    condition: String,
}, { timestamps: true });

module.exports = mongoose.model('DeletedVehicle', deletedVehicleSchema);
