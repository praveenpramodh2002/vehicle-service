const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// Create a new booking
router.post("/", async (req, res) => {
  const { services, totalPrice, totalTime, bookingDate, bookingTime } = req.body;

  if (!services || !totalPrice || !totalTime || !bookingDate || !bookingTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate bookingDate
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 3); // Set max date to three months from today

  // Parse bookingDate to a Date object
  const selectedDate = new Date(bookingDate);

  if (selectedDate < today || selectedDate > maxDate) {
    return res.status(400).json({
      message: "Booking date must be today or within the next three months.",
    });
  }

  try {
    const newBooking = new Booking({
      services,
      totalPrice,
      totalTime,
      bookingDate,
      bookingTime,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define available time slots
const availableTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM"
];

// Function to get available times for a given date
const getAvailableTimesForDate = async (date) => {
  const bookings = await Booking.find({ bookingDate: date }).select("bookingTime");

  // Extract booked times from existing bookings
  const bookedTimes = bookings.map(booking => booking.bookingTime);

  // Filter available times by removing booked times
  return availableTimeSlots.filter(time => !bookedTimes.includes(time));
};

// Get available times for a specific date
router.get("/available-times", async (req, res) => {
  const { date } = req.query;

  try {
    const availableTimes = await getAvailableTimesForDate(new Date(date));
    res.json(availableTimes);
  } catch (error) {
    console.error("Error fetching available times:", error);
    res.status(500).json({ message: "Failed to fetch available times." });
  }
});

// Get a booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a booking by ID
router.put("/:id", async (req, res) => {
  const { bookingDate, bookingTime } = req.body;

  // Ensure only date and time are updated
  const updateFields = {};
  if (bookingDate) updateFields.bookingDate = bookingDate;
  if (bookingTime) updateFields.bookingTime = bookingTime;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
