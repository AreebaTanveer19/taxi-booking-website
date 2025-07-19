import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaAngleRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import footImage from '../../assets/taxi.jpg';
import recentPost1 from '../../assets/taxi.jpg';
import recentPost2 from '../../assets/taxi.jpg';
import './footer.css';

const BASE_PATH = '/GreenYasin';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    navigate(`${BASE_PATH}/`);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = 80;
        const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: sectionPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recentPosts = [
    {
      image: recentPost1,
      date: '14 Sep 2024',
      title: 'Meant widow equal an share least part.'
    },
    {
      image: recentPost2,
      date: '14 Sep 2024',
      title: 'Future Plan & Strategy for Construction.'
    },
  ];

  return (
    <footer
      className="footer"
      style={{ backgroundImage: `url(${footImage})` }}
    >
      <div className="footer-container">
        <div>
          <h3 className="footer-heading">
            <span>Green </span>Yasin
          </h3>
          <p className="footer-text">
            Alteration in some form by injected humour or randomised words which don't look even slightly randomised words believable.
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF size={20} /></a>
            <a href="#"><FaXTwitter size={20} /></a>
            <a href="#"><FaLinkedinIn size={20} /></a>
            <a href="#"><FaInstagram size={20} /></a>
            <a href="#"><FaYoutube size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Explore</h3>
          <div className="footer-links">
            <Link to={`${BASE_PATH}/about`}><FaAngleRight /> About Us</Link>
            <Link to={`${BASE_PATH}/our-team`}><FaAngleRight /> Meet Our Team</Link>
            <Link to={`${BASE_PATH}/blog`}><FaAngleRight /> Blog</Link>
            <a onClick={() => scrollToSection('project-section')}><FaAngleRight /> Services</a>
            <Link to={`${BASE_PATH}/contact`}><FaAngleRight /> Contact Us</Link>
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Recent Work</h3>
          <div className="recent-post">
            {recentPosts.map((post, index) => (
              <div key={index} className="recent-post-item">
                <img src={post.image} alt={post.title} />
                <div>
                  <p className="recent-post-date">{post.date}</p>
                  <p className="recent-post-title">{post.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Newsletter</h3>
          <p className="newsletter-text">
            Alteration in some form by injected humour or randomised words which don't look.
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Your Email Address"
              className="newsletter-input"
            />
            <button className="newsletter-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright ©{new Date().getFullYear()} <span className="font-semibold">Green Yasin</span> Designed By <span className="font-semibold">Neurix Solutions</span></p>
        <button onClick={scrollToTop} className="scroll-to-top">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
