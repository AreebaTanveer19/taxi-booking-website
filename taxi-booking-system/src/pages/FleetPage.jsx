import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaSuitcase, FaChevronDown } from 'react-icons/fa';
import '../styles/FleetPage.css';
import Footer from '../components/Footer/Footer';

export default function FleetPage() {
  const [expandedId, setExpandedId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const fleet = [
    {
      id: 1,
      name: 'Executive Sedan',
      capacity: '1-3 Passengers • 2 Suitcases',
      models: 'Lexus, Mercedes E Class, BMW 5 Series',
      features: ['Air Conditioning', 'Leather Seats', 'Phone Chargers', 'Bottled Water'],
      image: 'https://i.pinimg.com/736x/00/9d/fa/009dfa15dcde9017020e6589eb166bad.jpg',
      description: 'The Executive Sedan combines elegance and efficiency for professionals and travelers who value comfort and punctuality. Ideal for business executives, this vehicle ensures a smooth ride with plush interiors and advanced climate control. Whether you’re heading to a corporate meeting or the airport, this sedan reflects style and professionalism at every turn.',
      idealFor: 'Business meetings, airport transfers, and special occasions'
    },
    {
      id: 2,
      name: 'Premium Sedan',
      capacity: '1-3 Passengers • 2 Suitcases',
      models: 'Mercedes S Class, BMW 7 Series or Audi A8',
      features: ['Premium Sound System', 'Massage Seats', 'WiFi', 'Refreshments'],
      image: 'https://i.pinimg.com/1200x/a9/71/d0/a971d076a33b6270548439fa6c24d467.jpg',
      description: 'For those who desire the pinnacle of sophistication, our Premium Sedans deliver unrivaled luxury. Featuring opulent interiors, ambient lighting, and a whisper-quiet cabin, these vehicles are designed to impress. Perfect for high-profile clients or special events, they make every journey a truly first-class experience.',
      idealFor: 'Corporate events, weddings, and luxury getaways'
    },
    {
      id: 3,
      name: 'SUV',
      capacity: '1-4 Passengers • 3 Suitcases • 2 Carry On',
      models: 'Audi Q7 or Similar',
      features: ['Spacious Interior', 'All-Wheel Drive', 'Child Seats Available', 'Climate Control'],
      image: 'https://i.pinimg.com/1200x/1d/d3/4a/1dd34ad755b30b3f0f00d65a1418bf1c.jpg',
      description: 'Our SUVs offer a perfect blend of luxury and versatility, ideal for families or small groups. With a spacious interior, advanced safety features, and high ground clearance, you can travel comfortably and confidently in any weather or terrain. It’s the ideal vehicle for road trips, tours, or urban commutes with extra luggage.',
      idealFor: 'Family vacations, group outings, and road trips'
    },
    {
      id: 4,
      name: 'Van',
      capacity: '1-6 Passengers • 5 Suitcases',
      models: 'Mercedes Van or Similar',
      features: ['Ample Luggage Space', 'Comfortable Seating', 'Privacy Partitions', 'Entertainment System'],
      image: 'https://i.pinimg.com/1200x/a3/28/3c/a3283ca191f3ca879a3fe4567c513d11.jpg',
      description: 'When traveling with a group, comfort and space are essential — and our vans deliver both in style. Equipped with privacy partitions and premium entertainment options, these vehicles ensure your group stays relaxed and entertained throughout the ride. Ideal for airport runs, private tours, or group functions.',
      idealFor: 'Group transportation, parties, and events'
    },
    {
      id: 5,
      name: 'Mini Bus',
      capacity: '1-11 Passengers • 6 Suitcases/Trailer',
      models: 'Mercedes Sprinter or Similar',
      features: ['Group Transport', 'Luxury Seating', 'Onboard Restroom', 'Professional Driver'],
      image: 'https://i.pinimg.com/1200x/63/32/3c/63323c04621887790f91a67bb46b8ca0.jpg',
      description: 'Our Mini Bus is built for maximum capacity without sacrificing comfort. Whether it’s a corporate team outing, wedding party, or tourist group, the Mini Bus offers luxurious seating, ample legroom, and even an onboard restroom. It’s your mobile lounge on wheels — driven by professionals for a smooth journey.',
      idealFor: 'Large groups, corporate events, and weddings'
    }
  ];
  
  return (
    <>
    <div className="fleet-page">
      <motion.section 
        className="fleet-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          <div className="hero-content-container">
            <motion.div 
              className="hero-content"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <motion.h1 className="hero-title"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Our Premium Fleet
              </motion.h1>
              <motion.p className="hero-subtitle"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Experience luxury transportation tailored to your needs
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.div 
        className="fleet-list"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {fleet.map((vehicle) => (
          <React.Fragment key={vehicle.id}>
            <motion.div 
              className="fleet-item"
              variants={itemVariants}
              onClick={() => setExpandedId(expandedId === vehicle.id ? null : vehicle.id)}
            >
              <div className="fleet-item-content">
                <div className="fleet-image-container">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="fleet-image"
                  />
                </div>
                <div className="fleet-details">
                  <div className="content-wrapper">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    <div className="vehicle-specs">
                      <span className="spec-item">
                        <FaUserFriends className="spec-icon" /> {vehicle.capacity}
                      </span>
                      <span className="spec-item">
                        <FaSuitcase className="spec-icon" /> {vehicle.models}
                      </span>
                    </div>
                    <div className="view-details">
                      View details <FaChevronDown className={expandedId === vehicle.id ? 'rotate' : ''} />
                    </div>
                  </div>
                  {expandedId === vehicle.id && (
                    <div className="vehicle-description">
                      <p>{vehicle.description}</p>
                      <p className="ideal-for">
                        <strong>Ideal for:</strong> {vehicle.idealFor}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            {fleet.indexOf(vehicle) < fleet.length - 1 && <hr className="divider" />}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
    <Footer />
    </>
  );
}