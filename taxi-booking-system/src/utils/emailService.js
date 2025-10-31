// Email service for sending quote requests using nodemailer backend
export const sendQuoteEmail = async (formData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send-quote-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send quote request');
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error sending quote email:', error);
    throw error;
  }
};

// Email service for sending contact form submissions
export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send contact message');
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

// Email service for sending booking confirmation emails
export const sendBookingConfirmationEmail = async (bookingData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send-booking-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    console.log('Booking confirmation response status:', response.status);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send booking confirmation');
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
};


// NEW: Email service for sending admin booking notification
export const sendAdminBookingNotification = async (bookingData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/email/send-admin-booking-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    console.log('Admin booking notification response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send admin notification');
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};


// For development/testing - logs the form data to console
export const logQuoteData = (formData) => {
  console.log('Quote Form Data:', formData);
  console.log('Email would be sent to: owner@yourdomain.com');
  
  // You can also save to localStorage for testing
  const quotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
  quotes.push({
    ...formData,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('quoteRequests', JSON.stringify(quotes));
  
  return Promise.resolve({ success: true, message: 'Quote data logged for testing' });
};
