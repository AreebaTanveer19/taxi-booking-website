import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutPage.css';
const aboutImg = 'https://i.pinimg.com/1200x/d2/be/7a/d2be7ac815b24abe0797a35bb8383f3a.jpg';
import { FaRegHeart, FaCarSide, FaShieldAlt, FaBolt } from 'react-icons/fa';
const team1 = 'https://i.pinimg.com/736x/f6/2c/31/f62c31c18a9bfbec1f0e7b80977fa755.jpg';
const team2 = 'https://i.pinimg.com/736x/f6/2c/31/f62c31c18a9bfbec1f0e7b80977fa755.jpg';
const team3 = 'https://i.pinimg.com/736x/f6/2c/31/f62c31c18a9bfbec1f0e7b80977fa755.jpg';


import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const values = [
  {
    icon: <FaRegHeart />, 
    title: 'Empathy', 
    desc: 'We treat every ride as a personal journey, caring for your comfort and peace of mind.'
  },
  {
    icon: <FaCarSide />, 
    title: 'Luxury', 
    desc: 'Premium vehicles maintained to the highest standards for your safety and enjoyment.'
  },
  {
    icon: <FaShieldAlt />, 
    title: 'Safety', 
    desc: 'Rigorous driver training and vehicle inspections ensure your peace of mind.'
  }
];

const team = [
  { img: team1, name: 'Aman Singh', role: 'Founder & CEO', quote: 'Our mission is to redefine premium travel—one ride at a time.' },
  { img: team2, name: 'Priya Sharma', role: 'Lead Chauffeur', quote: 'Every journey is a chance to make someone’s day better.' },
  { img: team3, name: 'Ravi Patel', role: 'Customer Success', quote: 'We listen, we care, and we deliver excellence.' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Frequent Business Traveler',
    quote: 'The most reliable service I\'ve ever used. Always on time and the cars are immaculate.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Wedding Client',
    quote: 'Made our special day even more perfect with their flawless service and beautiful cars.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Airport Transfer Customer',
    quote: 'After a long flight, nothing beats being greeted by a professional driver who handles everything.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="about-root">
      {/* Hero Banner */}
      <motion.section 
        className="about-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(24,24,24,0.2),rgba(24,24,24,0.2)), url(${aboutImg})` }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          className="about-hero-content" 
          variants={fadeInUp}
        >
          <motion.h1 
            className="about-hero-title"
            variants={fadeInUp}
          >
            We Drive More Than Miles — We Drive Experiences
          </motion.h1>
          <motion.p 
            className="about-hero-sub"
            variants={fadeInUp}
            custom={1}
          >
            Experience the difference with our commitment to safety, luxury, and heartfelt service. Every journey is tailored for your comfort and peace of mind.
          </motion.p>
          <motion.div 
            className="about-hero-btn-group"
            variants={fadeInUp}
            custom={2}
          >
            <motion.button 
              className="about-hero-btn" 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255, 179, 0, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/book')}
            >
              Book a Ride
            </motion.button>
            <motion.button
              className="about-hero-btn about-hero-btn-secondary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Personalized Quote
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

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
      <section className="about-values">
        <div className="about-values-container">
          <motion.h2 
            className="about-section-title" 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }}
          >
            Our Core Values
          </motion.h2>
          
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div
                className="value-card"
                key={v.title}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="value-icon-container">
                  <div className="value-icon">{v.icon}</div>
                  <div className="value-icon-bg"></div>
                </div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-description">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <motion.section 
        className="about-testimonials"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className="about-section-title"
          variants={fadeInUp}
        >
          What Our Clients Say
        </motion.h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, i) => (
            <motion.div
              className="testimonial-card"
              key={testimonial.id}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            >
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
              </div>
              <blockquote className="testimonial-quote">
                "{testimonial.quote}"
              </blockquote>
              <div className="testimonial-author">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="testimonial-avatar"
                />
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Ready to Ride With Us */}
      <motion.section 
        className="about-cta"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="about-cta-container">
          <motion.div 
            className="about-cta-content"
            variants={fadeInUp}
          >
            <motion.h2 
              className="about-cta-title"
              variants={fadeInUp}
            >
              Ready to Ride With Us?
            </motion.h2>
            <motion.p 
              className="about-cta-text"
              variants={fadeInUp}
              custom={1}
            >
              Experience luxury transportation tailored just for you. Book now or get a personalized quote.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="about-cta-buttons"
            variants={fadeInUp}
            custom={2}
          >
            <motion.button
              className="about-cta-btn about-cta-btn-primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255, 179, 0, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/book')}
            >
              Book Your Ride Now
              <span className="about-cta-btn-icon">→</span>
            </motion.button>
            
            <motion.button
              className="about-cta-btn about-cta-btn-secondary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Personalized Quote
              <span className="about-cta-btn-icon">→</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
    {/* Footer */}
    <Footer />
    </>
  );
};

export default AboutPage;
