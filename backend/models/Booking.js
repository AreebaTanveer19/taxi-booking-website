const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  bookingMethod: String,
  city: String,
  serviceType: String,
  flightNumber: String,
  flightTime: String,
  luggage: String,
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
  passengers: Number,
  babySeats: {
    type: Number,
    default: 0
  },
  boosterSeats: {
    type: Number,
    default: 0
  },
  pickup: String,
  dropoff: String,
  distance: String,
  estimatedCost: String,
  hasChildUnder7: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
