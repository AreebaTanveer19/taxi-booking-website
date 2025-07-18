import React from 'react';
import { Box, Typography, Paper, Button, Grid, Avatar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <Box minHeight="60vh" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6">No booking data found.</Typography>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" sx={{ background: 'linear-gradient(135deg, #f5f7fa 60%, #c3cfe2 100%)' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 5, minWidth: 350, maxWidth: 500 }}>
        <Typography variant="h4" color="primary" gutterBottom>Booking Confirmed!</Typography>
        <Typography variant="subtitle1" mb={2}>Thank you for booking your ride.</Typography>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}><LocationOnIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Pickup</Typography>
                <Typography>{booking.pickup}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}><LocationOnIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Drop-off</Typography>
                <Typography>{booking.dropoff}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}><DirectionsCarIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Car Type</Typography>
                <Typography>{booking.carType?.name}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}><PersonIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Passengers</Typography>
                <Typography>{booking.passengers}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}><DirectionsCarIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Luggage</Typography>
                <Typography>{booking.luggage}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'grey.700', width: 32, height: 32 }}><PersonIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Name</Typography>
                <Typography>{booking.name}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'grey.500', width: 32, height: 32 }}><EmailIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Email</Typography>
                <Typography>{booking.email}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'grey.800', width: 32, height: 32 }}><PhoneIcon /></Avatar>
              <Box>
                <Typography variant="subtitle2">Phone</Typography>
                <Typography>{booking.phone}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h6" color="primary" mb={2}>Estimated Fare: ${booking.estimatedFare}</Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ borderRadius: 3, mt: 2 }} onClick={() => navigate('/')}>Back to Home</Button>
      </Paper>
    </Box>
  );
};

export default BookingConfirmationPage; 