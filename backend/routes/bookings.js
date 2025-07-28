const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/Users');
const adminOnly = require('../utils/auth');
const mongoose = require('mongoose'); // mongoose is required for transactions

router.post('/book', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Extract user details
    const { name, email, phone, ...rideDetails } = req.body;

    // Input validation
    if (!name || !email || !phone) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required.' });
    }

    // Find or create user with transaction
    let user = await User.findOne({ 
      $or: [{ email }, { phone }]
    }).session(session);
    
    if (!user) {
      user = new User({ name, email, phone });
      await user.save({ session });
    }

    // Create booking
    const bookingData = { ...rideDetails, userId: user._id };
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save({ session });

    await session.commitTransaction();
    res.status(201).json({ success: true, message: 'Booking saved', booking: savedBooking, user });
  } catch (err) {
    await session.abortTransaction();
    
    if (err.code === 11000) { // Duplicate key error
      // Retry with existing user
      try {
        const user = await User.findOne({ 
          $or: [{ email: req.body.email }, { phone: req.body.phone }]
        });
        
        if (user) {
          const bookingData = { ...req.body, userId: user._id };
          const newBooking = new Booking(bookingData);
          const savedBooking = await newBooking.save();
          return res.status(201).json({ success: true, message: 'Booking saved', booking: savedBooking, user });
        }
      } catch (retryErr) {
        console.error('Retry failed:', retryErr);
      }
    }
    
    console.error('Booking error:', err);
    res.status(500).json({ success: false, message: 'Error saving booking', error: err.message });
  } finally {
    session.endSession();
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
