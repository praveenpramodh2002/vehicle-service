const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Vehicle = require('../models/vehicle'); // Missing import in the original code
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');

// Utility function to handle errors
function handleError(res, error, statusCode = 500, message = error.message) {
  console.error(error);
  res.status(statusCode).json({ message });
}

// Utility function to set customer fields
function setCustomerFields(customer, data) {
  if (data.firstName != null) customer.firstName = data.firstName;
  if (data.lastName != null) customer.lastName = data.lastName;
  if (data.email != null) customer.email = data.email;
  if (data.phone != null) customer.phone = data.phone;
  if (data.address != null) {
    customer.address.street = data.address.street || customer.address.street;
    customer.address.city = data.address.city || customer.address.city;
  }
  if (data.nic != null) customer.nic = data.nic;
  if (data.birthday != null) customer.birthday = data.birthday;
}

// GET all customers (protected route)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    handleError(res, error);
  }
});

// GET a single customer by ID
router.get('/:id', authenticateToken, getCustomer, (req, res) => {
  res.json(res.customer);
});

// POST: Create a new customer
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const customer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
      },
      nic: req.body.nic,
      birthday: req.body.birthday,
      password: hashedPassword,
    });

    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    handleError(res, error, 400);
  }
});

// PATCH: Update a customer by ID
router.patch('/:id', authenticateToken, getCustomer, async (req, res) => {
  try {
    setCustomerFields(res.customer, req.body);

    if (req.body.password != null) {
      res.customer.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    handleError(res, error, 400);
  }
});

// DELETE a customer by ID
router.delete('/:id', authenticateToken, getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: 'Deleted Customer' });
  } catch (error) {
    handleError(res, error);
  }
});


// POST: Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { customerId: customer._id, email: customer.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1h' }
    );

    // Set the customerId in the cookie (with the token)
    res.cookie('customerId', customer._id, { httpOnly: true, secure: true, sameSite: 'Strict' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// GET: Get the logged-in customer profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.customerId);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    handleError(res, error);
  }
});

// GET: Get vehicles by customer ID
router.get('/customer/:customerId', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ customer: req.params.customerId });
    res.status(200).json(vehicles);
  } catch (err) {
    handleError(res, err);
  }
});

// Middleware to get a customer by ID
async function getCustomer(req, res, next) {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.customer = customer;
    next();
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = router;
