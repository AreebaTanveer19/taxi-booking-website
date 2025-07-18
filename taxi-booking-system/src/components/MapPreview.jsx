import React, { useRef, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: 12,
  marginTop: 16,
};

const MapPreview = ({ origin, destination }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your key
    libraries: ['places'],
  });
  const [directions, setDirections] = React.useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (isLoaded && origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          }
        }
      );
    }
  }, [isLoaded, origin, destination]);

  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={300}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 0, lng: 0 }}
      zoom={2}
      onLoad={map => (mapRef.current = map)}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapPreview; 