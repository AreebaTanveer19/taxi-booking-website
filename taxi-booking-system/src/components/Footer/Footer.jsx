import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaAngleRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './footer.css';

const footImage = 'https://images.unsplash.com/photo-1560863189-524ad3dd6ef6?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.01), rgba(0,0,0,0.01)), url(${footImage})` }}
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


