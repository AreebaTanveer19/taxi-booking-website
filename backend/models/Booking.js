const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  bookingMethod: String,
  city: String,
  serviceType: String,
  terminal: String,
  airportDirection: String,
  flightNumber: String,
  flightTime: String,
  
  // Passenger information
  passengers: { type: Number, default: 1 },
  adults: { type: Number, default: 1 },
  children_0_4: { type: Number, default: 0 },
  children_5_8: { type: Number, default: 0 },
  
  // Luggage information
  suitcases: { type: Number, default: 0 },
  carryOn: { type: Number, default: 0 },
  
  // Booking details
  specialInstructions: String,
  paymentMethod: String,
  nameOnCard: String,
  cardType: String,
  expiryMonth: String,
  expiryYear: String,
  termsAccepted: Boolean,
  vehiclePreference: String,
  date: String,
  time: String,
  expectedEndTime: String,
  
  pickup: String,
  dropoff: String,
  additionalStop: String,
  distance: String,
  estimatedCost: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
