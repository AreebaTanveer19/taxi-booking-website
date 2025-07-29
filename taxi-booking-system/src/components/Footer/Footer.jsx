import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube,
  FaCar, FaShieldAlt, FaCrown, FaHeadset
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h3 className="footer-logo">Horizon Chauffeurs</h3>
          <p className="footer-text">
            Premium chauffeur services with luxury vehicles for all your transportation needs. 
            Experience comfort, reliability, and elegance with every ride.
          </p>
          
          <div className="footer-contact">
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>Info@horizonchauffeurs.com.au</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Premium Lane, Business District</span>
            </div>
            <div className="contact-item">
              <FaClock className="contact-icon" />
              <span>24/7 Service Available</span>
            </div>
          </div>
          
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <nav>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/book">Book a Ride</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/fleet">Our Fleet</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>

        {/* Services */}
        <div className="footer-services">
          <h3 className="footer-heading">Services</h3>
          <ul className="services-list">
            <li className="service-item">
              <FaCar className="service-icon" />
              <span>Airport Transfers</span>
            </li>
            <li className="service-item">
              <FaCrown className="service-icon" />
              <span>VIP Transportation</span>
            </li>
            <li className="service-item">
              <FaShieldAlt className="service-icon" />
              <span>Executive Services</span>
            </li>
            <li className="service-item">
              <FaHeadset className="service-icon" />
              <span>24/7 Support</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p> {currentYear} Horizon Chauffeurs. All rights reserved.</p>
          
          <ul className="footer-bottom-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;