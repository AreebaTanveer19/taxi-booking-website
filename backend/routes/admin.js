const express = require('express');
const router = express.Router();
const adminOnly = require('../utils/auth');
const Booking = require('../models/Booking');
const User = require('../models/Users');

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

module.exports = router;