// controllers/vehicleController.js
const Vehicle = require('../AccountManagement/model');

// Function to handle vehicle data submission
const submitVehicleData = async (req, res) => {
  const { vehicleid, userid, fullname, nic, contact, email, address, brand, model, year, vehicleno, engineno, chassisno, condition } = req.body;

  try {
    // Validate the input
    if (!vehicleid || !userid || !fullname || !nic || !contact || !email || !address || !brand || !model || !year || !vehicleno || !engineno || !chassisno || !condition) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save the new vehicle to the database
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();

    res.status(201).json({ message: 'Vehicle data saved successfully', vehicle: newVehicle });
  } catch (error) {
    console.error('Error saving vehicle data:', error);
    res.status(500).json({ message: 'Server error while saving vehicle data' });
  }
};

// Function to get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Server error while fetching vehicles' });
  }
};

module.exports = {
  submitVehicleData,
  getAllVehicles,
};
