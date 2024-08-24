const express = require("express");
const {
  createBooking,
  
} = require("../controller/bookingController");
const protect = require("../middleware/auth");
const mongoose = require("mongoose");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const router = express.Router();

// Route to create a new booking
router.post("/bookings", protect, createBooking);

router.get("/bookings/user", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car");

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
