import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Book', path: '/book' },
  { label: 'Fleet', path: '/fleet' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },

];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (link) => {
    setMobileOpen(false);
    navigate(link.path);
  };

  return (
    <div className="navbar-hero-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo removed */}
          <button className="navbar-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className="navbar-hamburger-bar"></span>
            <span className="navbar-hamburger-bar"></span>
            <span className="navbar-hamburger-bar"></span>
          </button>
          <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
            {navLinks.map(link => (
              <li key={link.label}>
                <button
                  className={`navbar-link${location.pathname === link.path ? ' active' : ''}`}
                  onClick={() => handleNavClick(link)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 