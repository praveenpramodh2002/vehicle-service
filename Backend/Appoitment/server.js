// server.js (Modified)
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (Only use if it's a different database. If the same, remove this part)
const URL = 'mongodb+srv://praveenpramodh2002:Praveengamage@cluster0.oxfpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection successful!"))
  .catch((error) => console.error("MongoDB Connection error:", error));

// Import routes
const customerRouter = require("./routes/customer.js");
const serviceRouter = require("./routes/service.js");
const bookingRouter = require("./routes/booking.js");

// Export routes to be used in the main server.js
module.exports = {
  customerRouter,
  serviceRouter,
  bookingRouter
};
