import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const icons = {
  sedan: <DirectionsCarIcon fontSize="large" />,
  van: <AirportShuttleIcon fontSize="large" />,
  taxi: <LocalTaxiIcon fontSize="large" />,
};

const CarTypeSelector = ({ carTypes, selectedCarType, onSelect }) => (
  <Grid container spacing={2} justifyContent="center">
    {carTypes.map((car) => (
      <Grid item xs={12} sm={4} key={car._id || car.name}>
        <Card
          variant={selectedCarType && selectedCarType.name === car.name ? 'outlined' : 'elevation'}
          sx={{
            border: selectedCarType && selectedCarType.name === car.name ? '2px solid #1976d2' : '',
            boxShadow: selectedCarType && selectedCarType.name === car.name ? 4 : 1,
            transition: '0.2s',
          }}
        >
          <CardActionArea onClick={() => onSelect(car)}>
            <CardContent sx={{ textAlign: 'center' }}>
              {icons[car.icon] || <DirectionsCarIcon fontSize="large" />}
              <Typography variant="h6" mt={1}>{car.name}</Typography>
              <Typography color="text.secondary">From ${car.baseFare}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default CarTypeSelector; 