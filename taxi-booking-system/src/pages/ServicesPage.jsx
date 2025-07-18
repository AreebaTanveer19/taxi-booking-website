import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const services = [
  {
    name: 'Airport Transfers',
    icon: <FlightTakeoffIcon fontSize="large" />, 
    desc: 'Seamless airport pickups and drop-offs with real-time flight tracking and meet & greet service.',
    useCases: ['Domestic & International Flights', 'Family & Group Transfers', 'Business Travelers'],
  },
  {
    name: 'Corporate Transfers',
    icon: <BusinessCenterIcon fontSize="large" />, 
    desc: 'Professional rides for business meetings, conferences, and executive travel.',
    useCases: ['Meetings & Conferences', 'VIP Client Transfers', 'Corporate Events'],
  },
  {
    name: 'Wedding Transfers',
    icon: <EventIcon fontSize="large" />, 
    desc: 'Arrive in style for your special day with our luxury wedding transfer service.',
    useCases: ['Bride & Groom Arrival', 'Guest Shuttles', 'Reception Transfers'],
  },
  {
    name: 'Special Events',
    icon: <EmojiEventsIcon fontSize="large" />, 
    desc: 'Make every event memorable with our punctual and stylish event transfer service.',
    useCases: ['Concerts & Festivals', 'Birthday Parties', 'Sporting Events'],
  },
  {
    name: 'Executive Transfers',
    icon: <DirectionsCarIcon fontSize="large" />, 
    desc: 'Prestige and comfort for executives, with privacy and productivity features.',
    useCases: ['Board Meetings', 'Hotel Transfers', 'Airport Pickups'],
  },
  {
    name: 'Crew Transportation',
    icon: <AirportShuttleIcon fontSize="large" />, 
    desc: 'Efficient and reliable crew transport for airlines, film, and events.',
    useCases: ['Airline Crew', 'Film & TV Crews', 'Event Staff'],
  },
  {
    name: 'Parcel Delivery',
    icon: <LocalShippingIcon fontSize="large" />, 
    desc: 'Fast and secure parcel delivery for urgent and scheduled shipments.',
    useCases: ['Documents', 'Gifts', 'Business Deliveries'],
  },
];

const ServicesPage = () => (
  <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #f5f7fa 60%, #c3cfe2 100%)', py: 8 }}>
    <Container>
      <Typography variant="h3" color="primary" fontWeight={700} mb={6} align="center">Our Services</Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 8 } }}>
              {s.icon}
              <Typography variant="h6" fontWeight={600} mt={2}>{s.name}</Typography>
              <Typography variant="body2" mb={2}>{s.desc}</Typography>
              <List dense>
                {s.useCases.map((uc, idx) => (
                  <ListItem key={idx} sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary={uc} />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" color="primary">Learn More</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default ServicesPage; 