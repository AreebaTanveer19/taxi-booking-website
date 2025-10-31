// Add this to your utils/email.js file

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Configure your email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER || "ahmadmahmoodworkingprojects@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "ghib xnmy hldn dugb"
  }
});

console.log('Admin email address:', process.env.EMAIL_USER);
console.log('Admin EMAIL_USER address:', process.env.EMAIL_PASSWORD);
// Admin email address - set this in your .env file
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourbusiness.com';

async function sendAdminBookingNotification(bookingData) {
  const {
    name,
    email,
    phone,
    city,
    serviceType,
    pickup,
    dropoff,
    date,
    time,
    adults,
    children,
    vehiclePreference,
    estimatedCost,
    specialRequests
  } = bookingData;

  // Create email content with customer details
  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .detail-row { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #4CAF50; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; margin-left: 10px; }
        .reply-button { 
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
        }
        .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🚗 New Booking Request</h2>
        </div>
        
        <div class="content">
          <p>A new booking request has been received. Customer details are below:</p>
          
          <div class="detail-row">
            <span class="label">Customer Name:</span>
            <span class="value">${name}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">${email}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Phone:</span>
            <span class="value">${phone}</span>
          </div>
          
          ${city ? `
          <div class="detail-row">
            <span class="label">City:</span>
            <span class="value">${city}</span>
          </div>
          ` : ''}
          
          ${serviceType ? `
          <div class="detail-row">
            <span class="label">Service Type:</span>
            <span class="value">${serviceType}</span>
          </div>
          ` : ''}
          
          ${pickup ? `
          <div class="detail-row">
            <span class="label">Pickup Location:</span>
            <span class="value">${pickup}</span>
          </div>
          ` : ''}
          
          ${dropoff ? `
          <div class="detail-row">
            <span class="label">Dropoff Location:</span>
            <span class="value">${dropoff}</span>
          </div>
          ` : ''}
          
          ${date ? `
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">${date}</span>
          </div>
          ` : ''}
          
          ${time ? `
          <div class="detail-row">
            <span class="label">Time:</span>
            <span class="value">${time}</span>
          </div>
          ` : ''}
          
          ${adults ? `
          <div class="detail-row">
            <span class="label">Adults:</span>
            <span class="value">${adults}</span>
          </div>
          ` : ''}
          
          ${children ? `
          <div class="detail-row">
            <span class="label">Children:</span>
            <span class="value">${children}</span>
          </div>
          ` : ''}
          
          ${vehiclePreference ? `
          <div class="detail-row">
            <span class="label">Vehicle Preference:</span>
            <span class="value">${vehiclePreference}</span>
          </div>
          ` : ''}
          
          ${estimatedCost ? `
          <div class="detail-row">
            <span class="label">Estimated Cost:</span>
            <span class="value">${estimatedCost}</span>
          </div>
          ` : ''}
          
          ${specialRequests ? `
          <div class="detail-row">
            <span class="label">Special Requests:</span>
            <span class="value">${specialRequests}</span>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}?subject=Re: Your Booking Request&body=Dear ${name},%0D%0A%0D%0AThank you for your booking request.%0D%0A%0D%0A" class="reply-button">
              📧 Reply to Customer
            </a>
          </div>
          
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Click the button above to reply directly to the customer via email.
          </p>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from your booking system.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ADMIN_EMAIL,
    replyTo: email, // Set customer email as reply-to
    subject: `🚗 New Booking Request from ${name}`,
    html: emailContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
}

// Export the function
module.exports = {
  sendAdminBookingNotification
};