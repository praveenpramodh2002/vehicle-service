// models/booking.js

const mongoose = require("mongoose");

// Function to check if a date is today or in the future
const isDateInFutureOrToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the start of the day
  return date >= today; // Check if the date is today or in the future
};

const bookingSchema = new mongoose.Schema({
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
    validate: {
      validator: isDateInFutureOrToday,
      message: "Booking date must be today or in the future.",
    },
  },
  bookingTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
