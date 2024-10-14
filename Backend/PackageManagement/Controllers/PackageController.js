// PackageController.js
const Package = require("../Model/PackageModel"); // Import the Package model

// Get all packages
const getAllPackages = async (req, res) => {
  let packages;
  try {
    packages = await Package.find(); // Fetch all packages
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }

  if (!packages || packages.length === 0) {
    return res.status(404).json({ message: "No packages found" });
  }

  return res.status(200).json({ packages });
};

// Create a new package
const createPackage = async (req, res) => {
  const { packageName, description, price, specialOffer, servicesIncluded } = req.body;

  let newPackage;
  try {
    newPackage = new Package({
      packageName,
      description,
      price,
      specialOffer,
      servicesIncluded,
    });

    await newPackage.save(); // Save the new package to the database
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create package" });
  }

  return res.status(201).json({ newPackage });
};


// Get package by ID

const mongoose = require("mongoose");
const getById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid package ID format" });
  }



  let package; // Singular variable

  try {
    package = await Package.findById(id); // Fetch the package by ID
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }

  // If no package is found
  if (!package) {
    return res.status(404).json({ message: "No package found with this ID" });
  }

  // Return the found package
  return res.status(200).json({ package });
};




//Update package details

const updatePackages = async (req, res, next) => {
  const id = req.params.id; // Corrected typo
  const { packageName, description, price, specialOffer, servicesIncluded } = req.body;

  let package;
  try {
    // Find the package by ID and update it
    package = await Package.findByIdAndUpdate(
      id,
      {
        packageName,
        description,
        price,
        specialOffer,
        servicesIncluded,

        
      },
      { new: true } // Return the updated package
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }

  if (!package) {
    return res.status(404).json({ message: "Unable to update package details" });
  }

  // Return the updated package
  return res.status(200).json({ package });
};


const deletePackages = async (req, res, next) => {
  const id = req.params.id;
  let package;

  try {
    package = await Package.findByIdAndDelete(id); // Correct method name
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }

  if (!package) {
    return res.status(404).json({ message: "Unable to delete package" });
  }

  return res.status(200).json({ message: "Package deleted successfully", package });
};









// Export the functions
exports.getAllPackages = getAllPackages;
exports.createPackage = createPackage;
exports.getById = getById;
exports.updatePackages = updatePackages;
exports.deletePackages=deletePackages;






