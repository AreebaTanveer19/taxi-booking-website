import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, Autocomplete, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/BookingPage.css';
import { FaRoute, FaArrowRight, FaCar, FaCarSide, FaRegClock, FaUser, FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BookingPage = () => {
  const pickupAutocompleteRef = useRef(null);
  const dropoffAutocompleteRef = useRef(null);
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState('');
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCQTDN1TiKo-RdMrBtq8fDEfq8RepOIzFI';

  const [form, setForm] = useState({
    bookingMethod: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    serviceType: '',
    flightDetails: {
      flightNumber: '',
      flightTime: ''
    },
    terminal: '',
    luggage: '',
    specialInstructions: '',
    paymentMethod: 'Card',
    nameOnCard: '',
    cardType: 'Visa',
    expiryMonth: '',
    expiryYear: '',
    termsAccepted: false,
    vehiclePreference: '',
    date: '',
    time: '',
    expectedEndTime: '',
    passengers: 1,
    pickup: '',
    dropoff: '',
    distance: '',
    hasChildUnder7: false,
    babySeats: 0,
    boosterSeats: 0
  });

  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [directions, setDirections] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const SYDNEY_CENTER = { lat: -33.8688, lng: 151.2093 };
  const DEFAULT_ZOOM = 12;

  // Handler for pickup autocomplete
  const handlePickupPlaceChanged = () => {
    const place = pickupAutocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setForm(prev => ({ ...prev, pickup: place.formatted_address }));
    }
  };

  // Handler for dropoff autocomplete
  const handleDropoffPlaceChanged = () => {
    const place = dropoffAutocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setForm(prev => ({ ...prev, dropoff: place.formatted_address }));
    }
  };

  // Calculate distance when both pickup and dropoff are set
  useEffect(() => {
    const calculateDistance = async () => {
      if (form.pickup && form.dropoff && form.bookingMethod === 'distance') {
        setDistanceLoading(true);
        try {
          const service = new window.google.maps.DistanceMatrixService();
          const results = await service.getDistanceMatrix({
            origins: [form.pickup],
            destinations: [form.dropoff],
            travelMode: 'DRIVING',
          });
          const distance = results.rows[0].elements[0].distance.value;
          setForm(prev => ({ ...prev, distance }));
          setEstimatedFare(calculateFare(distance));
        } catch (error) {
          setDistanceError('Failed to calculate distance');
        } finally {
          setDistanceLoading(false);
        }
      }
    };
    calculateDistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.pickup, form.dropoff, form.bookingMethod]);

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return (end - start) / (1000 * 60); // Return duration in minutes
  };

  const calculateFare = (value) => {
    let fare = 0;
    if (form.bookingMethod === 'distance') {
      const baseFare = 5.00;
      const perMileRate = 2.50;
      const distanceInMiles = value * 0.000621371;
      fare = baseFare + (distanceInMiles * perMileRate);
    } else {
      // Time-based calculation
      const hourlyRates = {
        'Executive Sedan': 100,
        'Premium Sedan': 120,
        'Premium SUV': 110,
        'Luxury Van': 130,
        'Sprinter': 150
      };
      const hours = calculateDuration(form.time, form.expectedEndTime) / 60;
      fare = hours * (hourlyRates[form.vehiclePreference] || 50);
    }
    
    // Add seat charges
    if (form.hasChildUnder7) {
      fare += (form.babySeats * 10) + (form.boosterSeats * 10);
    }
    
    return fare.toFixed(2);
  };

  const calculateRoute = async () => {
    if (form.pickup && form.dropoff && window.google) {
      try {
        const directionsService = new window.google.maps.DirectionsService();
        
        const result = await new Promise((resolve, reject) => {
          directionsService.route({
            origin: form.pickup,
            destination: form.dropoff,
            travelMode: window.google.maps.TravelMode.DRIVING
          }, (result, status) => {
            if (status === 'OK') {
              resolve(result);
            } else {
              reject(status);
            }
          });
        });
        
        setDirections(result);
      } catch (error) {
        console.error('Error calculating route:', error);
      }
    }
  };

  useEffect(() => {
    if (mapLoaded && form.pickup && form.dropoff) {
      calculateRoute();
    }
  }, [form.pickup, form.dropoff, mapLoaded]);

  useEffect(() => {
    if (form.bookingMethod === 'distance') {
      calculateRoute();
    } else if (form.bookingMethod === 'time' && form.time && form.expectedEndTime) {
      setEstimatedFare(calculateFare(0));
    }
  }, [form.pickup, form.dropoff, form.time, form.expectedEndTime, form.bookingMethod]);

  // Google Maps API key validation
  if (!googleMapsApiKey) {
    console.error('Google Maps API key is missing');
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePhoneChange = (value) => {
    setForm(prev => ({ ...prev, phone: value }));
  };

  const handleVehicleChange = (e) => {
    const { value } = e.target;
    setForm(prev => ({
      ...prev,
      vehiclePreference: value
    }));
    
    // Recalculate fare if needed
    if (form.bookingMethod === 'distance' && form.distance) {
      setEstimatedFare(calculateFare(form.distance));
    } else if (form.bookingMethod === 'time' && form.time && form.expectedEndTime) {
      setEstimatedFare(calculateFare(0));
    }
  };

  const proceedToPayment = () => {
    let cost = 0;

    if (form.bookingMethod === 'distance') {
      const distance = parseFloat(form.distance) || 0;
      if (distance <= 0) {
        cost = 0;
      } else if (distance <= 5) {
        cost = 60;
      } else if (distance <= 10) {
        cost = 75; // 60 + 15
      } else if (distance <= 15) {
        cost = 90; // 75 + 15
      } else if (distance <= 20) {
        cost = 105; // 90 + 15
      } else if (distance <= 25) {
        cost = 120; // 105 + 15
      } else if (distance <= 30) {
        cost = 135; // 120 + 15
      } else { // distance > 30
        const costAt30km = 135;
        cost = costAt30km + (distance - 30) * 2;
      }
    } else { // 'time' based booking
      const start = new Date(`2000-01-01T${form.time}`);
      const end = new Date(`2000-01-01T${form.expectedEndTime}`);
      const hours = (end - start) / (1000 * 60 * 60);
      const hourlyRates = {
        'Executive Sedan': 60,
        'Premium Sedan': 80,
        'Luxury Van': 100,
        'Sprinter': 120
      };
      cost = hours * hourlyRates[form.vehiclePreference] || 0;
    }

    // Add surcharges
    let finalCost = cost;
    if (form.serviceType === 'Airport Transfers') {
      finalCost += 15; // Airport surcharge
      // Add variable toll tax based on terminal
      if (form.terminal === 'T1 International') {
        finalCost += 15;
      } else if (form.terminal === 'T2 Domestic') {
        finalCost += 11.5;
      } else if (form.terminal === 'T3 Domestic') {
        finalCost += 6.2;
      } else if (form.terminal === 'T4 Domestic') {
        finalCost += 6.2;
      }
    }
    if (form.hasChildUnder7) {
      finalCost += form.babySeats * 10;
      finalCost += form.boosterSeats * 10;
    }
    setEstimatedCost(finalCost.toFixed(2));
    setStep(3); // Move to payment page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Calculate final cost with all additional charges
    let finalCost = parseFloat(estimatedCost);
    if (form.hasChildUnder7) {
      finalCost += (form.babySeats * 10) + (form.boosterSeats * 10);
    }
    if (form.serviceType === 'Airport Transfers') {
      finalCost += 15; // Airport surcharge
      // Add variable toll tax based on terminal
      if (form.terminal === 'T1 International') {
        finalCost += 15;
      } else if (form.terminal === 'T2 Domestic') {
        finalCost += 11.5;
      } else if (form.terminal === 'T3 Domestic') {
        finalCost += 6.2;
      } else if (form.terminal === 'T4 Domestic') {
        finalCost += 6.2;
      }
    }

    const bookingData = { ...form, estimatedCost: finalCost.toFixed(2) };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Booking submitted! Admin has been notified.');
        setStep(1); // Optional: Reset form or redirect
      } else {
        alert('Booking failed. Please try again later.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  const renderStep1 = () => (
    <motion.div 
      className="step-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="step-title"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to Horizon Chauffeurs
      </motion.h2>
      
      <div className="wave-divider">
        <FaRoute className="wave-icon" />
      </div>
      
      <p className="step-subtitle">Choose the option that best fits your travel needs</p>
      
      <div className="booking-method-options">
        <motion.div 
          className={`booking-method-card ${selectedOption === 'distance' ? 'selected' : ''}`}
          onClick={() => {
            setForm({ ...form, bookingMethod: 'distance' });
            setSelectedOption('distance');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="method-icon">
            <FaCarSide className="animated-car" />
          </div>
          <h3>Distance-Based</h3>
          <p>Ideal for single trips from point A to point B</p>
        </motion.div>

        <motion.div 
          className={`booking-method-card ${selectedOption === 'time' ? 'selected' : ''}`}
          onClick={() => {
            setForm({ ...form, bookingMethod: 'time' });
            setSelectedOption('time');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="method-icon">
            <FaRegClock className="animated-clock" />
          </div>
          <h3>Time-Based</h3>
          <p>Perfect for hourly rentals and multiple stops</p>
        </motion.div>
      </div>
      
      {selectedOption && (
        <motion.button 
          className="continue-btn"
          onClick={() => setStep(2)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}
        >
          Continue to Booking <FaArrowRight />
        </motion.button>
      )}
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      className="step-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="step-title">Step 01: Booking Details</h2>
      <form className="omni-form">
        <div className="form-grid">
          {/* Service Details */}
          <div className="form-group">
            <label>City</label>
            <select name="city" value={form.city} onChange={handleInputChange}>
              <option value="">----Select your city---</option>
              <option value="Sydney">Sydney</option>
              <option value="Melbourne">Melbourne</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type of Service</label>
            <select name="serviceType" value={form.serviceType} onChange={handleInputChange} required>
              <option value="">-- Select a Service --</option>
              <option value="Corporate Transfers">Corporate Transfers</option>
              <option value="Airport Transfers">Airport Transfers</option>
              <option value="Wedding Car">Wedding Car</option>
              <option value="Parcel Delivery">Parcel Delivery</option>
              <option value="Special Events">Special Events</option>
              <option value="Point to Point">Point to Point</option>
            </select>
          </div>

          {form.serviceType === 'Airport Transfers' && (
            <div className="form-group">
              <label>Terminal</label>
              <select name="terminal" value={form.terminal} onChange={handleInputChange}>
                <option value="">-- Select Terminal --</option>
                
                {form.city === 'Sydney' && (
                  <>
                    <optgroup label="Sydney Airport Terminals">
                      <option value="T1 International">T1 International</option>
                      <option value="T2 Domestic">T2 Domestic</option>
                      <option value="T3 Domestic">T3 Domestic</option>
                    </optgroup>
                  </>
                )}
                
                {form.city === 'Melbourne' && (
                  <>
                    <optgroup label="Melbourne Airport Terminals">
                      <option value="T1 International">T1 International</option>
                      <option value="T2 Domestic">T2 Domestic</option>
                      <option value="T3 Domestic">T3 Domestic</option>
                      <option value="T4 Domestic">T4 Domestic</option>
                    </optgroup>
                  </>
                )}
              </select>
            </div>
          )}

          {form.serviceType === 'Airport Transfers' && (
            <>
              <div className="form-section-title">Flight Details</div>
              <div className="form-group">
                <label>Flight Number</label>
                <input 
                  type="text" 
                  name="flightNumber" 
                  value={form.flightDetails.flightNumber} 
                  onChange={(e) => setForm(prev => ({ ...prev, flightDetails: { ...prev.flightDetails, flightNumber: e.target.value } }))} 
                  placeholder="e.g. EK412"
                />
              </div>
              <div className="form-group">
                <label>Flight Time</label>
                <input 
                  type="time" 
                  name="flightTime" 
                  value={form.flightDetails.flightTime} 
                  onChange={(e) => setForm(prev => ({ ...prev, flightDetails: { ...prev.flightDetails, flightTime: e.target.value } }))}
                />
              </div>
            </> 
          )}

          {/* Pickup & Drop-off Fields BEFORE Vehicle */}
          {form.bookingMethod === 'distance' && (
            <>
              <div className="form-group">
                <label>Pickup Address</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={autocomplete => {
                      pickupAutocompleteRef.current = autocomplete;
                      autocomplete.setComponentRestrictions({ country: 'au' });
                    }}
                    onPlaceChanged={handlePickupPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={form.pickup}
                      onChange={(e) => setForm(prev => ({ ...prev, pickup: e.target.value }))}
                      required
                    />
                  </Autocomplete>
                </div>
              </div>
              <div className="form-group">
                <label>Drop-off Address</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={autocomplete => {
                      dropoffAutocompleteRef.current = autocomplete;
                      autocomplete.setComponentRestrictions({ country: 'au' });
                    }}
                    onPlaceChanged={handleDropoffPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Drop-off location"
                      value={form.dropoff}
                      onChange={(e) => setForm(prev => ({ ...prev, dropoff: e.target.value }))}
                      required
                    />
                  </Autocomplete>
                </div>
              </div>
            </>
          )}
          {form.bookingMethod === 'time' && (
            <>
              <div className="form-group">
                <label>Pickup Location</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={autocomplete => {
                      pickupAutocompleteRef.current = autocomplete;
                      autocomplete.setComponentRestrictions({ country: 'au' });
                    }}
                    onPlaceChanged={handlePickupPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={form.pickup}
                      onChange={(e) => setForm(prev => ({ ...prev, pickup: e.target.value }))}
                      required
                    />
                  </Autocomplete>
                </div>
              </div>
              <div className="form-group">
                <label>Dropoff Location</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={autocomplete => {
                      dropoffAutocompleteRef.current = autocomplete;
                      autocomplete.setComponentRestrictions({ country: 'au' });
                    }}
                    onPlaceChanged={handleDropoffPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Dropoff location"
                      value={form.dropoff}
                      onChange={(e) => setForm(prev => ({ ...prev, dropoff: e.target.value }))}
                      required
                    />
                  </Autocomplete>
                </div>
              </div>
            </>
          )}

          {/* Vehicle Preference */}
          <div className="form-group">
            <label>Vehicle Preference</label>
            <select name="vehiclePreference" value={form.vehiclePreference} onChange={handleVehicleChange} required>
              <option value="">-- Select a Vehicle --</option>
              <option value="Executive Sedan">Executive Sedan (1-3 Pax, 2 Suitcases) </option>
              <option value="Premium Sedan">Premium Sedan (1-3 Pax, 2 Suitcases)</option>
              <option value="Premium Sedan">Premium Sedan (1-4 Pax, 3 Suitcases 2 Carry On)</option>
              <option value="Luxury Van">Luxury Van (1-6 Pax, 5 Suitcases)</option>
              <option value="Sprinter">Sprinter (1-11 Pax 6 Suitcases/ Trailer)</option>
            </select>
          </div>

          {/* Child Under 7 Switch */}
          <div className="form-group">
            <label htmlFor="hasChildUnder7" style={{ display: 'block', marginBottom: '8px' }}>Do you have a child under 7?</label>
            <label className="switch">
              <input
                type="checkbox"
                id="hasChildUnder7"
                name="hasChildUnder7"
                checked={form.hasChildUnder7}
                onChange={handleInputChange}
              />
              <span className="slider round"></span>
            </label>
          </div>

          {/* Booster/Baby Seat Quantity Selectors */}
          {form.hasChildUnder7 && (
            <div className="form-group child-seats-group">
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="babySeats">Baby Seats Needed (Additional $10 each)</label>
                <input 
                  type="number" 
                  id="babySeats"
                  name="babySeats" 
                  min="0" 
                  max="3" 
                  value={form.babySeats || 0} 
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="boosterSeats">Booster Seats Needed (Additional $10 each)</label>
                <input 
                  type="number" 
                  id="boosterSeats"
                  name="boosterSeats" 
                  min="0" 
                  max="3" 
                  value={form.boosterSeats || 0} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {/* Luggage and Passengers side by side */}
          <div className="form-group">
            <label>Luggage</label>
            <input type="text" name="luggage" value={form.luggage} onChange={handleInputChange} placeholder="e.g., 2 large bags" />
          </div>
          <div className="form-group">
            <label>Passengers</label>
            <input type="number" name="passengers" min="1" max="24" value={form.passengers} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input type="time" name="time" value={form.time} onChange={handleInputChange} required />
          </div>
          {form.bookingMethod === 'distance' && form.distance && (
            <p className="distance-display">
              Distance: {(form.distance / 1000).toFixed(1)} km
            </p>
          )}
          {form.bookingMethod === 'distance' && (
            <p className="fare-estimate">
              Estimated Price: ${estimatedFare}
            </p>
          )}
          {form.bookingMethod === 'time' && (
            <div className="form-group">
              <label>Expected End Time</label>
              <input 
                type="time" 
                name="expectedEndTime" 
                value={form.expectedEndTime} 
                onChange={handleInputChange} 
                min={form.time}
                required
              />
              {form.expectedEndTime && (
                <p className="fare-estimate">
                  Estimated Price: ${estimatedFare}
                </p>
              )}
            </div>
          )}

          {/* Google Map Embed after baby seat */}
          <div className="form-group full-width booking-map-embed" style={{margin: '1.5rem 0'}}>
            <div className="route-map map-container" style={{ height: '300px' }}>
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                zoom={DEFAULT_ZOOM}
                center={directions?.routes[0]?.bounds?.getCenter() || SYDNEY_CENTER}
                onLoad={() => setMapLoaded(true)}
                options={{
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false
                }}
              >
                {directions && <DirectionsRenderer 
                  directions={directions} 
                  options={{
                    polylineOptions: {
                      strokeColor: '#1976D2',
                      strokeOpacity: 0.8,
                      strokeWeight: 4
                    },
                    suppressMarkers: false,
                    markerOptions: {
                      clickable: false
                    }
                  }}
                />}
              </GoogleMap>
            </div>
          </div>

          {/* Personal & Journey Details */}
          <h2 className="form-section-title">Your Details</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <PhoneInput country={'au'} value={form.phone} onChange={handlePhoneChange} />
          </div>
          
          <div className="form-group full-width">
            <label>Special Instructions (Optional)</label>
            <textarea name="specialInstructions" value={form.specialInstructions} onChange={handleInputChange} rows="10" placeholder="Any special requests?"></textarea>
          </div>
        </div>
        <div className="form-actions">
            <button type="button" onClick={() => setStep(1)}>Back</button>
            <button type="button" onClick={proceedToPayment}>Proceed to Payment</button>
        </div>
      </form>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      className="step-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {form.paymentMethod === 'Card' && (
        <>
          <h3 className="form-section-title">Payment Details</h3>
          <div className="form-group">
            <label>Name on Card</label>
            <input type="text" name="nameOnCard" value={form.nameOnCard} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Card Type</label>
            <select name="cardType" value={form.cardType} onChange={handleInputChange}>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Amex">American Express</option>
            </select>
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" name="cardNumber" placeholder="xxxx xxxx xxxx xxxx" className="form-control" />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <div className="expiry-date-fields">
              <select name="expiryMonth" value={form.expiryMonth} onChange={handleInputChange} required>
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                ))}
              </select>
              <select name="expiryYear" value={form.expiryYear} onChange={handleInputChange} required>
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>CVC</label>
            <input type="text" name="cvc" placeholder="123" className="form-control" />
          </div>
          <h3 className="form-section-title">Terms and Conditions</h3>
          <div className="form-group full-width">
            <label className="checkbox-label">
              <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleInputChange} required />
              I accept the terms and conditions.
            </label>
          </div>
        </>
      )}
      <div className="form-actions">
        <button type="button" onClick={() => setStep(2)}>Back</button>
        <button type="button" onClick={() => setStep(4)}>View Summary</button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => {
    // Safely calculate and format fare with fallbacks
    const rawFare = calculateFare(form);
    console.log('Fare calculation raw output:', rawFare, typeof rawFare);
    
    const fare = Number(rawFare) || 0;
    const totalFare = fare.toFixed(2);
    
    // Fallback UI if calculation fails
    if (!rawFare || isNaN(fare)) {
      console.warn('Invalid fare calculation - using fallback value');
      return (
        <motion.div className="step-container">
          <h2 className="step-title">Booking Summary</h2>
          <div className="error-message">
            <p>We're having trouble calculating your fare.</p>
            <button 
              className="back-button" 
              onClick={() => setStep(3)}
            >
              Back to Payment
            </button>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div className="step-container">
        <h2 className="step-title">Booking Summary</h2>
        
        {/* Booking Information */}
        <div className="summary-section">
          <h3 className="summary-section-title">
            <FaRoute /> Booking Information
          </h3>
          <div className="summary-row">
            <span className="summary-label">Booking Method:</span>
            <span className="summary-value">
              {form.bookingMethod === 'distance' ? 'Distance-Based' : 'Time-Based'}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Pickup Location:</span>
            <span className="summary-value">{form.pickup || 'Not specified'}</span>
          </div>
          {form.dropoff && (
            <div className="summary-row">
              <span className="summary-label">Drop-off Location:</span>
              <span className="summary-value">{form.dropoff}</span>
            </div>
          )}
          {form.distance && (
            <div className="summary-row">
              <span className="summary-label">Distance:</span>
              <span className="summary-value">{(form.distance / 1000).toFixed(1)} km</span>
            </div>
          )}
          {form.expectedEndTime && (
            <div className="summary-row">
              <span className="summary-label">Duration:</span>
              <span className="summary-value">
                {calculateDuration(form.time, form.expectedEndTime)} minutes
              </span>
            </div>
          )}
        </div>
        
        {/* Passenger Details */}
        <div className="summary-section">
          <h3 className="summary-section-title">
            <FaUser /> Passenger Details
          </h3>
          <div className="summary-row">
            <span className="summary-label">Full Name:</span>
            <span className="summary-value">{form.name || 'Not specified'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Phone Number:</span>
            <span className="summary-value">{form.phone || 'Not specified'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Email:</span>
            <span className="summary-value">{form.email || 'Not specified'}</span>
          </div>
        </div>
        
        {/* Trip Preferences */}
        <div className="summary-section">
          <h3 className="summary-section-title">
            <FaCar /> Trip Preferences
          </h3>
          <div className="summary-row">
            <span className="summary-label">Vehicle Type:</span>
            <span className="summary-value">{form.vehiclePreference || 'Not specified'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Baby Seat:</span>
            <span className="summary-value">{form.hasChildUnder7 ? `Yes (${form.babySeats})` : 'No'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Booster Seat:</span>
            <span className="summary-value">{form.hasChildUnder7 ? `Yes (${form.boosterSeats})` : 'No'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Airport Pickup:</span>
            <span className="summary-value">{form.serviceType === 'Airport Transfers' ? 'Yes' : 'No'}</span>
          </div>
          {form.serviceType === 'Airport Transfers' && (
            <div className="summary-row">
              <span className="summary-label">Terminal Tolls:</span>
              <span className="summary-value">{form.terminal ? 'Included' : 'Not applicable'}</span>
            </div>
          )}
        </div>
        
        {/* Payment Info */}
        <div className="summary-section">
          <h3 className="summary-section-title">
            <FaCreditCard /> Payment Info
          </h3>
          <div className="summary-row">
            <span className="summary-label">Payment Method:</span>
            <span className="summary-value">{form.paymentMethod}</span>
          </div>
        </div>
        
        {/* Estimated Total */}
        <div className="estimated-total">
          <h3>Estimated Total</h3>
          <p className="total-amount">${totalFare}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="payment-confirmation-buttons">
          <motion.button 
            type="button" 
            onClick={() => setStep(3)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>
          
          <motion.button 
            type="button" 
            onClick={handleSubmit}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm Booking
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <div className="booking-page-root">
        <div className="booking-form-container">
          {/* Progress Indicator */}
          <div className="progress-indicator">
            <div className={`progress-step${step === 1 ? ' active' : step > 1 ? ' completed' : ''}`}>1</div>
            <div className="progress-bar"></div>
            <div className={`progress-step${step === 2 ? ' active' : step > 2 ? ' completed' : ''}`}>2</div>
            <div className="progress-bar"></div>
            <div className={`progress-step${step === 3 ? ' active' : step > 3 ? ' completed' : ''}`}>3</div>
            <div className="progress-bar"></div>
            <div className={`progress-step${step === 4 ? ' active' : ''}`}>4</div>
          </div>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </LoadScript>
  );
};

export default BookingPage;