import React, { useState, useRef, useEffect } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import '../QuoteForm/QuoteForm.css';

const libraries = ['places'];

const QuoteForm = ({ isOpen, onClose, onSubmit }) => {
  const pickupAutocompleteRef = useRef(null);
  const dropoffAutocompleteRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState({
    pickup: null,
    dropoff: null
  });
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    
    // Location Info
    pickupLocation: '',
    dropoffLocation: '',
    
    // Passengers Info
    adults: '',
    kidsUnder4: '',
    kids5to8: '',
    
    // Luggage Info
    smallLuggage: '',
    largeLuggage: '',
    
    // Date and Time
    date: '',
    time: '',
    
    // Additional Info
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onLoad = (autocomplete, field) => {
    setAutocomplete(prev => ({
      ...prev,
      [field]: autocomplete
    }));
  };

  const onPlaceChanged = (field) => {
    if (autocomplete[field]) {
      const place = autocomplete[field].getPlace();
      if (place && place.formatted_address) {
        setFormData(prev => ({
          ...prev,
          [`${field}Location`]: place.formatted_address
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        pickupLocation: '',
        dropoffLocation: '',
        adults: '',
        kidsUnder4: '',
        kids5to8: '',
        smallLuggage: '',
        largeLuggage: '',
        date: '',
        time: '',
        additionalInfo: ''
      });
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quote-form-overlay">
      <div className="quote-form-container">
        <div className="quote-form-header">
          <h2>Get Personalized Quote</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          libraries={libraries}
          loadingElement={<div>Loading...</div>}
        >
          <form onSubmit={handleSubmit} className="quote-form">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="form-section">
            <h3>Trip Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pickupLocation">Pickup Location *</label>
                <Autocomplete
                  onLoad={(autocomplete) => onLoad(autocomplete, 'pickup')}
                  onPlaceChanged={() => onPlaceChanged('pickup')}
                  options={{
                    componentRestrictions: { country: 'au' },
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['address']
                  }}
                >
                  <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                    placeholder="Enter pickup address"
                    className="autocomplete-input"
                    ref={pickupAutocompleteRef}
                  />
                </Autocomplete>
              </div>
              <div className="form-group">
                <label htmlFor="dropoffLocation">Drop-off Location *</label>
                <Autocomplete
                  onLoad={(autocomplete) => onLoad(autocomplete, 'dropoff')}
                  onPlaceChanged={() => onPlaceChanged('dropoff')}
                  options={{
                    componentRestrictions: { country: 'au' },
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['address']
                  }}
                >
                  <input
                    type="text"
                    id="dropoffLocation"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    required
                    placeholder="Enter drop-off address"
                    className="autocomplete-input"
                    ref={dropoffAutocompleteRef}
                  />
                </Autocomplete>
              </div>
            </div>
          </div>

          {/* Passengers Information */}
          <div className="form-section">
            <h3>Passenger Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="adults">Adults *</label>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Number of adults"
                />
              </div>
              <div className="form-group">
                <label htmlFor="kidsUnder4">Kids (Under 4 years)</label>
                <input
                  type="number"
                  id="kidsUnder4"
                  name="kidsUnder4"
                  value={formData.kidsUnder4}
                  onChange={handleChange}
                  min="0"
                  placeholder="Number of kids under 4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="kids5to8">Kids (5-8 years)</label>
                <input
                  type="number"
                  id="kids5to8"
                  name="kids5to8"
                  value={formData.kids5to8}
                  onChange={handleChange}
                  min="0"
                  placeholder="Number of kids 5-8 years"
                />
              </div>
            </div>
          </div>

          {/* Luggage Information */}
          <div className="form-section">
            <h3>Luggage Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="smallLuggage">Small Luggage</label>
                <input
                  type="number"
                  id="smallLuggage"
                  name="smallLuggage"
                  value={formData.smallLuggage}
                  onChange={handleChange}
                  min="0"
                  placeholder="Number of small bags"
                />
              </div>
              <div className="form-group">
                <label htmlFor="largeLuggage">Large Luggage</label>
                <input
                  type="number"
                  id="largeLuggage"
                  name="largeLuggage"
                  value={formData.largeLuggage}
                  onChange={handleChange}
                  min="0"
                  placeholder="Number of large bags"
                />
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="form-section">
            <h3>Date and Time</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label htmlFor="additionalInfo">Special Requests or Notes</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows="3"
                placeholder="Any special requirements or additional information..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get Quote'}
            </button>
          </div>
          </form>
        </LoadScript>
      </div>
    </div>
  );
};

export default QuoteForm;
