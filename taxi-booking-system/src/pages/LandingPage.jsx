import React from 'react';
import { useNavigate } from 'react-router-dom';
import taxiImg from '../assets/taxi.jpeg';
import '../styles/LandingPage.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';


const fleet = [
  {
    name: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1652890058094-a3fe8ead30fa?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    capacity: '1-4',
    desc: 'Premium comfort for up to 4 passengers.',
    rating: 5
  },
  {
    name: 'Mercedes Sprinter',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
    capacity: '1-16',
    desc: 'Spacious van for groups and events.',
    rating: 4
  },
  {
    name: 'Audi Q7',
    image: 'https://images.unsplash.com/photo-1655284180060-5c823b34f211?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    capacity: '1-7',
    desc: 'Luxury SUV for up to 7 passengers.',
    rating: 5
  },
  {
    name: 'Executive Car',
    image: 'https://images.unsplash.com/photo-1592891024301-bf7948cee673?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    capacity: '1-4',
    desc: 'Executive comfort for business travel.',
    rating: 5
  },
  {
    name: 'BMW 7 Series',
    image: 'https://images.unsplash.com/photo-1711244961816-4fe38bdafc16?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    capacity: '1-4',
    desc: 'Experience the ultimate in luxury and performance with our BMW 7 Series. Perfect for business and VIP travel.',
    rating: 5
  },
  {
    name: 'Premium SUV',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80',
    capacity: '1-6',
    desc: 'Spacious and comfortable premium SUV, ideal for families, groups, and long journeys.',
    rating: 5
  },
];

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
    name: 'Concerts Transfers',
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

const LandingPage = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
            <span className="hero-tagline">Travel securely with us !</span>
            <h1 className="hero-headline">
              Book your taxi from<br />anywhere today!
            </h1>
            <p className="hero-subtext">
              Enjoy fast, reliable, and comfortable rides with our professional drivers. Book your taxi in seconds and travel anywhere, anytime—24/7. Your journey, your way, with safety and convenience guaranteed.
            </p>
            <div className="hero-btn-group">
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
      <section className="why-section">
        <motion.h2 
          className="why-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h2>
        <motion.div 
          className="why-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="why-card" variants={itemVariants}>
            <ThumbUpIcon className="why-card-icon" />
            <div className="why-card-title">Trusted & Professional</div>
            <div className="why-card-desc">All drivers are background-checked, highly rated, and dedicated to your comfort and safety.</div>
          </motion.div>
          <motion.div className="why-card" variants={itemVariants}>
            <SecurityIcon className="why-card-icon" />
            <div className="why-card-title">Safe & Secure</div>
            <div className="why-card-desc">We prioritize your safety with real-time tracking, 24/7 support, and secure rides every time.</div>
          </motion.div>
          <motion.div className="why-card" variants={itemVariants}>
            <EmojiEventsIcon className="why-card-icon" />
            <div className="why-card-title">Award-Winning Service</div>
            <div className="why-card-desc">Voted best taxi service for 3 years in a row. Experience the difference with us.</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Fleet */}
      <section className="fleet-section" id="fleet-section">
        <motion.h2 
          className="fleet-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Fleet
        </motion.h2>
        <motion.div 
          className="fleet-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {fleet.map((v, i) => (
            <motion.div className="fleet-card" key={i} variants={itemVariants}>
              <img
                src={v.image}
                alt={v.name}
                className="fleet-card-img"
              />
              <div className="fleet-card-overlay">
                <div className="fleet-card-title">{v.name}</div>
                <div className="fleet-card-capacity">Capacity: {v.capacity}</div>
                <div className="fleet-card-desc">{v.desc}</div>
                <div className="fleet-card-stars">{'★'.repeat(v.rating)}{'☆'.repeat(5 - v.rating)}</div>
                <button className="fleet-card-btn">Get a Quote</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Services */}
      <>
        <motion.h2 
          className="services-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <div className="services-cards services-cards-img">
          {services.map((s, i) => (
            <motion.div className="services-card-img" key={i} variants={itemVariants} style={{ backgroundImage: `url(${s.image})` }}>
              <div className="services-card-img-overlay">
                <div className="services-card-title-img">{s.name}</div>
                <div className="services-card-desc-img">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <div className="footer-title">TaxiBooker</div>
            <div className="footer-copy">&copy; {new Date().getFullYear()} TaxiBooker. All rights reserved.</div>
          </div>
          <div className="footer-contact">
            Contact: info@taxibooker.com | +1 234 567 890
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage; 