const express = require('express');
const Car = require('../models/Car');
const protect = require('../middleware/auth');
const router = express.Router();

// Get all cars with optional filters
router.get("/cars", protect, async (req, res) => {
  const { price, rating, fuelType, seatType, carType, transmission } =
    req.query;
  let query = {};

  if (price) query.price = { $gte: price.min, $lte: price.max };
  if (rating) query.rating = { $in: rating };
  if (fuelType) query.fuelType = { $in: fuelType };
  if (seatType) query.seatType = { $in: seatType };
  if (carType) query.carType = { $in: carType };
  if (transmission) query.transmission = { $in: transmission };

  try {
    const cars = await Car.find(query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new car
router.post("/cars", async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      carType,
      fuelType,
      transmission,
      seatType,
      price,
      rating,
    } = req.body;

    if (
      !name ||
      !imageUrl ||
      !carType ||
      !fuelType ||
      !transmission ||
      !seatType ||
      !price ||
      !rating
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCar = new Car({
      name,
      imageUrl,
      carType,
      fuelType,
      transmission,
      seatType,
      price,
      rating,
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Delete a car
router.delete("/cars/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete car" });
  }
});

module.exports = router;
