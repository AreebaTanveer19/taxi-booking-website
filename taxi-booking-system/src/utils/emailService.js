// Email service for sending quote requests using nodemailer backend
export const sendQuoteEmail = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/email/send-quote-email', {
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
