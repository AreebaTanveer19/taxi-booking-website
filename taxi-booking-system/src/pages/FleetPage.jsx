import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const fleet = [
  {
    name: 'Luxury Sedan',
    icon: <DirectionsCarIcon fontSize="large" />, 
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
    capacity: '1-4',
    desc: 'Premium comfort for up to 4 passengers. Ideal for airport transfers, business trips, and city rides.',
    features: ['AC', 'Leather Seats', 'WiFi', 'Bottled Water'],
    rating: 5
  },
  {
    name: 'Mercedes Sprinter',
    icon: <AirportShuttleIcon fontSize="large" />, 
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
    capacity: '1-16',
    desc: 'Spacious van for groups and events. Perfect for tours, weddings, and large airport transfers.',
    features: ['AC', 'Reclining Seats', 'Luggage Space', 'Group Travel'],
    rating: 4
  },
  {
    name: 'Audi Q7',
    icon: <DirectionsCarIcon fontSize="large" />, 
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    capacity: '1-7',
    desc: 'Luxury SUV for up to 7 passengers. Great for family trips, VIP guests, and executive travel.',
    features: ['AC', 'Leather Seats', 'Panoramic Roof', 'Child Seat'],
    rating: 5
  },
  {
    name: 'Executive Car',
    icon: <DirectionsCarIcon fontSize="large" />, 
    image: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80',
    capacity: '1-4',
    desc: 'Executive comfort for business travel. Discreet, stylish, and equipped for productivity on the go.',
    features: ['AC', 'Tinted Windows', 'WiFi', 'Phone Charger'],
    rating: 5
  },
];

const FleetPage = () => (
  <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #f5f7fa 60%, #c3cfe2 100%)', py: 8 }}>
    <Container>
      <Typography variant="h3" color="primary" fontWeight={700} mb={6} align="center">Our Fleet</Typography>
      <Grid container spacing={4} justifyContent="center">
        {fleet.map((v, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper elevation={3} sx={{ p: 0, textAlign: 'center', borderRadius: 4, overflow: 'hidden', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
              <Box sx={{ height: 160, background: `url(${v.image}) center/cover`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {v.icon}
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} mt={2}>{v.name}</Typography>
                <Typography color="text.secondary" mb={1}>Capacity: {v.capacity}</Typography>
                <Typography variant="body2" mb={2}>{v.desc}</Typography>
                <List dense>
                  {v.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Box mb={1}>
                  {[...Array(v.rating)].map((_, idx) => <StarIcon key={idx} color="warning" fontSize="small" />)}
                </Box>
                <Button variant="contained" color="primary">Get a Quote</Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default FleetPage; 