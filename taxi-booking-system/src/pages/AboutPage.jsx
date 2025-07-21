import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutPage.css';
const aboutImg = 'https://images.unsplash.com/photo-1561096241-78c932e7cb1b?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
import { FaRegHeart, FaCarSide, FaShieldAlt, FaBolt } from 'react-icons/fa';
import team1 from '../assets/A7.png';
import team2 from '../assets/A8.png';
import team3 from '../assets/Q7.png';
import { useNavigate } from 'react-router-dom';

const values = [
  {
    icon: <FaRegHeart />, title: 'Empathy', desc: 'We treat every ride as a personal journey, caring for your comfort and peace of mind.'
  },
  {
    icon: <FaShieldAlt />, title: 'Integrity', desc: 'Honesty and trust are at the core of our service—your safety and satisfaction come first.'
  },
  {
    icon: <FaCarSide />, title: 'Clean Rides', desc: 'Our vehicles are meticulously maintained for a spotless, premium experience every time.'
  },
  {
    icon: <FaBolt />, title: 'Fast Booking', desc: 'Book your ride in seconds with our seamless, user-friendly system.'
  }
];

const team = [
  { img: team1, name: 'Aman Singh', role: 'Founder & CEO', quote: 'Our mission is to redefine premium travel—one ride at a time.' },
  { img: team2, name: 'Priya Sharma', role: 'Lead Chauffeur', quote: 'Every journey is a chance to make someone’s day better.' },
  { img: team3, name: 'Ravi Patel', role: 'Customer Success', quote: 'We listen, we care, and we deliver excellence.' },
];

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="about-root">
      {/* Hero Banner */}
      <section className="about-hero" style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.7),rgba(24,24,24,0.7)), url(${aboutImg})` }}>
        <motion.div className="about-hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="about-hero-title">We Drive More Than Miles — We Drive Experiences</h1>
          <motion.p className="about-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            Experience the difference with our commitment to safety, luxury, and heartfelt service. Every journey is tailored for your comfort and peace of mind.
          </motion.p>
          <div className="about-hero-btn-group">
            <motion.button className="about-hero-btn" whileHover={{ scale: 1.06 }} onClick={() => navigate('/book')}>
              Book a Ride
            </motion.button>
            <motion.button
              className="about-hero-btn about-hero-btn-secondary"
              whileHover={{ scale: 1.06 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Personalized Quote
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <motion.div className="about-story-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="about-section-title">Our Story</h2>
          <p>
            Founded with a vision to elevate every ride, our journey began with a single car and a passion for service. Today, we’re a trusted name in premium travel, driven by values and a relentless pursuit of excellence. Our mission is simple: to make every trip memorable, safe, and seamless—because you deserve more than just a ride.
          </p>
          <div className="about-story-quote">
            <img src={team1} alt="Founder" className="about-story-founder-img" />
            <blockquote>
              “Luxury is not just about the car—it’s about how you feel from the moment you book to the moment you arrive.”
              <span className="about-story-founder">— Aman Singh, Founder</span>
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* Driven by Values */}
      <section className="aboutus-cards-section">
        <motion.h2 className="about-section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>Driven by Values</motion.h2>
        <div className="aboutus-cards-grid">
          {values.map((v, i) => (
            <motion.div
              className="aboutus-card"
              key={v.title}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="aboutus-card-icon-wrap">
                <span className="aboutus-card-icon">{v.icon}</span>
                <span className="aboutus-card-orbit"></span>
              </div>
              <div className="aboutus-card-title">{v.title}</div>
              <p className="aboutus-card-desc">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="about-team">
        <motion.h2 className="about-section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>Meet the Team</motion.h2>
        <div className="about-team-grid">
          {team.map((member, i) => (
            <motion.div
              className="about-team-card"
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #ffb30044' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img src={member.img} alt={member.name} className="about-team-img" />
              <div className="about-team-name">{member.name}</div>
              <div className="about-team-role">{member.role}</div>
              <div className="about-team-quote">“{member.quote}”</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA / Trust Banner */}
      <section className="about-cta-strip">
        <motion.div className="about-cta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="about-cta-title">Ready to Ride With Us?</h2>
          <div className="about-cta-sub">Book your trip in seconds with our easy-to-use system</div>
          <button className="about-cta-btn" onClick={() => navigate('/book')}>Book Now</button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
