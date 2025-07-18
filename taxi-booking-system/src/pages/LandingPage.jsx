import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Avatar } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

const heroBg = 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const testimonials = [
  { name: 'Alice', text: 'Super easy to book and the driver was very professional!', rating: 5 },
  { name: 'Bob', text: 'Clean cars, on time, and great service. Highly recommend!', rating: 5 },
  { name: 'Priya', text: 'The best taxi experience I have had in the city.', rating: 4 },
];

const fleet = [
  { name: 'Luxury Sedan', icon: <DirectionsCarIcon fontSize="large" />, capacity: '1-4', desc: 'Premium comfort for up to 4 passengers.', rating: 5 },
  { name: 'Mercedes Sprinter', icon: <AirportShuttleIcon fontSize="large" />, capacity: '1-16', desc: 'Spacious van for groups and events.', rating: 4 },
  { name: 'Audi Q7', icon: <DirectionsCarIcon fontSize="large" />, capacity: '1-7', desc: 'Luxury SUV for up to 7 passengers.', rating: 5 },
  { name: 'Executive Car', icon: <DirectionsCarIcon fontSize="large" />, capacity: '1-4', desc: 'Executive comfort for business travel.', rating: 5 },
];

const services = [
  { name: 'Airport Transfers', icon: <FlightTakeoffIcon fontSize="large" />, desc: 'Seamless airport pickups and drop-offs.' },
  { name: 'Corporate Transfers', icon: <BusinessCenterIcon fontSize="large" />, desc: 'Professional rides for business needs.' },
  { name: 'Wedding Transfers', icon: <EventIcon fontSize="large" />, desc: 'Arrive in style for your special day.' },
  { name: 'Special Events', icon: <EmojiEventsIcon fontSize="large" />, desc: 'Make every event memorable with our service.' },
  { name: 'Executive Transfers', icon: <DirectionsCarIcon fontSize="large" />, desc: 'Prestige and comfort for executives.' },
  { name: 'Crew Transportation', icon: <AirportShuttleIcon fontSize="large" />, desc: 'Efficient and reliable crew transport.' },
  { name: 'Parcel Delivery', icon: <LocalShippingIcon fontSize="large" />, desc: 'Fast and secure parcel delivery.' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '60vh',
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', py: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Book Your Ride Instantly
          </Typography>
          <Typography variant="h5" mb={4}>
            Fast, reliable, and comfortable taxi service at your fingertips.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/book')}
            sx={{ fontWeight: 600, fontSize: '1.2rem', px: 4, py: 1.5, borderRadius: 3, boxShadow: 3 }}
          >
            Book a Ride
          </Button>
        </Container>
      </Box>

      {/* How it Works */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} align="center" mb={4} color="primary">
          How it Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <DirectionsCarIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" fontWeight={600}>Book</Typography>
              <Typography>Enter your ride details and book instantly or schedule ahead.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" fontWeight={600}>Ride</Typography>
              <Typography>Your driver arrives on time and you enjoy a safe, comfortable journey.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <EmojiEventsIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" fontWeight={600}>Arrive</Typography>
              <Typography>Reach your destination and pay easily. Rate your experience!</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Why Choose Us */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} align="center" mb={4} color="primary">
          Why Choose Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <ThumbUpIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={600}>Trusted & Professional</Typography>
              <Typography>All drivers are background-checked and highly rated.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <SecurityIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={600}>Safe & Secure</Typography>
              <Typography>We prioritize your safety with real-time tracking and support.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <EmojiEventsIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={600}>Award-Winning Service</Typography>
              <Typography>Voted best taxi service for 3 years in a row.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} align="center" mb={4} color="primary">
          What Our Riders Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((t, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>{t.name[0]}</Avatar>
                <Typography fontWeight={600}>{t.name}</Typography>
                <Typography variant="body2" mb={1}>{t.text}</Typography>
                <Box>
                  {[...Array(t.rating)].map((_, idx) => (
                    <StarIcon key={idx} color="warning" />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Fleet */}
      <Container id="fleet-section" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} align="center" mb={4} color="primary">
          Our Fleet
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {fleet.map((v, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                {v.icon}
                <Typography variant="h6" fontWeight={600} mt={2}>{v.name}</Typography>
                <Typography color="text.secondary" mb={1}>Capacity: {v.capacity}</Typography>
                <Typography variant="body2" mb={2}>{v.desc}</Typography>
                <Box mb={1}>
                  {[...Array(v.rating)].map((_, idx) => <StarIcon key={idx} color="warning" fontSize="small" />)}
                </Box>
                <Button variant="contained" color="primary">Get a Quote</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Services */}
      <Container id="services-section" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} align="center" mb={4} color="primary">
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 8 } }}>
                {s.icon}
                <Typography variant="h6" fontWeight={600} mt={2}>{s.name}</Typography>
                <Typography variant="body2" mb={2}>{s.desc}</Typography>
                <Button variant="outlined" color="primary">Learn More</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: '#fff', py: 4, mt: 8 }}>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={700}>TaxiBooker</Typography>
              <Typography variant="body2">&copy; {new Date().getFullYear()} TaxiBooker. All rights reserved.</Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign={{ xs: 'left', md: 'right' }}>
              <Typography variant="body2">Contact: info@taxibooker.com | +1 234 567 890</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 