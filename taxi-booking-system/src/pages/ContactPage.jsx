import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import '../styles/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <motion.section 
        className="contact-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-header-content">
          <h1 className="contact-title">Contact Us</h1>
          <div className="contact-subtitle">
            <div className="transport-icons">
              <FlightIcon className="transport-icon" />
              <DirectionsCarIcon className="transport-icon" />
              <LocalTaxiIcon className="transport-icon" />
            </div>
            <p>We're here to help you 24/7 — reach out anytime.</p>
          </div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <motion.section 
        className="contact-main"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="contact-container">
          {/* Left Column - Company Info */}
          <motion.div 
            className="contact-info"
            variants={slideInLeft}
          >
            <h2 className="info-title">Get in Touch</h2>
            <p className="info-description">
              Have questions about our services? Need to book a ride? 
              We're here to help with all your transportation needs.
            </p>
            
            <div className="contact-details">
              <motion.div className="contact-item" variants={itemVariants}>
                <div className="contact-icon">
                  <PhoneIcon />
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <a href="tel:+1234567890" className="contact-link">+1 (234) 567-890</a>
                </div>
              </motion.div>

              <motion.div className="contact-item" variants={itemVariants}>
                <div className="contact-icon">
                  <EmailIcon />
                </div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <a href="mailto:info@taxibooker.com" className="contact-link">info@taxibooker.com</a>
                </div>
              </motion.div>

              <motion.div className="contact-item" variants={itemVariants}>
                <div className="contact-icon">
                  <LocationOnIcon />
                </div>
                <div className="contact-text">
                  <h3>Office Address</h3>
                  <p>123 Business Street<br />City, State 12345<br />United States</p>
                </div>
              </motion.div>

              <motion.div className="contact-item" variants={itemVariants}>
                <div className="contact-icon">
                  <AccessTimeIcon />
                </div>
                <div className="contact-text">
                  <h3>Operating Hours</h3>
                  <p>24/7 Service Available<br />Customer Support: 8 AM - 10 PM</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            className="contact-form-container"
            variants={slideInRight}
          >
            <h2 className="form-title">Send us a Message</h2>
            
            {isSubmitted && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </motion.div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What is this about?"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Tell us how we can help you..."
                />
              </motion.div>

              <motion.button 
                type="submit" 
                className="submit-btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage; 