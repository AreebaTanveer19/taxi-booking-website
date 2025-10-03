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
      subject: 'New Quote Request from Horizon Chauffeurs',
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
              <strong>This quote request was submitted from Horizon Chauffeur website.</strong>
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
              Call us at: <a href="tel:+61 416 535 987" style="color: #667eea;">+61 416 535 987</a><br>
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
    
    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: 'New Booking Confirmation - Horizon Chauffeurs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">🚗 New Booking Confirmation</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center;">
            <h3 style="margin: 0; font-size: 24px;">Booking Confirmed!</h3>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">A new booking has been successfully submitted</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">👤 Customer Information</h3>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
            <p><strong>City:</strong> ${bookingData.city}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">📍 Trip Details</h3>
            <p><strong>Service Type:</strong> ${bookingData.serviceType}</p>
            <p><strong>Pickup Location:</strong> ${bookingData.pickup}</p>
            ${bookingData.dropoff ? `<p><strong>Drop-off Location:</strong> ${bookingData.dropoff}</p>` : ''}
            ${bookingData.additionalStop ? `<p><strong>Additional Stop:</strong> ${bookingData.additionalStop}</p>` : ''}
            ${bookingData.terminal ? `<p><strong>Terminal:</strong> ${bookingData.terminal}</p>` : ''}
            ${bookingData.airportDirection ? `<p><strong>Airport Direction:</strong> ${bookingData.airportDirection}</p>` : ''}
            <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            ${bookingData.expectedEndTime ? `<p><strong>Expected End Time:</strong> ${bookingData.expectedEndTime}</p>` : ''}
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">👥 Passenger Information</h3>
            <p><strong>Total Passengers:</strong> ${bookingData.totalPassengers}</p>
            <p><strong>Adults:</strong> ${bookingData.adults}</p>
            <p><strong>Children (0-4 years):</strong> ${bookingData.children_0_4}</p>
            <p><strong>Children (5-8 years):</strong> ${bookingData.children_5_8}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">🧳 Luggage Information</h3>
            <p><strong>Suitcases:</strong> ${bookingData.suitcases}</p>
            <p><strong>Carry On:</strong> ${bookingData.carryOn}</p>
            <p><strong>Total Luggage:</strong> ${parseInt(bookingData.suitcases || 0) + parseInt(bookingData.carryOn || 0)}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">🚗 Vehicle & Pricing</h3>
            <p><strong>Vehicle Preference:</strong> ${bookingData.vehiclePreference}</p>
            <p><strong>Estimated Cost:</strong> $${bookingData.estimatedCost}</p>
            <p><strong>Booking Method:</strong> ${bookingData.bookingMethod}</p>
          </div>
          
          ${bookingData.flightNumber || bookingData.flightTime ? `
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">✈️ Flight Information</h3>
            ${bookingData.flightNumber ? `<p><strong>Flight Number:</strong> ${bookingData.flightNumber}</p>` : ''}
            ${bookingData.flightTime ? `<p><strong>Flight Time:</strong> ${bookingData.flightTime}</p>` : ''}
          </div>
          ` : ''}
          
          ${bookingData.specialInstructions ? `
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">📝 Special Instructions</h3>
            <p style="white-space: pre-wrap;">${bookingData.specialInstructions}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>🎉 New booking confirmed!</strong><br>
              Booking ID: ${bookingData._id || 'Pending'}<br>
              Status: ${bookingData.status || 'pending'}
            </p>
          </div>
        </div>
      `
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: bookingData.email,
      subject: '🚗 Booking Confirmation - Horizon Chauffeurs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">🚗 Booking Confirmation</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center;">
            <h3 style="margin: 0; font-size: 24px;">Thank You, ${bookingData.name}!</h3>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your booking has been confirmed</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">📍 Your Trip Details</h3>
            <p><strong>Service Type:</strong> ${bookingData.serviceType}</p>
            <p><strong>Pickup Location:</strong> ${bookingData.pickup}</p>
            ${bookingData.dropoff ? `<p><strong>Drop-off Location:</strong> ${bookingData.dropoff}</p>` : ''}
            ${bookingData.additionalStop ? `<p><strong>Additional Stop:</strong> ${bookingData.additionalStop}</p>` : ''}
            ${bookingData.terminal ? `<p><strong>Terminal:</strong> ${bookingData.terminal}</p>` : ''}
            <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            ${bookingData.expectedEndTime ? `<p><strong>Expected End Time:</strong> ${bookingData.expectedEndTime}</p>` : ''}
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">👥 Passenger & Luggage</h3>
            <p><strong>Total Passengers:</strong> ${bookingData.totalPassengers}</p>
            <p><strong>Adults:</strong> ${bookingData.adults}, Children: ${parseInt(bookingData.children_0_4 || 0) + parseInt(bookingData.children_5_8 || 0)}</p>
            <p><strong>Luggage:</strong> ${bookingData.suitcases} suitcases, ${bookingData.carryOn} carry-on</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">🚗 Vehicle & Cost</h3>
            <p><strong>Vehicle:</strong> ${bookingData.vehiclePreference}</p>
            <p><strong>Total Cost:</strong> <span style="color: #28a745; font-size: 18px; font-weight: bold;">$${bookingData.estimatedCost}</span></p>
          </div>
          
          ${bookingData.flightNumber ? `
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">✈️ Flight Details</h3>
            <p><strong>Flight Number:</strong> ${bookingData.flightNumber}</p>
            ${bookingData.flightTime ? `<p><strong>Flight Time:</strong> ${bookingData.flightTime}</p>` : ''}
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>🎉 What's Next?</strong><br>
              Our team will contact you shortly to confirm all details and provide your driver information.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #333;">
              <strong>Need immediate assistance?</strong><br>
              Call us at: <a href="tel:+61416535987" style="color: #667eea;">+61 416 535 987</a><br>
              Email us at: <a href="mailto:Info@horizonchauffeurs.com.au" style="color: #667eea;">Info@horizonchauffeurs.com.au</a>
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">Booking ID: ${bookingData._id || 'Pending'}</p>
            <p style="margin: 5px 0;">Status: ${bookingData.status || 'pending'}</p>
            <p style="margin: 10px 0 0 0;">Best regards,<br><strong>The Horizon Chauffeurs Team</strong></p>
          </div>
        </div>
      `
    };

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    
    console.log('Admin booking confirmation email sent successfully:', adminResult.messageId);
    console.log('User booking confirmation email sent successfully:', userResult.messageId);
    
    return { 
      success: true, 
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId
    };
    
  } catch (error) {
    console.error('Error sending booking confirmation emails:', error);
    throw error;
  }
};

// Send contact form email
// Send quote request from booking form
const sendQuoteRequest = async (formData) => {
  try {
    const transporter = createTransporter();
    
    // Format date and time
    const formattedDate = formData.date instanceof Date 
      ? formData.date.toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : formData.date;
    
    const formattedTime = formData.time instanceof Date
      ? formData.time.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
      : formData.time;

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: `New Quote Request - ${formData.name} - ${formData.vehiclePreference || 'Vehicle'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📋 New Quote Request</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">👤 Customer Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">📍 Trip Details</h3>
            <p><strong>Pickup:</strong> ${formData.pickup}</p>
            <p><strong>Drop-off:</strong> ${formData.dropoff || 'Not specified'}</p>
            ${formData.additionalStop ? `<p><strong>Additional Stop:</strong> ${formData.additionalStop}</p>` : ''}
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            ${formData.expectedEndTime ? `<p><strong>Expected End Time:</strong> ${formData.expectedEndTime}</p>` : ''}
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">👥 Passenger Information</h3>
            <p><strong>Total Passengers:</strong> ${formData.passengers || formData.adults}</p>
            <p><strong>Adults:</strong> ${formData.adults || '1'}</p>
            <p><strong>Children (0-4 years):</strong> ${formData.children_0_4 || '0'}</p>
            <p><strong>Children (5-8 years):</strong> ${formData.children_5_8 || '0'}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">🚗 Vehicle Preference</h3>
            <p><strong>Selected Vehicle:</strong> ${formData.vehiclePreference || 'Not specified'}</p>
          </div>
          
          ${formData.specialInstructions ? `
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">📝 Special Instructions</h3>
            <p>${formData.specialInstructions}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>This quote request was submitted from the booking form on Horizon Chauffeurs website.</strong>
            </p>
          </div>
        </div>
      `
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Your Quote Request - Horizon Chauffeurs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Thank You for Your Quote Request!</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Dear ${formData.name || 'Valued Customer'},</h3>
            <p>Thank you for requesting a quote from Horizon Chauffeurs. We've received your request and our team is working on providing you with the best possible rate for your transportation needs.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Your Request Details</h3>
            <p><strong>Pickup:</strong> ${formData.pickup}</p>
            <p><strong>Drop-off:</strong> ${formData.dropoff || 'Not specified'}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Vehicle:</strong> ${formData.vehiclePreference || 'To be determined'}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>What happens next?</strong><br>
              Our team will review your request and get back to you with a personalized quote within 24 hours.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #333;">
              <strong>Need immediate assistance?</strong><br>
              Call us at: <a href="tel:+61416535987" style="color: #667eea;">+61 416 535 987</a><br>
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
    
    console.log('Admin quote request email sent successfully:', adminResult.messageId);
    console.log('User confirmation email sent successfully:', userResult.messageId);
    
    return { 
      success: true, 
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId
    };
    
  } catch (error) {
    console.error('Error sending quote request emails:', error);
    throw error;
  }
};

const sendContactEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: 'New Contact Form Submission - Horizon Chauffeurs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>This contact form was submitted from the Horizon Chauffeurs website.</strong>
            </p>
          </div>
        </div>
      `
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Thank You for Contacting Us - Horizon Chauffeurs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Thank You for Contacting Us!</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Dear ${formData.name},</h3>
            <p>Thank you for contacting Horizon Chauffeurs. We have received your message and will get back to you shortly.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Your Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #0066cc;">
              <strong>What happens next?</strong><br>
              Our team will review your message and respond to you within 24 hours.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #333;">
              <strong>Need immediate assistance?</strong><br>
              Call us at: <a href="tel:+61416535987" style="color: #667eea;">+61 416 535 987</a><br>
              Email us at: <a href="mailto:Info@horizonchauffeurs.com.au" style="color: #667eea;">Info@horizonchauffeurs.com.au</a>
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
    
    console.log('Admin contact email sent successfully:', adminResult.messageId);
    console.log('User confirmation email sent successfully:', userResult.messageId);
    
    return { 
      success: true, 
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId
    };
    
  } catch (error) {
    console.error('Error sending contact emails:', error);
    throw error;
  }
};

module.exports = {
  sendQuoteEmail,
  sendBookingConfirmation,
  sendContactEmail,
  sendQuoteRequest
};
