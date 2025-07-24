import React, { useState } from 'react';
import '../styles/Navbar.css';
import logoImg from '../assets/logo.png';

const navLinks = [
  { label: 'HOME', path: '/' },
  { 
    label: 'BOOK', 
    path: '/book' 
  },
  { 
    label: 'SERVICES', 
    path: '/services',
    dropdown: [
      { label: 'Airport Transfers', path: '/services/airport-transfers' },
      { label: 'Corporate Transfers', path: '/services/corporate-transfers' },
      { label: 'Wedding Services', path: '/services/wedding-services' },
      { label: 'Parcel Transfer', path: '/services/parcel-transfer' },
      { label: 'Special Events', path: '/services/special-events' },
      { label: 'Crew Transfers', path: '/services/crew-transfers' }
    ]
  },
  { label: 'OUR FLEET', path: '/fleet' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
];

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleHamburger = () => setSidebarOpen((open) => !open);
  const handleSidebarLink = () => setSidebarOpen(false);

  // Height of navbar-main (desktop/mobile): 48px
  const sidebarStyle = sidebarOpen
    ? { top: '48px', height: 'auto', width: '100vw' }
    : { top: '48px', height: 'auto', width: '100vw' };

  return (
    <>
      {/* Top Black Bar (hidden on mobile) */}
      <div className="navbar-topbar hide-on-mobile">
        <div className="navbar-topbar-left navbar-topbar-welcome">
          <span className="navbar-topbar-welcome-text"><b>Welcome to <span className="navbar-topbar-site">Horizon Chauffeurs</span></b>, we hope you will enjoy our services and have a good experience.</span>
        </div>
        <div className="navbar-topbar-right">
          <span className="navbar-topbar-item"><span className="navbar-topbar-icon-email">✉️</span>info@abhinaamnipta.au</span>
          <span className="navbar-topbar-item"><span className="navbar-topbar-icon-phone">📞</span>012345678</span>
        </div>
      </div>
      {/* Main Navbar */}
      <nav className="navbar-main">
        <div className="navbar-main-container">
          <div className="navbar-logo-area">
            <span className="navbar-logo-img-bg">
              <img src={logoImg} alt="Logo" className="navbar-logo-img-asset" />
            </span>
            <span className="navbar-logo-text">
              <span className="navbar-logo-title">HORIZON</span>
              <span className="navbar-logo-sub">CHAUFFEURS</span>
            </span>
          </div>
          {/* Hamburger for mobile */}
          <button className={`navbar-hamburger-btn show-on-mobile${sidebarOpen ? ' open' : ''}`} aria-label="Open menu" onClick={handleHamburger}>
            <span className="navbar-hamburger-bar"></span>
            <span className="navbar-hamburger-bar"></span>
            <span className="navbar-hamburger-bar"></span>
          </button>
          {/* Desktop links */}
          <ul className="navbar-main-links hide-on-mobile">
            {navLinks.map(link => (
              <li key={link.label} className={link.dropdown ? 'has-dropdown' : ''}>
                <a className="navbar-main-link" href={link.path}>
                  {link.label}
                  {link.dropdown && <span className="dropdown-arrow">▼</span>}
                </a>
                {link.dropdown && (
                  <ul className="dropdown-menu">
                    {link.dropdown.map(item => (
                      <li key={item.label}>
                        <a href={item.path}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Sidebar for mobile */}
        <div className={`navbar-sidebar${sidebarOpen ? ' open' : ''}`} style={sidebarStyle}>
          <ul className="navbar-sidebar-links modern">
            {navLinks.map(link => (
              <li key={link.label}>
                <a className="navbar-sidebar-link black" href={link.path} onClick={handleSidebarLink}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Overlay for sidebar */}
        {sidebarOpen && <div className="navbar-sidebar-overlay" onClick={handleHamburger}></div>}
      </nav>
    </>
  );
};

export default Navbar; 