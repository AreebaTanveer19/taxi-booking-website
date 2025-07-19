import React from "react";
import carData from "../assets/carData.json";
import "../styles/FleetPage.css";

const FleetPage = () => {
  return (
    <div className="fleet-container">
      {carData.map((car, idx) => (
        <div className="car-card" key={idx}>
          <div className="car-image-wrapper">
            {car.pic ? (
              <img src={car.pic} alt={car.name} className="car-image" />
            ) : (
              <div className="car-image-placeholder">Image Coming Soon</div>
            )}
          </div>
          <div className="car-card-header">
            <h2 className="car-name">{car.name}</h2>
            <div className="car-rating-row">{'\u2B50'.repeat(car.rating || 5)}</div>
          </div>
          <div className="car-card-actions">
            <button className="quote-btn">Get a Free Quote</button>
          </div>
          <div className="car-specs-row">
            <span title="Seats">🪑 {car.seat} x</span>
            <span title="AC">❄️ AC</span>
            <span title="Heater"><span style={{color:'#d32f2f'}}>♨️</span> Heater</span>
            <span title="Luggage">🧳 {car.luggage_capacity}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FleetPage; 