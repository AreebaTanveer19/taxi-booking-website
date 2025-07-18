import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Grid, Chip } from '@mui/material';

const mockRequests = [
  {
    id: 1,
    pickup: '123 Main St',
    dropoff: '456 Elm St',
    name: 'John Doe',
    status: 'pending',
  },
  {
    id: 2,
    pickup: '789 Oak Ave',
    dropoff: '321 Pine Rd',
    name: 'Jane Smith',
    status: 'pending',
  },
];

const DriverDashboard = () => {
  const [requests, setRequests] = useState(mockRequests);

  const handleAction = (id, action) => {
    setRequests(reqs =>
      reqs.map(r =>
        r.id === id
          ? { ...r, status: action === 'accept' ? 'accepted' : 'rejected' }
          : r
      )
    );
  };

  return (
    <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #f5f7fa 60%, #c3cfe2 100%)', py: 6 }}>
      <Paper elevation={6} sx={{ maxWidth: 600, mx: 'auto', p: 4, borderRadius: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom>Driver Dashboard</Typography>
        <Typography variant="subtitle1" mb={3}>New Ride Requests</Typography>
        <Grid container spacing={3}>
          {requests.map(req => (
            <Grid item xs={12} key={req.id}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 3, mb: 2 }}>
                <Typography><b>Pickup:</b> {req.pickup}</Typography>
                <Typography><b>Drop-off:</b> {req.dropoff}</Typography>
                <Typography><b>Passenger:</b> {req.name}</Typography>
                <Box mt={2} display="flex" gap={2} alignItems="center">
                  {req.status === 'pending' ? (
                    <>
                      <Button variant="contained" color="success" onClick={() => handleAction(req.id, 'accept')}>Accept</Button>
                      <Button variant="outlined" color="error" onClick={() => handleAction(req.id, 'reject')}>Reject</Button>
                    </>
                  ) : (
                    <Chip label={`Ride ${req.status.charAt(0).toUpperCase() + req.status.slice(1)}`} color={req.status === 'accepted' ? 'success' : 'error'} />
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default DriverDashboard; 