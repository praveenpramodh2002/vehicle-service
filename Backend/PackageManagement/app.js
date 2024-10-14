const express = require("express");
const mongoose = require("mongoose");
const router99 = require("./Routes/PackagesRoutes.js");
const app = express(); // Initialize express app
const cors = require("cors");
// Middleware
app.use(express.json());
app.use(cors());
app.use("/packages", router);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sanjula:sanjula@sanjula-itp.lltnq.mongodb.net/?retryWrites=true&w=majority&appName=sanjula-itp"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));



