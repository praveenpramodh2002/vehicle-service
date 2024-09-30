const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router1 = require('./Taskmanagement/router'); // Ensure the path is correct

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

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

// Use Router
app.use('/api', router1);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(port, host, () => {
    console.log(`Node server is listening on http://${host}:${port}`);
});
