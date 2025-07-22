import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/BookingPage.css';
import { FaRoute, FaClock } from 'react-icons/fa';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    bookingMethod: '', // 'distance' or 'time'
    city: 'Sydney',
    serviceType: '',
    flightNumber: '',
    flightTime: '',
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
    babySeat: false,
    name: '',
    email: '',
    phone: '',
    pickup: '',
    dropoff: '',
    distance: '',
    pickupPostcode: '',
    dropoffPostcode: '',
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
    if (form.babySeat) {
      finalCost += 15;
    }
    if (form.serviceType === 'Airport Transfer') {
      finalCost += 15;
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
    <div className="step-container">
      <h2 className="step-title">How Would You Like to Book?</h2>
      <p className="step-subtitle">Choose the option that best fits your travel needs.</p>
      <div className="booking-method-options">
        <div className="booking-method-card" onClick={() => { setForm({ ...form, bookingMethod: 'distance' }); setStep(2); }}>
          <FaRoute className="method-icon" />
          <h3>Distance-Based</h3>
          <p>Ideal for single trips from point A to point B.</p>
        </div>
        <div className="booking-method-card" onClick={() => { setForm({ ...form, bookingMethod: 'time' }); setStep(2); }}>
          <FaClock className="method-icon" />
          <h3>Time-Based</h3>
          <p>Perfect for multiple stops, events, or hourly hire.</p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-container">
      <h2 className="step-title">Step 01: Booking Details</h2>
      <form className="omni-form">
        <div className="form-grid">
          {/* Service Details */}
          <div className="form-group">
            <label>City</label>
            <select name="city" value={form.city} onChange={handleInputChange}>
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

          {form.serviceType === 'Airport Transfer' && (
            <>
              <div className="form-group">
                <label>Flight Number</label>
                <input type="text" name="flightNumber" value={form.flightNumber} onChange={handleInputChange} placeholder="e.g., QF432" />
              </div>
              <div className="form-group">
                <label>Flight Time</label>
                <input type="time" name="flightTime" value={form.flightTime} onChange={handleInputChange} />
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
              <option value="Executive Sedan">Executive Sedan (1-3 Passengers, 2 Suitcases) </option>
              <option value="Premium Sedan">Premium Sedan (1-3 Passengers, 2 Suitcases) </option>
              <option value="SUV">SUV (1-4 Passengers, 3 Suitcases, 2 Carry On) </option>
              <option value="Van">Van (1-6 Passengers, 5 Suitcases) — Mercedes Van or Similar</option>
              <option value="Sprinter">Sprinter (1-11 Passengers, 6 Suitcases/Trailer)</option>
            </select>
          </div>

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

          {/* Options */}
          <div className="form-group full-width">
            <label className="checkbox-label">
              <input type="checkbox" name="babySeat" checked={form.babySeat} onChange={handleInputChange} />
              Add Australian Standard Baby Seat (+$15)
            </label>
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
    </div>
  );

  const renderStep3 = () => (
    <div className="step-container">
      <h2 className="step-title">Step 02: Payment Details</h2>
      <div className="estimated-cost summary-container" style={{marginBottom: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Estimated Total: ${estimatedCost}</h3>
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
      <div className="step-container summary-container">
        <h2 className="step-title">Booking Summary</h2>
        <div className="summary-details">
          <p><strong>Booking Type:</strong> {form.bookingMethod === 'distance' ? 'Distance-Based' : 'Time-Based'}</p>
          <p><strong>Service:</strong> {form.serviceType}</p>
          {form.flightNumber && <p><strong>Flight Number:</strong> {form.flightNumber}</p>}
          {form.flightTime && <p><strong>Flight Time:</strong> {form.flightTime}</p>}
          <p><strong>Pickup:</strong> {`${form.pickup}, ${form.pickupPostcode}`}</p>
          {form.dropoff && <p><strong>Drop-off:</strong> {`${form.dropoff}, ${form.dropoffPostcode}`}</p>}
          <p><strong>Date & Time:</strong> {form.date} at {form.time}</p>
          <p><strong>Passengers:</strong> {form.passengers}</p>
          {form.bookingMethod === 'distance' && form.distance && <p><strong>Distance:</strong> {form.distance} km</p>}
          <p><strong>Luggage:</strong> {form.luggage}</p>
          <p><strong>Baby Seat:</strong> {form.babySeat ? 'Yes (+$15)' : 'No'}</p>
          {form.specialInstructions && <p><strong>Special Instructions:</strong> {form.specialInstructions}</p>}
          <p><strong>Payment Method:</strong> {form.paymentMethod}</p>
        </div>
        
        <div className="booking-map-embed">
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

        <div className="estimated-cost">
          <h3>Estimated Total: ${estimatedCost}</h3>
        </div>
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
    <div className="booking-page-root">
      <div className="booking-form-container">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default BookingPage; 