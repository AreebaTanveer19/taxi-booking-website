import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Info Column */}
        <div className="footer-brand">
          <h3 className="footer-logo">LUXURY RIDE</h3>
          <p className="footer-text">
            Premium chauffeur services with luxury vehicles for all your transportation needs.
          </p>
          
          <div className="footer-contact">
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <span>+1 234 567 8900</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>info@luxuryride.com</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Premium Lane, Business District</span>
            </div>
          </div>
          
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaXTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <nav>
            <ul className="footer-links">
              <li><Link to="/"><FiArrowRight /> Home</Link></li>
              <li><Link to="/book"><FiArrowRight /> Book a Ride</Link></li>
              <li><Link to="/services"><FiArrowRight /> Services</Link></li>
              <li><Link to="/fleet"><FiArrowRight /> Our Fleet</Link></li>
              <li><Link to="/contact"><FiArrowRight /> Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p> {new Date().getFullYear()} Luxury Ride. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
