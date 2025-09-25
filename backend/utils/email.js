const nodemailer = require('nodemailer');

// Create transporter function
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send quote email to admin and user
const sendQuoteEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: 'New Quote Request from Taxi Booking Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">New Quote Request</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Personal Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Trip Details</h3>
            <p><strong>Pickup Location:</strong> ${formData.pickupLocation}</p>
            <p><strong>Drop-off Location:</strong> ${formData.dropoffLocation}</p>
            <p><strong>Date:</strong> ${formData.date}</p>
            <p><strong>Time:</strong> ${formData.time}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Passenger Information</h3>
            <p><strong>Adults:</strong> ${formData.adults}</p>
            <p><strong>Kids (Under 4 years):</strong> ${formData.kidsUnder4 || '0'}</p>
            <p><strong>Kids (5-8 years):</strong> ${formData.kids5to8 || '0'}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Luggage Information</h3>
            <p><strong>Small Luggage:</strong> ${formData.smallLuggage || '0'}</p>
            <p><strong>Large Luggage:</strong> ${formData.largeLuggage || '0'}</p>
          </div>
          
          ${formData.additionalInfo ? `
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Additional Information</h3>
            <p>${formData.additionalInfo}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>This quote request was submitted from the taxi booking website.</strong>
            </p>
          </div>
        </div>
      `
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Thank You for Your Quote Request - Horizon Chauffeurs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Thank You for Your Quote Request!</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Dear ${formData.name},</h3>
            <p>Thank you for requesting a personalized quote from Horizon Chauffeurs. We have received your request and will get back to you shortly with a competitive price for your trip.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Your Trip Details</h3>
            <p><strong>Pickup Location:</strong> ${formData.pickupLocation}</p>
            <p><strong>Drop-off Location:</strong> ${formData.dropoffLocation}</p>
            <p><strong>Date:</strong> ${formData.date}</p>
            <p><strong>Time:</strong> ${formData.time}</p>
            <p><strong>Passengers:</strong> ${formData.adults} adults${formData.kidsUnder4 ? `, ${formData.kidsUnder4} kids (0-4)` : ''}${formData.kids5to8 ? `, ${formData.kids5to8} kids (5-8)` : ''}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>What happens next?</strong><br>
              Our team will review your request and send you a detailed quote within 24 hours.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #333;">
              <strong>Need immediate assistance?</strong><br>
              Call us at: <a href="tel:+1234567890" style="color: #667eea;">+1 (234) 567-890</a><br>
              Email us at: <a href="mailto:info@horizonchauffeurs.com" style="color: #667eea;">info@horizonchauffeurs.com</a>
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
            <p>Best regards,<br><strong>The Horizon Chauffeurs Team</strong></p>
          </div>
        </div>
      `
    };

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    
    console.log('Admin email sent successfully:', adminResult.messageId);
    console.log('User confirmation email sent successfully:', userResult.messageId);
    
    return { 
      success: true, 
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId
    };
    
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
};

// Send booking confirmation email
const sendBookingConfirmation = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingData.email,
      cc: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: 'Booking Confirmation - Horizon Chauffeurs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Booking Confirmation</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${bookingData._id}</p>
            <p><strong>Service Type:</strong> ${bookingData.serviceType}</p>
            <p><strong>Pickup:</strong> ${bookingData.pickup}</p>
            <p><strong>Drop-off:</strong> ${bookingData.dropoff}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Vehicle:</strong> ${bookingData.vehicleType}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>Thank you for booking with Horizon Chauffeurs!</strong>
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    throw error;
  }
};

module.exports = {
  sendQuoteEmail,
  sendBookingConfirmation
};
