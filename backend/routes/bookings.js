const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/Users');
const adminOnly = require('../utils/auth');

router.post('/book', async (req, res) => {
  try {
    // Extract user details
    const { name, email, phone, ...rideDetails } = req.body;

    // Input validation
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required.' });
    }

    // Save user details
    const user = new User({ name, email, phone });
    const savedUser = await user.save();

    // Save booking/ride details with userId
    const bookingData = { ...rideDetails, userId: savedUser._id };
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

    res.status(201).json({ success: true, message: 'Booking saved', booking: savedBooking, user: savedUser });
  } catch (err) {
    console.error('Booking/User save error:', err);
    res.status(500).json({ success: false, message: 'Error saving booking', error: err.message });
  }
});

// Create a new user
router.post('/user', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, message: 'User created', user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

// Get all bookings with user info
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId');
    res.json({ success: true, bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// Example admin-only route
router.get('/admin/secret', adminOnly, (req, res) => {
  res.json({ success: true, message: 'Welcome, admin! This is a protected route.' });
});

module.exports = router;
