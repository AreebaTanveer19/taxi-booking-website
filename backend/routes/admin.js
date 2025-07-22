const express = require('express');
const router = express.Router();
const adminOnly = require('../utils/auth');

// Admin login endpoint
router.post('/login', adminOnly, (req, res) => {
  res.json({ success: true, message: 'Admin login successful' });
});

// Protected admin routes
router.get('/dashboard', adminOnly, (req, res) => {
  res.json({ success: true, message: 'Welcome to admin dashboard' });
});

module.exports = router;