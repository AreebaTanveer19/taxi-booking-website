import React, { useState } from 'react';
import carData from '../assets/carData.json';
import '../styles/BookingPage.css';
import A7 from '../assets/A7.png';
import A8 from '../assets/A8.png';
import Q7 from '../assets/Q7.png';

const SYDNEY_TERMINALS = ['T1 International', 'T2 Domestic', 'T3 Qantas Domestic'];
const AIRPORT_TOLL_TAX = 15;

const steps = [
  'Type',
  'Details',
  'Vehicle',
  'Confirm',
];

const carImages = {
  'AUDI Q7': Q7,
  'AUDI A8': A8,
  'AUDI A7': A7,
};

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState('');
  const [terminal, setTerminal] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    pickup: '',
    dropoff: '',
    postcode: '',
    date: '',
    time: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const getBaseRate = () => (bookingType === 'Airport Transfer' ? 120 : 100);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required.';
    if (!form.phone.trim() || !/^\d{8,15}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'Valid phone number required.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Valid email required.';
    if (!form.pickup.trim()) errors.pickup = 'Pickup location is required.';
    if (!form.dropoff.trim()) errors.dropoff = 'Dropoff location is required.';
    if (!form.postcode.trim() || !/^\d{4}$/.test(form.postcode)) errors.postcode = 'Valid 4-digit postcode required.';
    if (!form.date) errors.date = 'Date is required.';
    else {
      const today = new Date();
      const selected = new Date(form.date);
      today.setHours(0,0,0,0);
      selected.setHours(0,0,0,0);
      if (selected < today) errors.date = 'Date cannot be in the past.';
    }
    if (!form.time) errors.time = 'Time is required.';
    return errors;
  };

  const handleVehicleSelect = (car) => {
    setSelectedVehicle(car);
    setStep(5);
  };

  // Stepper UI
  const Stepper = () => (
    <div className="booking-stepper">
      {steps.map((label, idx) => (
        <div key={label} className={`stepper-step${step === idx + 1 ? ' active' : ''}${step > idx + 1 ? ' completed' : ''}`}> 
          <div className="stepper-circle">{idx + 1}</div>
          <div className="stepper-label">{label}</div>
          {idx < steps.length - 1 && <div className="stepper-line" />}
        </div>
      ))}
    </div>
  );

  // Step 1: Choose booking type
  if (step === 1) {
    return (
      <div className="booking-page-root">
        <div className="booking-main-card">
          <Stepper />
          <h2 className="booking-title">Choose Booking Type</h2>
          <div className="booking-type-btns">
            <button className={`hero-btn${bookingType === 'Airport Transfer' ? ' active' : ''}`} onClick={() => setBookingType('Airport Transfer')}>Airport Transfer</button>
            <button className={`hero-btn${bookingType === 'Point to Point' ? ' active' : ''}`} onClick={() => setBookingType('Point to Point')}>Point to Point</button>
          </div>
          <button className="booking-next-btn" disabled={!bookingType} onClick={() => setStep(bookingType === 'Airport Transfer' ? 2 : 3)}>Next</button>
        </div>
      </div>
    );
  }

  // Step 2: Choose terminal (if airport transfer)
  if (step === 2 && bookingType === 'Airport Transfer') {
    return (
      <div className="booking-page-root">
        <div className="booking-main-card">
          <Stepper />
          <h2 className="booking-title">Select Sydney Airport Terminal</h2>
          <form className="booking-form" onSubmit={e => { e.preventDefault(); setStep(3); }}>
            <label htmlFor="terminal-select" className="booking-label">Terminal</label>
            <select
              id="terminal-select"
              className="booking-input"
              value={terminal}
              onChange={e => setTerminal(e.target.value)}
              required
            >
              <option value="" disabled>Select a terminal</option>
              {SYDNEY_TERMINALS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="booking-btn-row">
              <button className="booking-back-btn" type="button" onClick={() => setStep(1)}>Back</button>
              <button className="booking-next-btn" type="submit" disabled={!terminal}>Next</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Step 3: Booking info
  if (step === 3) {
    const handleSubmit = e => {
      e.preventDefault();
      const errors = validateForm();
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) setStep(4);
    };
    return (
      <div className="booking-page-root">
        <div className="booking-main-card">
          <Stepper />
          <h2 className="booking-title">Enter Booking Details</h2>
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <label className="booking-label">Full Name
              <input className="booking-input" name="name" value={form.name} onChange={handleFormChange} required />
              {formErrors.name && <div className="form-error">{formErrors.name}</div>}
            </label>
            <label className="booking-label">Phone Number
              <input className="booking-input" name="phone" value={form.phone} onChange={handleFormChange} required />
              {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
            </label>
            <label className="booking-label">Email
              <input className="booking-input" name="email" value={form.email} onChange={handleFormChange} required />
              {formErrors.email && <div className="form-error">{formErrors.email}</div>}
            </label>
            <label className="booking-label">Pickup Location
              <input className="booking-input" name="pickup" value={form.pickup} onChange={handleFormChange} required />
              {formErrors.pickup && <div className="form-error">{formErrors.pickup}</div>}
            </label>
            <label className="booking-label">Dropoff Location
              <input className="booking-input" name="dropoff" value={form.dropoff} onChange={handleFormChange} required />
              {formErrors.dropoff && <div className="form-error">{formErrors.dropoff}</div>}
            </label>
            <label className="booking-label">Post Code
              <input className="booking-input" name="postcode" value={form.postcode} onChange={handleFormChange} required />
              {formErrors.postcode && <div className="form-error">{formErrors.postcode}</div>}
            </label>
            {/* Google Maps Embed for Sydney */}
            <div className="booking-map-embed">
              <iframe
                title="Sydney Map"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '10px' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106312.4752229376!2d151.043255!3d-33.867487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae3e8b2c7e9b%3A0x5017d681632c5a0!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sau!4v1689999999999!5m2!1sen!2sau"
              ></iframe>
            </div>
            <label className="booking-label">Date
              <input className="booking-input" name="date" type="date" value={form.date} onChange={handleFormChange} required />
              {formErrors.date && <div className="form-error">{formErrors.date}</div>}
            </label>
            <label className="booking-label">Time
              <input className="booking-input" name="time" type="time" value={form.time} onChange={handleFormChange} required />
              {formErrors.time && <div className="form-error">{formErrors.time}</div>}
            </label>
            <div className="booking-btn-row">
              <button className="booking-back-btn" type="button" onClick={() => setStep(bookingType === 'Airport Transfer' ? 2 : 1)}>Back</button>
              <button className="booking-next-btn" type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Step 4: Choose vehicle
  if (step === 4) {
    return (
      <div className="booking-page-root">
        <div className="booking-main-card">
          <Stepper />
          <h2 className="booking-title">Choose Your Vehicle</h2>
          <div className="booking-vehicle-grid">
            {carData.map((car, idx) => {
              const baseRate = getBaseRate();
              const total = bookingType === 'Airport Transfer' ? baseRate + AIRPORT_TOLL_TAX : baseRate;
              const carImage = carImages[car.name] || car.pic;
              return (
                <div className={`booking-vehicle-card${selectedVehicle && selectedVehicle.name === car.name ? ' selected' : ''}`} key={idx} onClick={() => handleVehicleSelect(car)} tabIndex={0}>
                  <div className="vehicle-img-wrap">
                    {carImage ? (
                      <img src={carImage} alt={car.name} className="vehicle-img" />
                    ) : (
                      <div className="vehicle-img-placeholder">Image Coming Soon</div>
                    )}
                  </div>
                  <div className="vehicle-info">
                    <div className="vehicle-title">{car.name}</div>
                    <div className="vehicle-specs">🪑 {car.seat} | 🧳 {car.luggage_capacity}</div>
                    <div className="vehicle-rate">Base: ${baseRate}</div>
                    {bookingType === 'Airport Transfer' && <div className="vehicle-rate">Toll: ${AIRPORT_TOLL_TAX}</div>}
                    <div className="vehicle-rate vehicle-rate-total">Total: ${total}</div>
                  </div>
                  <button className="vehicle-select-btn">Select</button>
                </div>
              );
            })}
          </div>
          <div className="booking-btn-row">
            <button className="booking-back-btn" onClick={() => setStep(3)}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Confirmation
  if (step === 5 && selectedVehicle && !confirmed) {
    const baseRate = getBaseRate();
    const total = bookingType === 'Airport Transfer' ? baseRate + AIRPORT_TOLL_TAX : baseRate;
    const carImage = carImages[selectedVehicle.name] || selectedVehicle.pic;
    return (
      <div className="booking-page-root">
        <div className="booking-main-card">
          <Stepper />
          <h2 className="booking-title">Booking Summary</h2>
          <div className="booking-summary-flex">
            <div className="booking-summary-details">
              <div><b>Name:</b> {form.name}</div>
              <div><b>Phone:</b> {form.phone}</div>
              <div><b>Email:</b> {form.email}</div>
              <div><b>Pickup:</b> {form.pickup}</div>
              <div><b>Dropoff:</b> {form.dropoff}</div>
              <div><b>Post Code:</b> {form.postcode}</div>
              <div><b>Date:</b> {form.date}</div>
              <div><b>Time:</b> {form.time}</div>
              <div><b>Booking Type:</b> {bookingType}</div>
              {bookingType === 'Airport Transfer' && <div><b>Terminal:</b> {terminal}</div>}
              <div><b>Total Price:</b> ${total}</div>
              {bookingType === 'Airport Transfer' && <div><b>Includes Toll Tax:</b> ${AIRPORT_TOLL_TAX}</div>}
            </div>
            <div className="booking-summary-car">
              <div className="booking-summary-car-img-wrap">
                {carImage ? (
                  <img src={carImage} alt={selectedVehicle.name} className="booking-summary-car-img" />
                ) : (
                  <div className="vehicle-img-placeholder">Image Coming Soon</div>
                )}
              </div>
              <div className="booking-summary-car-title">{selectedVehicle.name}</div>
              <div className="vehicle-specs">🪑 {selectedVehicle.seat} | 🧳 {selectedVehicle.luggage_capacity}</div>
            </div>
          </div>
          <div className="booking-btn-row">
            <button className="booking-back-btn" onClick={() => setStep(4)}>Back</button>
            <button className="booking-next-btn" onClick={() => setConfirmed(true)}>Confirm Booking</button>
          </div>
        </div>
      </div>
    );
  }

  // Step 6: Final confirmation message
  if (confirmed) {
    return (
      <div className="booking-page-root">
        <div className="booking-main-card">
          <div className="booking-final-confirmation">
            <div className="booking-confirmation-icon">✅</div>
            <h2 className="booking-title">Booking Confirmed!</h2>
            <p className="booking-confirmation-message">Thank you for your booking. Your ride has been successfully scheduled. We look forward to serving you!</p>
            <button className="booking-next-btn" onClick={() => window.location.href = '/'}>Return Home</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BookingPage; 