// ProductRequestControl.js
const ProductRequest = require('./ProductRequestModel');

// Function to create a product request
const createProductRequest = async (req, res) => {
    try {
      const newProductRequest = new ProductRequest({
        productName: req.body.productName,
        requestedBy: req.body.requestedBy,
        status: req.body.status
      });
  
      await newProductRequest.save();
      res.status(201).json({ message: 'Product request created successfully', productRequest: newProductRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product request', error });
    }
  };


const getAllProductRequests = async (req, res) => {
  try {
    const requests = await ProductRequest.find({ status: 'Pending' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product requests' });
  }
};

const markAsSupplied = async (req, res) => {
    try {
      const { id } = req.params;
      const request = await ProductRequest.findByIdAndUpdate(id, { status: 'Supplied' }, { new: true });
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.json({ message: 'Marked as supplied', request });
    } catch (error) {
      res.status(500).json({ message: 'Error updating request', error });
    }
  };
  

module.exports = { getAllProductRequests, markAsSupplied , createProductRequest};
