// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
const PORT = 3001;
const uri = 'mongodb+srv://praveenpramodh2002:Praveengamage@cluster0.oxfpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
app.use('/api', router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
