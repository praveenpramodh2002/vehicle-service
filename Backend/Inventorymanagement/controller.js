const Inventory = require('./model');

// Get all inventory items
const getInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json({ response: inventoryItems });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventory', error: error.message });
  }
};

// Add a new inventory item
const addInventory = async (req, res) => {
    try {
      const inventory = new Inventory(req.body);
      const savedInventory = await inventory.save();
  
      res.status(201).json({ message: 'Inventory item added successfully', response: savedInventory });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add inventory item', error: error.message });
    }
};

// Update an existing inventory item
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Inventory item updated successfully', response: updatedInventory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update inventory item', error: error.message });
  }
};

// Delete an inventory item
const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Inventory item deleted successfully', response: deletedInventory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete inventory item', error: error.message });
  }
};

module.exports = {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
};
