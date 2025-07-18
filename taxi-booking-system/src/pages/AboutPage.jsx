import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const team = [
  { name: 'Sam', role: 'Business Manager', icon: <DirectionsCarIcon /> },
  { name: 'Mahendar Nair', role: 'Managing Director', icon: <SecurityIcon /> },
  { name: 'Naf', role: 'Admin Manager', icon: <EmojiEventsIcon /> },
];

const AboutPage = () => (
  <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #f5f7fa 60%, #c3cfe2 100%)', py: 8 }}>
    <Container>
      <Paper elevation={6} sx={{ p: { xs: 2, sm: 6 }, borderRadius: 5, mb: 6 }}>
        <Typography variant="h3" color="primary" fontWeight={700} mb={2} align="center">About Us</Typography>
        <Typography variant="h6" align="center" mb={4}>
          TaxiBooker is dedicated to providing safe, reliable, and comfortable rides for everyone. Our mission is to make urban transportation seamless and enjoyable, with a focus on professionalism, punctuality, and customer satisfaction.
        </Typography>
        <Typography variant="body1" align="center" mb={2}>
          Founded in 2024, TaxiBooker was created to bridge the gap between traditional taxi services and modern ride-hailing apps. We believe in combining technology with a personal touch, ensuring every ride is a pleasant experience.
        </Typography>
        <Grid container spacing={4} justifyContent="center" mt={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 4 }}>
              <EmojiEventsIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={600}>Excellence</Typography>
              <Typography variant="body2">We strive for excellence in every ride, every time.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 4 }}>
              <SecurityIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={600}>Safety</Typography>
              <Typography variant="body2">Your safety is our top priority, with background-checked drivers and real-time tracking.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 4 }}>
              <DirectionsCarIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={600}>Innovation</Typography>
              <Typography variant="body2">We use the latest technology to make your journey smooth and efficient.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h4" color="primary" fontWeight={700} mb={4} align="center">Meet Our Team</Typography>
      <Grid container spacing={4} justifyContent="center">
        {team.map((member, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                {member.icon}
              </Avatar>
              <Typography fontWeight={600}>{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">{member.role}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default AboutPage; 