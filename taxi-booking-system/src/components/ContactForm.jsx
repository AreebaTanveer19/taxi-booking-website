import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const initialErrors = {
  name: '',
  email: '',
  message: '',
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }

  const validate = (field, value) => {
    switch (field) {
      case 'name':
        return value.trim() ? '' : 'Full Name is required.';
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!validateEmail(value)) return 'Invalid email address.';
        return '';
      case 'message':
        return value.trim() ? '' : 'Message is required.';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const isFormValid =
    !validate('name', form.name) &&
    !validate('email', form.email) &&
    !validate('message', form.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const newErrors = {
      name: validate('name', form.name),
      email: validate('email', form.email),
      message: validate('message', form.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    setSubmitting(true);
    setToast(null);
    // Mock API call
    setTimeout(() => {
      setSubmitting(false);
      setToast({ type: 'success', message: 'Message sent successfully!' });
      setForm(initialState);
      setTouched({});
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      noValidate
    >
      <div className="form-group">
        <label htmlFor="name">Full Name<span className="required">*</span></label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-input${errors.name && touched.name ? ' error' : ''}`}
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
          required
          placeholder="Enter your full name"
        />
        {errors.name && touched.name && <div className="form-error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address<span className="required">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-input${errors.email && touched.email ? ' error' : ''}`}
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          required
          placeholder="Enter your email address"
        />
        {errors.email && touched.email && <div className="form-error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="Enter your phone number (optional)"
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message<span className="required">*</span></label>
        <textarea
          id="message"
          name="message"
          className={`form-input${errors.message && touched.message ? ' error' : ''}`}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          required
          placeholder="Type your message here..."
        />
        {errors.message && touched.message && <div className="form-error">{errors.message}</div>}
      </div>
      <button
        type="submit"
        className="form-submit-btn"
        disabled={!isFormValid || submitting}
      >
        {submitting ? <span className="spinner" /> : 'Send Message'}
      </button>
      {toast && (
        <div className={`form-toast ${toast.type}`}>{toast.message}</div>
      )}
    </motion.form>
  );
};

export default ContactForm; 