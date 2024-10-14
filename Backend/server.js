const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router1 = require('./Taskmanagement/router'); // Ensure the path is correct
const router2 = require('./AccountManagement/router'); 
const router10 = require("./SalaryMgt/Routes/EmployeeRoute");
const router20 = require("./SalaryMgt/Routes/ManagerRoute");
const router30 = require("./SalaryMgt/Routes/PaySheetRoute");
const router40 = require("./SalaryMgt/Routes/AttendanceRoute");


// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
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
app.use('/api', router2); // Routes for account management

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!'); // Send a 500 status for server errors
});

// Start Server
app.listen(port, host, () => {
    console.log(`Node server is listening on http://${host}:${port}`);
});


//SalaryMGT routes
app.use("/employees", router10);
app.use("/managers", router20);
app.use("/paysheet", router30);
app.use('/attendance', router40);