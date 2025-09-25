const VehiclePrice = require('../models/VehiclePrice');

// Get all vehicle prices
exports.getVehiclePrices = async (req, res) => {
  try {
    const prices = await VehiclePrice.find({}).sort('vehicleType');
    res.status(200).json({ success: true, data: prices });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Update vehicle price
exports.updateVehiclePrice = async (req, res) => {
  try {
    const { vehicleType } = req.params;
    const { baseFare, perKmRate, hourlyRate, baseDistance } = req.body;

    // Validate input
    if (!baseFare || !perKmRate || !hourlyRate || !baseDistance) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const price = await VehiclePrice.findOneAndUpdate(
      { vehicleType },
      { 
        baseFare: parseFloat(baseFare),
        perKmRate: parseFloat(perKmRate),
        hourlyRate: parseFloat(hourlyRate),
        baseDistance: parseFloat(baseDistance),
        lastUpdated: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!price) {
      return res.status(404).json({ success: false, error: 'Vehicle type not found' });
    }

    res.status(200).json({ success: true, data: price });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Initialize default prices (admin only)
exports.initializeDefaultPrices = async (req, res) => {
  try {
    await VehiclePrice.initializeDefaults();
    const prices = await VehiclePrice.find({}).sort('vehicleType');
    res.status(200).json({ success: true, data: prices });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
