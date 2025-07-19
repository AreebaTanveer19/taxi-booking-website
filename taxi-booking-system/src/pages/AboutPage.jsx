import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Security, 
  AccessTime, 
  Star 
} from '@mui/icons-material';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.about-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="about-page">
      <div className="about-wrapper">
        <motion.section 
          className="about-section"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="about-container">
            {/* Header Section */}
            <motion.div 
              className="about-header"
              variants={itemVariants}
            >
              <h1 className="about-title">About Us</h1>
              <p className="about-tagline">Driven by comfort. Powered by reliability.</p>
              <div className="experience-badge">
                <span className="years">15+</span>
                <span className="text">Years of Excellence</span>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="about-content"
              variants={itemVariants}
            >
              <div className="about-description">
                <p>
                  At TaxiBooker, we've been at the forefront of premium transportation services for over 15 years. 
                  Our mission is simple yet powerful: to provide seamless, safe, and luxurious travel experiences 
                  that exceed expectations every time.
                </p>
                
                <p>
                  With a fleet of meticulously maintained vehicles and a team of professional, background-checked 
                  drivers, we ensure that every journey is not just a ride, but an experience. From the moment 
                  you book with us, you can trust that punctuality, safety, and comfort are our top priorities.
                </p>
                
                <p>
                  We specialize in airport transfers, corporate travel, special events, and luxury transportation 
                  services. Whether you're a business executive needing reliable airport pickup, a family planning 
                  a special occasion, or a traveler seeking comfort and convenience, our comprehensive range of 
                  services is designed to meet your every need.
                </p>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div 
              className="about-features"
              variants={itemVariants}
            >
                          <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <Security />
                </div>
                <div className="feature-text">
                  <h3>Safety First</h3>
                  <p>All drivers background-checked and vehicles regularly inspected</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <AccessTime />
                </div>
                <div className="feature-text">
                  <h3>Punctual Service</h3>
                  <p>We value your time with guaranteed on-time pickups</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <Star />
                </div>
                <div className="feature-text">
                  <h3>Premium Quality</h3>
                  <p>Luxury vehicles and professional service standards</p>
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage; 