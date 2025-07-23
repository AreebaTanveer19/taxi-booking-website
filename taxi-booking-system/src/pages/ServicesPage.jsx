import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Footer from '../components/Footer/Footer';
import '../styles/ServicesPage.css';
import servicesHeroImg from '../assets/taxi1.png';
import corporateimg from '../assets/taxi1.png';
import airportimg from '../assets/taxi1.png';
import weddingimg from '../assets/taxi1.png';
import executiveimg from '../assets/taxi1.png';
import crewimg from '../assets/taxi1.png';
import tourimg from '../assets/taxi1.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    name: 'Airport Transfers',
    icon: <FlightTakeoffIcon fontSize="large" />, 
    image: airportimg,
    desc: 'Reliable and punctual airport transfers for all your flights.',
    useCases: [
      'Domestic & International Flights',
      'Meet & Greet Service',
      'Flight Tracking',
      'Luggage Assistance'
    ]
  },
  {
    name: 'Corporate Transfers',
    icon: <BusinessCenterIcon fontSize="large" />,
    image: corporateimg,
    desc: 'Professional transportation for business executives and corporate events.',
    useCases: [
      'Executive Commutes',
      'Client Meetings',
      'Corporate Events',
      'Conference Transfers'
    ]
  },
  {
    name: 'Wedding Services',
    icon: <EventIcon fontSize="large" />,
    image: weddingimg,
    desc: 'Elegant and stylish wedding car hire for your special day.',
    useCases: [
      'Bridal Party Transport',
      'Groom Transport',
      'Guest Shuttles',
      'Venue Transfers'
    ]
  },
  {
    name: 'Event Transportation',
    icon: <EmojiEventsIcon fontSize="large" />,
    image: executiveimg,
    desc: 'Group transportation for concerts, sports, and special events.',
    useCases: [
      'Concert Transfers',
      'Sporting Events',
      'Galas & Awards',
      'VIP Event Access'
    ]
  },
  {
    name: 'Tours & Sightseeing',
    icon: <DirectionsCarIcon fontSize="large" />,
    image: tourimg,
    desc: 'Guided tours with luxury transportation to explore the city.',
    useCases: [
      'City Tours',
      'Wine Country Tours',
      'Custom Itineraries',
      'Multi-Day Excursions'
    ]
  },
  {
    name: 'Crew Shuttles',
    icon: <LocalShippingIcon fontSize="large" />,
    image: crewimg,
    desc: 'Efficient crew transportation for film, TV, and production teams.',
    useCases: [
      'Film & TV Shoots',
      'Production Crews',
      'Equipment Transport',
      'Location Shuttles'
    ]
  }
];

const ServicesPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="services-hero" style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.7), rgba(24,24,24,0.7)), url(${servicesHeroImg})` }}>
        <motion.div 
          className="services-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="services-hero-title">Our Premium Services</h1>
          <p className="services-hero-subtitle">Experience luxury transportation tailored to your needs</p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-image" style={{ backgroundImage: `url(${service.image})` }}></div>
              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.desc}</p>
                <ul className="service-use-cases">
                  {service.useCases.map((useCase, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span> {useCase}
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <button className="learn-more-btn">Learn More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServicesPage;