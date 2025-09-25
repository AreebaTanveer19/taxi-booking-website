const mongoose = require('mongoose');

const vehiclePriceSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
    unique: true,
    enum: ["Executive Sedan", "Premium Sedan", "Premium SUV", "Luxury Van", "Sprinter"]
  },
  baseFare: {
    type: Number,
    required: true,
    min: 0
  },
  perKmRate: {
    type: Number,
    required: true,
    min: 0
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  baseDistance: {
    type: Number,
    required: true,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create default prices if they don't exist
vehiclePriceSchema.statics.initializeDefaults = async function() {
  const defaultPrices = [
    { vehicleType: "Executive Sedan", baseFare: 70, perKmRate: 2.5, hourlyRate: 100, baseDistance: 1 },
    { vehicleType: "Premium Sedan", baseFare: 125, perKmRate: 5.5, hourlyRate: 120, baseDistance: 5 },
    { vehicleType: "Premium SUV", baseFare: 80, perKmRate: 3, hourlyRate: 110, baseDistance: 1 },
    { vehicleType: "Luxury Van", baseFare: 110, perKmRate: 4.5, hourlyRate: 130, baseDistance: 5 },
    { vehicleType: "Sprinter", baseFare: 150, perKmRate: 6, hourlyRate: 200, baseDistance: 10 }
  ];

  for (const price of defaultPrices) {
    await this.findOneAndUpdate(
      { vehicleType: price.vehicleType },
      { $setOnInsert: price },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
};

module.exports = mongoose.model('VehiclePrice', vehiclePriceSchema);
