const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  pickup: String,
  dropoff: String,
  postcode: String,
  date: String,
  time: String,
  bookingType: String,
  terminal: String,
  distance: Number,
  fare: Number,
  toll: Number,
  vehicle: Object,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 