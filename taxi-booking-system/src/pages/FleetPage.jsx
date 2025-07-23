import React from "react";
import { motion } from 'framer-motion';
import carData from "../assets/carData.json";
import "../styles/FleetPage.css";
import Footer from '../components/Footer/Footer';
import { FaChair, FaSnowflake, FaSuitcase, FaStar } from 'react-icons/fa';
import { GiCarSeat } from 'react-icons/gi';

const fleetHeroImg = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const FleetPage = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="fleet-hero" style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.7),rgba(24,24,24,0.7)), url(${fleetHeroImg})` }}>
        <motion.div className="fleet-hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="fleet-hero-title">Our Premium Fleet - Luxury and Comfort Guaranteed</h1>
          <p className="fleet-hero-sub">Explore our collection of meticulously maintained vehicles for your perfect ride</p>
        </motion.div>
      </section>

      <div className="fleet-container landing-fleet-cards">
        {carData.map((car, idx) => (
          <div className="car-card pro-fleet-card" key={idx}>
            <div className="car-image-wrapper">
              {car.pic ? (
                <img src={car.pic} alt={car.name} className="car-image" />
              ) : (
                <div className="car-image-placeholder">Image Coming Soon</div>
              )}
            </div>
            <div className="car-card-header">
              <h2 className="car-name pro-fleet-name">{car.name}</h2>
              <div className="car-rating-row pro-fleet-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < (car.rating || 5) ? '#ffb300' : '#e0e0e0'} size={22} />
                ))}
              </div>
            </div>
            <div className="car-card-actions">
              <button className="quote-btn pro-fleet-btn" style={{background:'#ffb300',color:'#181818'}}>Get a Free Quote</button>
            </div>
            <div className="car-specs-row pro-fleet-specs">
              <span title="Seats"><GiCarSeat color="#181818" size={20} /> <span className="pro-fleet-spec">{car.seat} x</span></span>
              <span title="AC"><FaSnowflake color="#ffb300" size={18} /> <span className="pro-fleet-spec">AC</span></span>
              <span title="Heater"><FaChair color="#ffb300" size={18} /> <span className="pro-fleet-spec">Heater</span></span>
              <span title="Luggage"><FaSuitcase color="#181818" size={18} /> <span className="pro-fleet-spec">{car.luggage_capacity}</span></span>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default FleetPage; 