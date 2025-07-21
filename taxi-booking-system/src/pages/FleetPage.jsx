import React from "react";
import carData from "../assets/carData.json";
import "../styles/FleetPage.css";
import Footer from '../components/Footer/Footer';
import { FaChair, FaSnowflake, FaSuitcase, FaStar } from 'react-icons/fa';
import { GiCarSeat } from 'react-icons/gi';

const FleetPage = () => {
  return (
    <>
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