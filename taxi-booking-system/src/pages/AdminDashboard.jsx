import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/bookings/all')
      .then(res => res.json())
      .then(data => {
        if (data.success) setBookings(data.bookings);
      });
  }, []);

  // Sort bookings by date (descending)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB - dateA;
  });

  // Filter bookings by search
  const filteredBookings = sortedBookings.filter(b => {
    const values = [
      b.userId?.name, b.userId?.email, b.userId?.phone,
      b.bookingMethod, b.city, b.serviceType, b.flightNumber, b.flightTime, b.luggage, b.specialInstructions,
      b.paymentMethod, b.nameOnCard, b.cardType, b.expiryMonth, b.expiryYear, b.termsAccepted ? 'Yes' : 'No',
      b.vehiclePreference, b.date, b.time, b.passengers, b.babySeat ? 'Yes' : 'No',
      b.pickup, b.dropoff, b.distance, b.pickupPostcode, b.dropoffPostcode, b.estimatedCost, b.status
    ];
    return values.some(val => val && val.toString().toLowerCase().includes(search.toLowerCase()));
  });

  const handleDelete = (id) => {
    setBookings(bks => bks.filter(b => b._id !== id));
  };

  const handleExport = () => {
    const csvRows = [
      [
        'Name', 'Email', 'Phone',
        'Booking Method', 'City', 'Service Type', 'Flight Number', 'Flight Time', 'Luggage', 'Special Instructions',
        'Payment Method', 'Name On Card', 'Card Type', 'Expiry Month', 'Expiry Year', 'Terms Accepted',
        'Vehicle Preference', 'Date', 'Time', 'Passengers', 'Baby Seat',
        'Pickup', 'Dropoff', 'Distance', 'Pickup Postcode', 'Dropoff Postcode', 'Estimated Cost', 'Status'
      ],
      ...filteredBookings.map(b => [
        b.userId?.name || '',
        b.userId?.email || '',
        b.userId?.phone || '',
        b.bookingMethod,
        b.city,
        b.serviceType,
        b.flightNumber,
        b.flightTime,
        b.luggage,
        b.specialInstructions,
        b.paymentMethod,
        b.nameOnCard,
        b.cardType,
        b.expiryMonth,
        b.expiryYear,
        b.termsAccepted ? 'Yes' : 'No',
        b.vehiclePreference,
        b.date,
        b.time,
        b.passengers,
        b.babySeat ? 'Yes' : 'No',
        b.pickup,
        b.dropoff,
        b.distance,
        b.pickupPostcode,
        b.dropoffPostcode,
        b.estimatedCost,
        b.status || 'Confirmed',
      ]),
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #f5f7fa 60%, #c3cfe2 100%)', py: 6 }}>
      <Paper elevation={6} sx={{ maxWidth: 1800, mx: 'auto', p: 4, borderRadius: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" color="primary">Admin Dashboard</Typography>
          <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />} onClick={handleExport}>
            Export to CSV
          </Button>
        </Box>
        <Box mb={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search bookings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 350 }}
          />
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Booking Method</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Flight Number</TableCell>
                <TableCell>Flight Time</TableCell>
                <TableCell>Luggage</TableCell>
                <TableCell>Special Instructions</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Name On Card</TableCell>
                <TableCell>Card Type</TableCell>
                <TableCell>Expiry Month</TableCell>
                <TableCell>Expiry Year</TableCell>
                <TableCell>Terms Accepted</TableCell>
                <TableCell>Vehicle Preference</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Passengers</TableCell>
                <TableCell>Baby Seat</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Dropoff</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Pickup Postcode</TableCell>
                <TableCell>Dropoff Postcode</TableCell>
                <TableCell>Estimated Cost</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map(b => (
                <TableRow key={b._id}>
                  <TableCell>{b.userId?.name || ''}</TableCell>
                  <TableCell>{b.userId?.email || ''}</TableCell>
                  <TableCell>{b.userId?.phone || ''}</TableCell>
                  <TableCell>{b.bookingMethod}</TableCell>
                  <TableCell>{b.city}</TableCell>
                  <TableCell>{b.serviceType}</TableCell>
                  <TableCell>{b.flightNumber}</TableCell>
                  <TableCell>{b.flightTime}</TableCell>
                  <TableCell>{b.luggage}</TableCell>
                  <TableCell>{b.specialInstructions}</TableCell>
                  <TableCell>{b.paymentMethod}</TableCell>
                  <TableCell>{b.nameOnCard}</TableCell>
                  <TableCell>{b.cardType}</TableCell>
                  <TableCell>{b.expiryMonth}</TableCell>
                  <TableCell>{b.expiryYear}</TableCell>
                  <TableCell>{b.termsAccepted ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{b.vehiclePreference}</TableCell>
                  <TableCell>{b.date}</TableCell>
                  <TableCell>{b.time}</TableCell>
                  <TableCell>{b.passengers}</TableCell>
                  <TableCell>{b.babySeat ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{b.pickup}</TableCell>
                  <TableCell>{b.dropoff}</TableCell>
                  <TableCell>{b.distance}</TableCell>
                  <TableCell>{b.pickupPostcode}</TableCell>
                  <TableCell>{b.dropoffPostcode}</TableCell>
                  <TableCell>{b.estimatedCost}</TableCell>
                  <TableCell>{b.status || 'Confirmed'}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(b._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard; 