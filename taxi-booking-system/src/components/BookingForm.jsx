import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography, Paper, TextField, Grid, Fade, Avatar, useTheme } from '@mui/material';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import CarTypeSelector from './CarTypeSelector';
import MapPreview from './MapPreview';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Pickup & Drop-off',
  'Date & Time',
  'Car Type',
  'Passenger & Luggage',
  'User Info',
  'Quote & Summary',
];

const mockCarTypes = [
  { name: 'Sedan', icon: 'sedan', baseFare: 20, _id: '1' },
  { name: 'Van', icon: 'van', baseFare: 30, _id: '2' },
  { name: 'Taxi', icon: 'taxi', baseFare: 25, _id: '3' },
];

const initialState = {
  pickup: '',
  dropoff: '',
  date: '',
  carType: null,
  passengers: 1,
  luggage: 0,
  name: '',
  email: '',
  phone: '',
};

const getQuote = (pickup, dropoff, carType) => {
  if (!pickup || !dropoff || !carType) return 0;
  // Simple mock: base fare + $2/km (fake 10km for demo)
  return carType.baseFare + 2 * 10;
};

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [stepKey, setStepKey] = useState(0); // for transition
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateStep = () => {
    let err = {};
    if (activeStep === 0) {
      if (!form.pickup) err.pickup = 'Pickup required';
      if (!form.dropoff) err.dropoff = 'Drop-off required';
    }
    if (activeStep === 1) {
      if (!form.date) err.date = 'Date/time required';
    }
    if (activeStep === 2) {
      if (!form.carType) err.carType = 'Select a car type';
    }
    if (activeStep === 4) {
      if (!form.name) err.name = 'Name required';
      if (!form.email) err.email = 'Email required';
      if (!form.phone) err.phone = 'Phone required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prev => prev + 1);
      setStepKey(prev => prev + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setStepKey(prev => prev + 1);
  };

  const handleConfirm = () => {
    const estimatedFare = getQuote(form.pickup, form.dropoff, form.carType);
    navigate('/confirmation', { state: { booking: { ...form, estimatedFare } } });
  };

  // Step content
  const StepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <GooglePlacesAutocomplete
              label="Pickup Location"
              value={form.pickup}
              onChange={val => handleChange('pickup', val)}
            />
            {errors.pickup && <Typography color="error">{errors.pickup}</Typography>}
            <GooglePlacesAutocomplete
              label="Drop-off Location"
              value={form.dropoff}
              onChange={val => handleChange('dropoff', val)}
            />
            {errors.dropoff && <Typography color="error">{errors.dropoff}</Typography>}
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Pickup Date & Time"
              type="datetime-local"
              value={form.date}
              onChange={e => handleChange('date', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
          </>
        );
      case 2:
        return (
          <>
            <CarTypeSelector
              carTypes={mockCarTypes}
              selectedCarType={form.carType}
              onSelect={car => handleChange('carType', car)}
            />
            {errors.carType && <Typography color="error">{errors.carType}</Typography>}
          </>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Passengers"
                type="number"
                value={form.passengers}
                onChange={e => handleChange('passengers', Math.max(1, Number(e.target.value)))}
                fullWidth
                InputProps={{ inputProps: { min: 1, max: 8 } }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Luggage"
                type="number"
                value={form.luggage}
                onChange={e => handleChange('luggage', Math.max(0, Number(e.target.value)))}
                fullWidth
                InputProps={{ inputProps: { min: 0, max: 8 } }}
                margin="normal"
              />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <>
            <TextField
              label="Name"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </>
        );
      case 5:
        return (
          <Box>
            <Typography variant="h6" mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DirectionsCarIcon color="primary" /> Booking Summary
            </Typography>
            <Grid container spacing={2} mb={1}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <LocationOnIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Pickup</Typography>
                    <Typography>{form.pickup}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                    <LocationOnIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Drop-off</Typography>
                    <Typography>{form.dropoff}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>
                    <DirectionsCarIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Car Type</Typography>
                    <Typography>{form.carType?.name}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Passengers</Typography>
                    <Typography>{form.passengers}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                    <DirectionsCarIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Luggage</Typography>
                    <Typography>{form.luggage}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'grey.700', width: 32, height: 32 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Name</Typography>
                    <Typography>{form.name}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'grey.500', width: 32, height: 32 }}>
                    <EmailIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography>{form.email}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: 'grey.800', width: 32, height: 32 }}>
                    <PhoneIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Phone</Typography>
                    <Typography>{form.phone}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="h6" color="primary" mb={2}>
              Estimated Fare: ${getQuote(form.pickup, form.dropoff, form.carType)}
            </Typography>
            <MapPreview origin={form.pickup} destination={form.dropoff} />
            <Box mt={2}>
              <Button variant="contained" color="success" size="large" fullWidth sx={{ borderRadius: 3, boxShadow: 3 }} onClick={handleConfirm}>
                Confirm Booking
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 60%, ${theme.palette.primary.light} 100%)`,
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: { xs: 2, sm: 4 },
          borderRadius: 5,
          boxShadow: 8,
          background: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ mb: 4, '.MuiStepIcon-root.Mui-active': { color: 'primary.main' }, '.MuiStepIcon-root.Mui-completed': { color: 'success.main' } }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box minHeight={220} mb={3}>
          <Fade in key={stepKey} timeout={500}>
            <div>
              <StepContent />
            </div>
          </Fade>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{ borderRadius: 3, px: 3 }}
          >
            Back
          </Button>
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ borderRadius: 3, px: 4, boxShadow: 3, fontWeight: 600 }}
            >
              {activeStep === steps.length - 2 ? 'Review' : 'Next'}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingForm; 