const express = require('express');
const router = express.Router();
const { sendQuoteEmail, sendBookingConfirmation, sendContactEmail, sendQuoteRequest } = require('../utils/email');

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

// Send contact form email
router.post('/send-contact-email', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Send email
    const result = await sendContactEmail(formData);
    
    res.status(200).json({
      success: true,
      message: 'Contact message sent successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error in send-contact-email route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send contact message',
      error: error.message
    });
  }
});

// Send booking confirmation email
router.post('/send-booking-confirmation', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'city', 'serviceType', 'pickup', 'date', 'time', 'vehiclePreference', 'estimatedCost'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Send booking confirmation emails
    const result = await sendBookingConfirmation(bookingData);
    
    res.status(200).json({
      success: true,
      message: 'Booking confirmation sent successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error in send-booking-confirmation route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send booking confirmation',
      error: error.message
    });
  }
});

// Handle quote request from booking form
router.post('/send-quote-request', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'pickup', 'vehiclePreference'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Send quote request emails
    const result = await sendQuoteRequest(formData);
    
    res.status(200).json({
      success: true,
      message: 'Quote request sent successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error in send-quote-request route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send quote request',
      error: error.message
    });
  }
});

module.exports = router;
