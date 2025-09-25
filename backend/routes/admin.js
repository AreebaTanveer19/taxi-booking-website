const express = require('express');
const router = express.Router();
const adminOnly = require('../utils/auth');
const Booking = require('../models/Booking');
const User = require('../models/Users');
const VehiclePrice = require('../models/VehiclePrice');
const vehiclePriceController = require('../controllers/vehiclePriceController');
const jwt = require('jsonwebtoken');

// Admin verification endpoint
router.post('/verify', (req, res) => {
  adminOnly(req, res, () => {
    res.json({ 
      success: true, 
      message: 'Credentials verified',
      user: { username: process.env.ADMIN_USERNAME }
    });
  });
});

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && 
      password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ success: true, token });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Protected admin routes
router.use(adminOnly); // Apply to all routes below

router.get('/dashboard', (req, res) => {
  res.json({ success: true, message: 'Welcome to admin dashboard' });
});

// Get all bookings with user details
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId');
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email phone');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// Delete a booking
router.delete('/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete booking' });
  }
});

// Delete a user
router.delete('/users/:id', adminOnly, async (req, res) => {
  try {
    // First check if user has any bookings
    const bookings = await Booking.countDocuments({ userId: req.params.id });
    
    if (bookings > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete user with existing bookings' 
      });
    }
    
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, message: 'Server error deleting user' });
  }
});

// Vehicle Price Routes
router.get('/vehicle-prices', vehiclePriceController.getVehiclePrices);
router.put('/vehicle-prices/:vehicleType', vehiclePriceController.updateVehiclePrice);
router.post('/vehicle-prices/initialize', vehiclePriceController.initializeDefaultPrices);

module.exports = router;