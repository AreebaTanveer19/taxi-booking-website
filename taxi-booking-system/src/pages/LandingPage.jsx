import React from 'react';
import { useNavigate } from 'react-router-dom';
import taxiImg from '../assets/taxi.jpeg';
import '../styles/LandingPage.css';
import { FaChair, FaSnowflake, FaSuitcase, FaStar } from 'react-icons/fa';
import { GiCarSeat } from 'react-icons/gi';
import carData from '../assets/carData.json';
import Footer from '../components/Footer/Footer';
import A7 from '../assets/A7.png';
import A8 from '../assets/A8.png';
import Q7 from '../assets/Q7.png';
import { motion } from 'framer-motion';


// const fleet = [
//   {
//     name: 'Luxury Sedan',
//     image: 'https://images.unsplash.com/photo-1652890058094-a3fe8ead30fa?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     capacity: '1-4',
//     desc: 'Premium comfort for up to 4 passengers.',
//     rating: 5
//   },
//   {
//     name: 'Mercedes Sprinter',
//     image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
//     capacity: '1-16',
//     desc: 'Spacious van for groups and events.',
//     rating: 4
//   },
//   {
//     name: 'Audi Q7',
//     image: 'https://images.unsplash.com/photo-1655284180060-5c823b34f211?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     capacity: '1-7',
//     desc: 'Luxury SUV for up to 7 passengers.',
//     rating: 5
//   },
//   {
//     name: 'Executive Car',
//     image: 'https://images.unsplash.com/photo-1592891024301-bf7948cee673?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     capacity: '1-4',
//     desc: 'Executive comfort for business travel.',
//     rating: 5
//   },
//   {
//     name: 'BMW 7 Series',
//     image: 'https://images.unsplash.com/photo-1711244961816-4fe38bdafc16?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     capacity: '1-4',
//     desc: 'Experience the ultimate in luxury and performance with our BMW 7 Series. Perfect for business and VIP travel.',
//     rating: 5
//   },
//   {
//     name: 'Premium SUV',
//     image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80',
//     capacity: '1-6',
//     desc: 'Spacious and comfortable premium SUV, ideal for families, groups, and long journeys.',
//     rating: 5
//   },
// ];

const services = [
  {
    name: 'Corporate Car Hire Transfers',
    image: 'https://images.unsplash.com/photo-1605414262199-63817d195576?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Planning is essential for corporate occasions, and a dependable chauffeur service is necessary. Our highly trained and experienced corporate chauffeurs will see to it that you and your guests arrive in the utmost elegance.'
  },
  {
    name: 'Airport Car Services Transfers',
    image: 'https://images.unsplash.com/photo-1649559963715-8c34a1c31bf5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Experience the ultimate in airport chauffeur hire service. Our premium airport transfers are your reliable choice for seamless travel, ready to meet all your domestic and international flights, anytime you need.'
  },
  {
    name: 'Concerts Transfer Services',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    desc: 'Turn your special event into an extraordinary experience with our premium event transfer service. Our chauffeurs are ready to make your occasion unforgettable, providing convenient transportation for events.'
  },
  {
    name: 'Wedding Car & Chauffeur Hire',
    image: 'Wedding Car & Chauffeur Hire',
    desc: 'Make your special day even more unforgettable with our exquisite wedding transfer service. Our dedicated chauffeurs ensure a seamless and elegant arrival, adding a touch of luxury to your wedding experience.'
  },
  {
    name: 'Parcel Delivery',
    image: 'https://images.unsplash.com/photo-1632174380104-95808fb87cd1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Swift and secure parcel delivery with our trusted transport service. We ensure your packages arrive safely and on time, every time.'
  },
  {
    name: 'Special Events',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Make every event memorable with our premium event transfer service for concerts, parties, and more. Enjoy reliable, stylish, and comfortable rides for all your special occasions.'
  },
];

const fleetImages = {
  'AUDI Q7': Q7,
  'AUDI A8': A8,
  'AUDI A7': A7,
};

const LandingPage = () => {
  const navigate = useNavigate();
  
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: "easeOut"
  //     }
  //   }
  // };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.5), rgba(24,24,24,0.58)), url(${taxiImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-container">
          <div className="hero-text">
            <span className="hero-tagline hide-on-mobile-hero">Travel securely with us !</span>
            <h1 className="hero-headline">
              Book your taxi from<br />anywhere today!
            </h1>
            <p className="hero-subtext hide-on-mobile-hero">
              Enjoy fast, reliable, and comfortable rides with our professional drivers. Book your taxi in seconds and travel anywhere, anytime—24/7. Your journey, your way, with safety and convenience guaranteed.
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
      </div>

      {/* Why Choose Us */}
      <motion.h2 
        className="why-title"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Why Choose Us
      </motion.h2>
      {/* About Us Cards Section */}
      <div className="aboutus-cards-section">
        <div className="aboutus-cards-grid">
          <div className="aboutus-card">
            <div className="aboutus-card-title">Luxury Cars</div>
            <div className="aboutus-card-icon-wrap">
              <span className="aboutus-card-icon luxury-icon"></span>
              <span className="aboutus-card-orbit"></span>
            </div>
            <div className="aboutus-card-desc">Unleash opulence on every drive with our premium fleet of luxury vehicles. Experience the perfect blend of comfort, style, and sophistication as you travel across Sydney, making every journey truly memorable and extraordinary.</div>
          </div>
          <div className="aboutus-card">
            <div className="aboutus-card-title">24/7 Service</div>
            <div className="aboutus-card-icon-wrap">
              <span className="aboutus-card-icon service-icon"></span>
              <span className="aboutus-card-orbit"></span>
            </div>
            <div className="aboutus-card-desc">Elevate your journey anytime, anywhere with our exclusive 24/7 chauffeur service. Whether it’s an early morning airport run or a late-night event, our professional drivers are always ready to serve you with reliability and class.</div>
          </div>
          <div className="aboutus-card">
            <div className="aboutus-card-title">Security</div>
            <div className="aboutus-card-icon-wrap">
              <span className="aboutus-card-icon security-icon"></span>
              <span className="aboutus-card-orbit"></span>
            </div>
            <div className="aboutus-card-desc">Drive with confidence knowing your safety is our top priority. Our vehicles are equipped with advanced security features and our chauffeurs are trained to provide a secure, discreet, and comfortable experience at all times.</div>
          </div>
          <div className="aboutus-card">
            <div className="aboutus-card-title">On Time</div>
            <div className="aboutus-card-icon-wrap">
              <span className="aboutus-card-icon time-icon"></span>
              <span className="aboutus-card-orbit"></span>
            </div>
            <div className="aboutus-card-desc">Punctuality perfected—arrive in luxury, on time, every time. We pride ourselves on our commitment to timeliness, ensuring you reach your destination promptly and stress-free, no matter the occasion or schedule.</div>
          </div>
        </div>
      </div>

      {/* Our Services */}
      <div className="services-section-img">
        <h2 className="services-main-title">We are Offering Various Sydney Chauffeur Services</h2>
        <div className="services-main-sub">Our chauffeurs are highly skilled experts who have undergone extensive training and are knowledgeable drivers.</div>
        <div className="services-cards-img-grid">
          <div className="services-card-img-v2 blue" style={{ backgroundImage: `url(${services[0].image})` }}>
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
              <div className="services-card-desc-img-v2">Make your events extraordinary with our premium chauffeur transfers.</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: `url(${services[3].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[3].name}</div>
              <div className="services-card-desc-img-v2">Elegant wedding car hire for a seamless and stylish arrival.</div>
            </div>
          </div>
          <div className="services-card-img-v2" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80)' }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">Crew Transportation</div>
              <div className="services-card-desc-img-v2">Prompt and comfortable crew transport for your team’s needs.</div>
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
              <div className="services-card-desc-img-v2">Swift and secure parcel delivery across Sydney and beyond.</div>
            </div>
          </div>
          <div className="services-card-img-v2 red" style={{ backgroundImage: `url(${services[5].image})` }}>
            <div className="services-card-img-overlay-v2">
              <div className="services-card-title-img-v2">{services[5].name}</div>
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
        <motion.h2 
          className="fleet-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Fleet
        </motion.h2>
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