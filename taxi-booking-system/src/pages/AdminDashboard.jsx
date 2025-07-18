import React, { useState } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const mockBookings = [
  { id: 1, name: 'John Doe', pickup: '123 Main St', dropoff: '456 Elm St', carType: 'Sedan', date: '2024-06-01 10:00', status: 'Confirmed' },
  { id: 2, name: 'Jane Smith', pickup: '789 Oak Ave', dropoff: '321 Pine Rd', carType: 'Van', date: '2024-06-02 14:30', status: 'Confirmed' },
];

const AdminDashboard = () => {
  const [bookings, setBookings] = useState(mockBookings);

  const handleDelete = (id) => {
    setBookings(bks => bks.filter(b => b.id !== id));
  };

  const handleExport = () => {
    const csvRows = [
      ['Name', 'Pickup', 'Drop-off', 'Car Type', 'Date', 'Status'],
      ...bookings.map(b => [b.name, b.pickup, b.dropoff, b.carType, b.date, b.status]),
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
      <Paper elevation={6} sx={{ maxWidth: 900, mx: 'auto', p: 4, borderRadius: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" color="primary">Admin Dashboard</Typography>
          <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />} onClick={handleExport}>
            Export to CSV
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Drop-off</TableCell>
                <TableCell>Car Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(b => (
                <TableRow key={b.id}>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.pickup}</TableCell>
                  <TableCell>{b.dropoff}</TableCell>
                  <TableCell>{b.carType}</TableCell>
                  <TableCell>{b.date}</TableCell>
                  <TableCell>{b.status}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(b.id)}>
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