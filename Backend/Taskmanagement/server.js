// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const vehicleRouter = require('./routes/router');

const app = express();
<<<<<<< HEAD
const PORT = 3001;
const uri = 'mongodb+srv://praveenpramodh2002:Praveengamage@cluster0.oxfpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
=======
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/vehicles'; // Ensure the database name matches your configuration
>>>>>>> add-Route

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
