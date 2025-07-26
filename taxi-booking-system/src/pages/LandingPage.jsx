import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import taxiImg from '../assets/taxi1.png';
import hero1 from '../assets/businesswoman-getting-taxi-cab.jpg';
import hero2 from '../assets/taxi1.jpg';
import hero4 from '../assets/pexels-pavel-danilyuk-8425035.jpg';
import '../styles/LandingPage.css';
import { FaChair, FaSnowflake, FaSuitcase, FaStar, FaCar, FaClock, FaShieldAlt, FaRegClock } from 'react-icons/fa';
import { GiCarSeat } from 'react-icons/gi';
import carData from '../assets/carData.json';
import Footer from '../components/Footer/Footer';
import A7 from '../assets/A7.png';
import A8 from '../assets/A8.png';
import Q7 from '../assets/Q7.png';
import corporateimg from '../assets/corporate.jpeg';

import crewimg from '../assets/crew.jpeg';
import { motion } from 'framer-motion';
import { openWhatsApp } from '../utils/whatsapp';

const heroImages = [hero2, hero1, hero4 , taxiImg];

const services = [
  {
    name: 'Corporate Transfers',
    image: corporateimg,
    desc: 'Professional chauffeurs for elegant corporate travel and executive transfers.'
  },
  {
    name: 'Airport Transfers',
    image: 'https://i.pinimg.com/736x/e4/d3/57/e4d357b529f775361b5d1ecca7f55115.jpg',
    desc: 'Reliable airport pickups and drop-offs for domestic and international flights.'
  },
  {
    name: 'Wedding Transfers',
    image: 'https://i.pinimg.com/736x/68/31/58/6831587c6a1d886558d3ddb9bfd78fbf.jpg',
    desc: 'Luxurious wedding car hire for a stylish and seamless special day of your life.'
  },
  {
    name: 'Crew Transfers',
    image: crewimg,
    desc: 'Efficient crew transport solutions for the business teams and professionals.'
  },
  {
    name: 'Parcel Delivery',
    image: 'https://i.pinimg.com/736x/0a/eb/3e/0aeb3ea13895bf06694135173b017f18.jpg',
    desc: 'Swift and secure parcel delivery services across Sydney with safety measures.'
  },
  {
    name: 'Special Events',
    image: 'https://i.pinimg.com/736x/4e/a0/a0/4ea0a0bcabce609bb88fad491994e951.jpg',
    desc: 'Premium event transportation for concerts, parties, and special occasions.'
  }
];

const fleetImages = {
  'SUV': Q7,
  'Premium Sedan': A8,
  'Executive Sedan': A7,
};

const fleetItems = [
  {
    name: 'Executive Sedan',
    passengers: '1-3 Passengers',
    luggage: '2 Suitcases',
    imageKey: 'Executive Sedan'
  },
  {
    name: 'Premium Sedan',
    passengers: '1-3 Passengers',
    luggage: '2 Suitcases',
    imageKey: 'Premium Sedan'
  },
  {
    name: 'SUV',
    passengers: '1-4 Passengers',
    luggage: '3 Suitcases ',
    imageKey: 'SUV'
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        if (prev >= services.length) {
          // When reaching cloned items, instantly reset to first slide
          return 1;
        }
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  const extendedServices = [...services, ...services.slice(0, 4)];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-images">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`hero-bg-image ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.5), rgba(24,24,24,0.5)), url(${image})` }}
            />
          ))}
        </div>
        <div className="hero-container">
          <div className="hero-text">
            <span className="hero-tagline hide-on-mobile-hero">Travel securely with us !</span>
            <h1 className="hero-headline">
              Book your ride from<br />anywhere today!
            </h1>
            <p className="hero-subtext hide-on-mobile-hero">
              Enjoy fast, reliable, and comfortable rides with our professional drivers. Book your ride in seconds and travel anywhere, anytime—24/7. Your journey, your way, with safety and convenience guaranteed.
            </p>
            <div className="hero-btn-group hero-btn-group-row">
              <button className="hero-btn hero-btn-primary" onClick={() => {
                window.scrollTo(0, 0);
                navigate('/book');
              }}>
                Book Now
              </button>
              <button 
                className="hero-btn hero-btn-secondary" 
                onClick={() => openWhatsApp()}
              >
                Get Personalized Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <div className="services-section-img">
        <h2 className="services-main-title">We are Offering Various Sydney Chauffeur Services</h2>
        <div className="services-main-sub">Our chauffeurs are highly skilled experts who have undergone extensive training and are knowledgeable drivers.</div>
        <div className="services-slider-container">
          <div className="services-cards-img-grid" style={{
            transform: `translateX(-${currentSlide * 25}%)`,
            transition: currentSlide <= services.length 
              ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
              : 'none'
          }}>
            {extendedServices.map((service, i) => (
              <div 
                key={i}
                className="services-card-img-v2" 
                style={{ 
                  backgroundImage: `url(${service.image})`,
                  transitionDelay: `${i * 0.1}s`
                }}
              >
                <div className="services-card-img-overlay-v2">
                  <div className="services-card-title-img-v2">{service.name}</div>
                  <div className="services-card-desc-img-v2">{service.desc}</div>
                  {/* <button 
                    className="services-card-button-v2"
                    onClick={() => openWhatsApp(service.name)}
                  >
                    Get Instant Quote
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promo Section for Regular Customers */}
      <div className="promo-section" style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.55), rgba(24,24,24,0.55)), url(${taxiImg})` }}>
        <div className="promo-content">
          <h2 className="promo-title promo-title-large">Discount up to 10% only for Regular Customersr</h2>
          <div className="promo-desc promo-desc-large">Enjoy exclusive savings! Our loyal customers receive a 10% discount on every ride. Thank you for choosing us for your journeys—your loyalty is always rewarded.</div>
          <button 
            className="hero-btn hero-btn-primary promo-btn"
            onClick={() => openWhatsApp()}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Our Fleet */}
      <motion.div 
        className="fleet-cards landing-fleet-cards"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {fleetItems.map((fleetItem, idx) => (
          <motion.div 
            className="car-card pro-fleet-card" 
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <div className="car-image-wrapper">
              <motion.img 
                src={fleetImages[fleetItem.imageKey]} 
                alt={fleetItem.name} 
                className="car-image"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="car-card-header">
              <h2 className="car-name pro-fleet-name">{fleetItem.name}</h2>
            </div>
            <div className="car-card-actions">
              <motion.button 
                className="quote-btn pro-fleet-btn" 
                style={{background:'#ffb300',color:'#181818'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openWhatsApp(fleetItem.name)}
              >
                Instant Quote
              </motion.button>
            </div>
            <div className="car-specs-row pro-fleet-specs">
              <span title="Capacity"><FaChair/>{fleetItem.passengers}</span>
              <span title="Luggage"><FaSuitcase/>{fleetItem.luggage}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="fleet-show-more-wrapper">
        <a href="/fleet" className="fleet-show-more-btn">Show More</a>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default LandingPage; 