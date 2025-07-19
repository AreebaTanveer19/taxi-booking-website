import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileOpen]);

  const handleNavClick = (link) => {
    setMobileOpen(false);
    navigate(link.path);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="navbar-hero-wrapper">
      <nav className={`navbar ${location.pathname === '/about' ? 'navbar-about' : ''}`}>
        <div className="navbar-container">
          <button 
            className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`} 
            onClick={toggleMobileMenu} 
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
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