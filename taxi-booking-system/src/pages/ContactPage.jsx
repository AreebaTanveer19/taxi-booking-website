import React from 'react';
import ContactForm from '../components/ContactForm';
import '../styles/ContactPage.css';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import contactImg from '../assets/contact.png';

const CONTACT_INFO = {
  phone: '0123 456 789',
  email: 'info@abhinaamnipta.au',
  hours: 'Mon-Sun: 6:00am - 11:00pm',
  address: 'Sydney, NSW, Australia',
};

const ContactPage = () => {
  // Replace SYDNEY_MAP_URL with Google Static Maps API (no key)
  const SYDNEY_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap?center=Sydney,Australia&zoom=12&size=400x200&maptype=roadmap&markers=color:black%7Clabel:S%7CSydney';
  return (
    <>
    {/* Hero Section */}
    <section className="about-hero" style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.1),rgba(24,24,24,0.1)), url(${contactImg})` }}>
      {/* No text or buttons, just the background image */}
    </section>
    <div className="contact-page-root">
      <div className="contact-page-container">
        <div className="contact-form-section">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtext">Have a question or want to book a ride? Fill out the form and our team will get back to you promptly.</p>
          <ContactForm />
        </div>
        <div className="contact-info-section">
          <div className="contact-info-card">
            <h3 className="info-title">Contact Information</h3>
            <div className="info-item"><span className="info-label">Phone:</span> <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a></div>
            <div className="info-item"><span className="info-label">Email:</span> <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></div>
            <div className="info-item"><span className="info-label">Business Hours:</span> {CONTACT_INFO.hours}</div>
            <div className="info-item"><span className="info-label">Address:</span> {CONTACT_INFO.address}</div>
          </div>
          <div className="contact-map-card booking-map-embed">
            <iframe
              title="Sydney Map"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: '10px' }}
              loading="eager"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106312.4752229376!2d151.043255!3d-33.867487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae3e8b2c7e9b%3A0x5017d681632c5a0!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sau!4v1689999999999!5m2!1sen!2sau"
              ></iframe>
          </div>
        </div>
      </div>
      
    </div>
    {/* Footer */}
    <Footer />
    </>
  );
};

export default ContactPage;
