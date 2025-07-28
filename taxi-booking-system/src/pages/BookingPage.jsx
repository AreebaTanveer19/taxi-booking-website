import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/BookingPage.css';
import { FaRoute, FaArrowRight, FaCar, FaCarSide, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [form, setForm] = useState({
    bookingMethod: '', // 'distance' or 'time'
    city: '',
    serviceType: '',
    flightDetails: {
      flightNumber: '',
      flightTime: '',
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
    passengers: 1,

    pickup: '',
    dropoff: '',
    distance: '',
    pickupPostcode: '',
    dropoffPostcode: '',
    hasChildUnder7: false,
    boosterSeatQty: 0,
    babySeatQty: 0,
  });
  const [estimatedCost, setEstimatedCost] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePhoneChange = (value) => {
    setForm(prev => ({ ...prev, phone: value }));
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
      cost = 100; // Base fare for hourly
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
      finalCost += form.boosterSeatQty * 10;
      finalCost += form.babySeatQty * 15;
    }
    setEstimatedCost(finalCost.toFixed(2));
    setStep(3); // Move to payment page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const bookingData = { ...form, estimatedCost };
  
    try {
      const response = await fetch('http://localhost:5000/api/bookings/book', {
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
          <div className="form-group">
            <label>{form.bookingMethod === 'time' ? 'Pickup Location' : 'Pickup Address'}</label>
            <input type="text" name="pickup" value={form.pickup} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Pickup Postcode</label>
            <input type="text" name="pickupPostcode" value={form.pickupPostcode} onChange={handleInputChange} required />
          </div>
          {form.bookingMethod === 'distance' && (
            <>
              <div className="form-group">
                <label>Drop-off Address</label>
                <input type="text" name="dropoff" value={form.dropoff} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Drop-off Postcode</label>
                <input type="text" name="dropoffPostcode" value={form.dropoffPostcode} onChange={handleInputChange} required />
              </div>
            </>
          )}

          {/* Vehicle Preference */}
          <div className="form-group">
            <label>Vehicle Preference</label>
            <select name="vehiclePreference" value={form.vehiclePreference} onChange={handleInputChange} required>
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
                <label htmlFor="boosterSeatQty">Booster Seat Quantity</label>
                <input
                  type="number"
                  id="boosterSeatQty"
                  name="boosterSeatQty"
                  min="0"
                  max="3"
                  value={form.boosterSeatQty}
                  onChange={handleInputChange}
                  style={{ width: '60px', marginLeft: '10px' }}
                />
              </div>
              <div>
                <label htmlFor="babySeatQty">Baby Seat Quantity</label>
                <input
                  type="number"
                  id="babySeatQty"
                  name="babySeatQty"
                  min="0"
                  max="3"
                  value={form.babySeatQty}
                  onChange={handleInputChange}
                  style={{ width: '60px', marginLeft: '10px' }}
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



          {/* Google Map Embed after baby seat */}
          <div className="form-group full-width booking-map-embed" style={{margin: '1.5rem 0'}}>
            <iframe
              src="https://maps.google.com/maps?q=sydney&t=&z=10&ie=UTF8&iwloc=&output=embed"
              width="600"
              height="300"
              style={{ border: 0, width: '100%', borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Sydney"
            ></iframe>
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
            <label>Special Instructions</label>
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
    <div className="step-container">
      <h2 className="step-title">Step 02: Payment Details</h2>
      <div className="estimated-cost summary-container" style={{marginBottom: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Estimated Total: ${typeof estimatedCost === 'number' ? estimatedCost.toFixed(2) : '0.00'}</h3>
      </div>
      <div className="omni-form">
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Payment Method</label>
            <div className="payment-options">
              <label className="radio-label">
                <input type="radio" name="paymentMethod" value="Card" checked={form.paymentMethod === 'Card'} onChange={handleInputChange} />
                Credit/Debit Card
              </label>
              <label className="radio-label">
                <input type="radio" name="paymentMethod" value="Cash" checked={form.paymentMethod === 'Cash'} onChange={handleInputChange} />
                Cash
              </label>
            </div>
          </div>

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
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => setStep(2)}>Back</button>
          <button type="button" onClick={() => setStep(4)}>View Summary</button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    return (
      <div className="step-container">
        <h2 className="step-title">Booking Summary</h2>
        
        <div className="summary-details">
          <p><strong>Booking Method:</strong> {form.bookingMethod === 'distance' ? 'Distance-Based' : 'Time-Based'}</p>
          <p><strong>Service Type:</strong> {form.serviceType || 'Not specified'}</p>
          
          {form.serviceType === 'Airport Transfers' && (
            <>
              <p><strong>Flight Number:</strong> {form.flightDetails.flightNumber || 'Not specified'}</p>
              <p><strong>Flight Time:</strong> {form.flightDetails.flightTime || 'Not specified'}</p>
            </>
          )}
          
          <p><strong>Pickup Location:</strong> {form.pickup || 'Not specified'}</p>
          {form.pickupPostcode && <p><strong>Pickup Postcode:</strong> {form.pickupPostcode}</p>}
          
          {form.dropoff && <p><strong>Drop-off Location:</strong> {form.dropoff}</p>}
          {form.dropoffPostcode && <p><strong>Drop-off Postcode:</strong> {form.dropoffPostcode}</p>}
          
          <p><strong>Date:</strong> {form.date || 'Not specified'}</p>
          <p><strong>Time:</strong> {form.time || 'Not specified'}</p>
          
          <p><strong>Vehicle Type:</strong> {form.vehiclePreference || 'Not specified'}</p>
          <p><strong>Passengers:</strong> {form.passengers || 'Not specified'}</p>
          <p><strong>Luggage:</strong> {form.luggage || 'Not specified'}</p>
          
          
          {form.hasChildUnder7 && (
            <>
              <p><strong>Booster Seat Quantity:</strong> {form.boosterSeatQty}</p>
              <p><strong>Baby Seat Quantity:</strong> {form.babySeatQty}</p>
            </>
          )}
          {form.specialInstructions && <p><strong>Special Instructions:</strong> {form.specialInstructions}</p>}
          
          <div className="estimated-cost">
            <p>Estimated Total: ${typeof estimatedCost === 'number' ? estimatedCost.toFixed(2) : '0.00'}</p>
          </div>
        </div>
        
        {/* Payment and confirmation buttons */}
        <form onSubmit={handleSubmit}>
          <div className="form-actions">
            <button type="button" onClick={() => setStep(3)}>Back</button>
            <button type="submit" className="submit-btn">Confirm & Book</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
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
    </>
  );
};

export default BookingPage; 