import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import services from './data/servicesData';
import '../styles/ServicePage.css';
import Footer from '../components/Footer/Footer';

const ServiceTemplate = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === serviceId);

  if (!service) return <div>Service not found</div>;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <>
    <div className="service-page">
      {/* Breadcrumb Navigation */}
      <motion.div 
        className="breadcrumb"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 0.2 
        }}
      >
        <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>{service.name}</span>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        className="service-hero" 
        style={{ backgroundImage: `url(${service.images[0]})` }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <div className="service-hero-overlay">
          <motion.div 
            className="hero-content"
            variants={slideUp}
            >
            <motion.h1 variants={slideUp}>{service.name}</motion.h1>
            <motion.p variants={slideUp}>{service.desc}</motion.p>
            <motion.button
              className="book-now-btn"
              variants={slideUp}
              whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/book')}
            >
              Book Now
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section 
        className="service-main"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="service-content">
          <motion.div className="text-content" variants={slideUp}>
            <h2>About Our {service.name}</h2>
            <p>{service.detailedDesc}</p>
          </motion.div>
          
          <motion.div className="car-images" variants={slideUp}>
            {[service.images[1], service.images[2]].map((img, i) => (
              <motion.img 
                key={i}
                src={img}
                alt={`${service.name} vehicle ${i+1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          className="features-section"
          variants={staggerContainer}
        >
          <motion.h2 variants={slideUp}>Key Features & Benefits</motion.h2>
          <div className="features-grid">
            {service.features?.map((feature, i) => (
              <motion.div 
                key={i}
                className="feature-card"
                variants={slideUp}
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon">{service.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
    <Footer />
    </>
  );
};

export default ServiceTemplate;
