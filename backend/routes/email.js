const express = require('express');
const router = express.Router();
const { sendQuoteEmail } = require('../utils/email');

// Send quote email to admin
router.post('/send-quote-email', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'pickupLocation', 'dropoffLocation', 'date', 'time', 'adults'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Send email
    const result = await sendQuoteEmail(formData);
    
    res.status(200).json({
      success: true,
      message: 'Quote request sent successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error in send-quote-email route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send quote request',
      error: error.message
    });
  }
});

module.exports = router;
