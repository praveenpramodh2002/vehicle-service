const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const vehicleRouter = require('./router');

const app = express();
const PORT = 3002;
const MONGO_URI = 'mongodb://localhost:27017/VehicleDB';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api', vehicleRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
