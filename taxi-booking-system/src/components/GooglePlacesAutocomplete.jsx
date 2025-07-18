import React, { useRef } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';

const libraries = ['places'];

const GooglePlacesAutocomplete = ({ label, value, onChange }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your key
    libraries,
  });
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      onChange(place.formatted_address);
    }
  };

  if (!isLoaded) return <TextField label={label} value={value} fullWidth disabled />;

  return (
    <Autocomplete
      onLoad={ref => (autocompleteRef.current = ref)}
      onPlaceChanged={handlePlaceChanged}
    >
      <TextField
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        fullWidth
        margin="normal"
      />
    </Autocomplete>
  );
};

export default GooglePlacesAutocomplete; 