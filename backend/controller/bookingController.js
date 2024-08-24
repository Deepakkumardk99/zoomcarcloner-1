
const Booking = require("../models/Booking");
const asyncHandler = require("express-async-handler");
// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
  const { carId, startDate, endDate, totalPrice } = req.body;

  // Check if the car is already booked for the requested dates
  const overlappingBooking = await Booking.findOne({
    carId,
    $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
  });

  if (overlappingBooking) {
    return res.status(400).json({
      message: "Car is already booked for the selected dates",
    });
  }

  // If no overlap, create the booking
  const booking = new Booking({
    car: carId,
    user: req.user._id,
    startDate,
    endDate,
    totalPrice,
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});





module.exports = { createBooking  };
