import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button } from '@mui/material';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #f5f7fa 60%, #c3cfe2 100%)', py: 8 }}>
      <Container>
        <Paper elevation={6} sx={{ p: { xs: 2, sm: 6 }, borderRadius: 5, mb: 6 }}>
          <Typography variant="h3" color="primary" fontWeight={700} mb={2} align="center">Contact Us</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  type="email"
                />
                <TextField
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  multiline
                  rows={4}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Send Message
                </Button>
                {submitted && <Typography color="success.main" mt={2}>Thank you for contacting us!</Typography>}
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={3}>
                <Typography variant="h6" fontWeight={600}>Contact Information</Typography>
                <Typography>Email: info@taxibooker.com</Typography>
                <Typography>Phone: +1 234 567 890</Typography>
                <Typography>Address: 123 Main St, Sydney, NSW 2000</Typography>
              </Box>
              <Box sx={{ width: '100%', height: 220, bgcolor: 'grey.300', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">[Map Placeholder]</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactPage; 