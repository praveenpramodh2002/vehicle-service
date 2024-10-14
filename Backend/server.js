const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router1 = require('./Taskmanagement/router'); 
const router2 = require('./AccountManagement/router'); 
const router3 = require('./Inventorymanagement/router');
const supplierRoutes = require("./SuppilerManagement/SupplierRoutes");
const deletedSupplierRoutes = require("./SuppilerManagement/DeletedSupplierRoutes");
const productRequestRoutes = require("./SuppilerManagement/ProductRequestRoutes")
const router50 = require('./PackageManagement/Routes/PackagesRoutes');

const twilio = require('twilio');

// Import routes from Appointment
const { customerRouter, serviceRouter, bookingRouter } = require('./Appoitment/server');

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}));

// Middleware for parsing URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
const uri = 'mongodb+srv://praveenpramodh2002:Praveengamage@cluster0.oxfpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Error:', error);
    }
};
connect();

// Use Routers
app.use('/api', router1); // Routes for task management
app.use('/api', router2);
app.use('/api', router3); // Routes for account management

// Add appointment routes
app.use('/customer', customerRouter);
app.use('/service', serviceRouter);
app.use('/booking', bookingRouter);

// Supplier Routes
app.use("/suppliers", supplierRoutes);
app.use("/deleted-suppliers", deletedSupplierRoutes);
app.use("/product-requests", productRequestRoutes);

//Package Routes

app.use("/packages", router50);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(port, host, () => {
    console.log(`Node server is listening on http://${host}:${port}`);
});
