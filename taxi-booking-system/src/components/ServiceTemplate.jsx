import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import services from './data/servicesData';
import '../styles/ServicePage.css';

const ServiceTemplate = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === serviceId);

  if (!service) return <div>Service not found</div>;

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="service-page">
      {/* Hero Section with Animation */}
      <motion.section 
        className="service-hero" 
        style={{ backgroundImage: `url(${service.images[0]})` }}
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="service-hero-overlay">
          <motion.div 
            className="service-hero-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1>{service.name}</h1>
            <p>{service.desc}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content with Animation */}
      <motion.div 
        className="service-container"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <div className="service-details">
          <h2>About Our {service.name}</h2>
          <p>{service.detailedDesc}</p>
          
          <div className="features-and-images">
            <div className="service-features">
              <h3>Key Features & Benefits</h3>
              <ul>
                {service.features?.map((feature, i) => (
                  <li key={i}>
                    <strong>{feature.title}:</strong> {feature.description}
                  </li>
                )) || 
                service.useCases.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="service-images-right">
              {service.images.slice(1).map((img, i) => (
                <motion.img 
                  key={i} 
                  src={img} 
                  alt={`${service.name} example ${i+1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </div>

          <div className="service-cta">
            <h3>Ready to book?</h3>
            <motion.button
              className="book-now-btn"
              onClick={() => navigate('/book')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceTemplate;
