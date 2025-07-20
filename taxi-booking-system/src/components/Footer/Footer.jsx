import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaAngleRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import footImage from '../../assets/A8.png'; // Use a new car image for the footer background
import './footer.css';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: `url(${footImage})` }}
    >
      <div className="footer-container">
        <div>
          <h3 className="footer-heading">
            <span>ABHI NAE PATA</span> Chauffeurs
          </h3>
          <p className="footer-text">
            Premium taxi and chauffeur services in Sydney. Safe, reliable, and comfortable rides for all your travel needs.
          </p>
          <div className="footer-contact-info">
            <div><b>Phone:</b> <a href="tel:0123456789">0123 456 789</a></div>
            <div><b>Email:</b> <a href="mailto:info@abhinaamnipta.au">info@abhinaamnipta.au</a></div>
            <div><b>Service Area:</b> Sydney, NSW, Australia</div>
          </div>
          <div className="social-icons">
            <a href="#"><FaFacebookF size={20} /></a>
            <a href="#"><FaXTwitter size={20} /></a>
            <a href="#"><FaLinkedinIn size={20} /></a>
            <a href="#"><FaInstagram size={20} /></a>
            <a href="#"><FaYoutube size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <div className="footer-links">
            <Link to="/"> <FaAngleRight /> Home</Link>
            <Link to="/book"> <FaAngleRight /> Book a Ride</Link>
            <Link to="/services"> <FaAngleRight /> Services</Link>
            <Link to="/fleet"> <FaAngleRight /> Our Fleet</Link>
            <Link to="/contact"> <FaAngleRight /> Contact</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright ©{new Date().getFullYear()} <span className="font-semibold">ABHI NAE PATA Chauffeurs</span> | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;


