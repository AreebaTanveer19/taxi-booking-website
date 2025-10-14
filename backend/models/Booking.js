const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  
  // User Information
  name: String,
  email: String,
  phone: String,
  
  // Trip Details
  bookingMethod: String,
  city: String,
  serviceType: String,
  terminal: String,
  airportDirection: String,
  pickup: String,
  dropoff: String,
  additionalStop: String,
  date: String,
  time: String,
  expectedEndTime: String,
  distance: String,
  
  // Flight Information
  flightNumber: String,
  flightTime: String,
  
  // Passenger information
  totalPassengers: Number,
  passengers: { type: Number, default: 1 },
  adults: { type: Number, default: 1 },
  children_0_4: { type: Number, default: 0 },
  children_5_8: { type: Number, default: 0 },
  
  // Luggage information
  suitcases: { type: Number, default: 0 },
  carryOn: { type: Number, default: 0 },
  
  // Vehicle Information
  vehiclePreference: String,
  
  // Additional Information
  specialInstructions: String,
  
  // System Information
  estimatedCost: Number,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
