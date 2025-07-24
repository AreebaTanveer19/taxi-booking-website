import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import services from '../components/data/servicesData';
import Footer from '../components/Footer/Footer';
import '../styles/ServicesPage.css';


const ServicesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <motion.section 
        className="services-hero"
        style={{ 
          backgroundImage: `url('https://i.pinimg.com/1200x/2d/4f/5e/2d4f5eced5e67f57cc4e6e4c7d327049.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Premium transportation solutions tailored to your needs
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.div 
        className="services-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="services-grid">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={`/services/${service.id}`}
              className={`service-link ${service.id === 'airport-transfers' ? 'featured' : ''}`}
            >
              <motion.div 
                className="service-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <div 
                  className="service-image"
                  style={{ backgroundImage: `url(${service.images[0]})` }}
                >
                  <div className="service-overlay">
                    <h3>{service.name}</h3>
                    <p className="service-desc">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ServicesPage;