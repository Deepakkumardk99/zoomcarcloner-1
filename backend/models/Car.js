const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  fuelType: { type: String, required: true },
  seatType: { type: Number, required: true },
  carType: { type: String, required: true },
  transmission: { type: String, required: true },
});

const Car = mongoose.model("Car", CarSchema);
module.exports = Car;
