import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import taxiImg from '../assets/taxi1.png';
import hero1 from '../assets/businesswoman-getting-taxi-cab.jpg';
import hero2 from '../assets/elegant-uber-driver-giving-taxi-ride.jpg';
import hero3 from '../assets/pexels-pavel-danilyuk-8425023.jpg';
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
import airportimg from '../assets/airport.jpg';
import crewimg from '../assets/crew.jpeg';

const heroImages = [hero1, hero2, hero4 , taxiImg];

const services = [
  {
    name: 'Corporate Transfers',
    image: corporateimg,
    desc: 'Planning is essential for corporate occasions, and a dependable chauffeur service is necessary. Our highly trained and experienced corporate chauffeurs will see to it that you and your guests arrive in the utmost elegance.'
  },
  {
    name: 'Airport Transfers',
    image: airportimg,
    desc: 'Experience the ultimate in airport chauffeur hire service. Our premium airport transfers are your reliable choice for seamless travel, ready to meet all your domestic and international flights, anytime you need.'
  },
  {
    name: 'Wedding Car',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Elegant wedding car hire for a seamless and stylish arrival.'
  },
  {
    name: 'Crew Transportation',
    image: crewimg,
    desc: 'Prompt and comfortable crew transport for your team\'s needs.'
  },
  {
    name: 'Parcel Delivery',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    desc: 'Swift and secure parcel delivery across Sydney and beyond.'
  },
  {
    name: 'Special Events',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    desc: 'Make every event memorable with our premium event transfer service for concerts, parties, and more.'
  }
];

const fleetImages = {
  'AUDI Q7': Q7,
  'AUDI A8': A8,
  'AUDI A7': A7,
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

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
              <button className="hero-btn hero-btn-primary" onClick={() => navigate('/book')}>
                Book Now
              </button>
              <button className="hero-btn hero-btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
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
        <div className="services-cards-img-grid">
          <div className="services-card-img-v2" style={{ backgroundImage: `url(${services[0].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[0].name}</div>
              <div className="services-card-desc-img-v2">Professional chauffeurs for corporate events and business travel in Sydney.</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: `url(${services[1].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[1].name}</div>
              <div className="services-card-desc-img-v2">Seamless airport transfers for all your domestic and international flights.</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: `url(${services[2].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[2].name}</div>
              <div className="services-card-desc-img-v2">Elegant wedding car hire for a seamless and stylish arrival.</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: `url(${services[5].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[5].name}</div>
              <div className="services-card-desc-img-v2">{services[5].desc}</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80)' }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">Executive Transfers</div>
              <div className="services-card-desc-img-v2">Prestige executive transfers for business and VIP clients.</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: `url(${services[4].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[4].name}</div>
              <div className="services-card-desc-img-v2">{services[4].desc}</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: `url(${services[3].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[3].name}</div>
              <div className="services-card-desc-img-v2">Personalized chauffeur service for special events and tours.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Section for Regular Customers */}
      <div className="promo-section" style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.55), rgba(24,24,24,0.55)), url(${taxiImg})` }}>
        <div className="promo-content">
          <h2 className="promo-title promo-title-large">Discount up to 10% only for Regular Customersr</h2>
          <div className="promo-desc promo-desc-large">Enjoy exclusive savings! Our loyal customers receive a 10% discount on every ride. Thank you for choosing us for your journeys—your loyalty is always rewarded.</div>
          <button className="hero-btn hero-btn-primary promo-btn">Book Now</button>
        </div>
      </div>

      {/* Our Fleet */}
        {/* <motion.h2 
          className="fleet-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Fleet
        </motion.h2> */}
      <div className="fleet-cards landing-fleet-cards">
        {carData.slice(0, 3).map((car, idx) => {
          const carImage = fleetImages[car.name] || car.pic;
          return (
            <div className="car-card pro-fleet-card" key={idx}>
              <div className="car-image-wrapper">
                {carImage ? (
                  <img src={carImage} alt={car.name} className="car-image" />
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
          );
        })}
      </div>
      <div className="fleet-show-more-wrapper">
        <a href="/fleet" className="fleet-show-more-btn">Show More</a>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default LandingPage; 