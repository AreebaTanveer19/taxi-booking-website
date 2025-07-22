const express = require('express');
const router = express.Router();
const adminOnly = require('../utils/auth');

// Example admin-only route
router.get('/secret', adminOnly, (req, res) => {
  res.json({ success: true, message: 'Welcome, admin! This is a protected admin route.' });
});

module.exports = router; 