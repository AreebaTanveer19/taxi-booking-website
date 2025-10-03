import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { sendContactEmail } from '../utils/emailService';

const schema = yup.object().shape({
  name: yup.string().required('Full Name is required.'),
  email: yup.string().email('Invalid email address.').required('Email is required.'),
  phone: yup.string().optional(),
  message: yup.string().required('Message is required.'),
});

const ContactForm = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    setToast(null);
    
    try {
      // Send contact email
      const result = await sendContactEmail(data);
      setToast({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
      
      // Reset form after successful submission
      setTimeout(() => {
        setToast(null);
        // You can reset the form here if needed
      }, 3000);
      
    } catch (error) {
      console.error('Error sending contact message:', error);
      setToast({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or call us directly.' 
      });
      
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit)}
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
          className={`form-input${errors.name ? ' error' : ''}`}
          autoComplete="name"
          placeholder="Enter your full name"
          {...register('name')}
        />
        {errors.name && <div className="form-error">{errors.name.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address<span className="required">*</span></label>
        <input
          type="email"
          id="email"
          className={`form-input${errors.email ? ' error' : ''}`}
          autoComplete="email"
          placeholder="Enter your email address"
          {...register('email')}
        />
        {errors.email && <div className="form-error">{errors.email.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              country={'au'}
              containerClass="contact-phone-input"
              inputClass={`form-input${errors.phone ? ' error' : ''}`}
            />
          )}
        />
        {errors.phone && <div className="form-error">{errors.phone.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="message">Message<span className="required">*</span></label>
        <textarea
          id="message"
          className={`form-input${errors.message ? ' error' : ''}`}
          rows={5}
          placeholder="Type your message here..."
          {...register('message')}
        />
        {errors.message && <div className="form-error">{errors.message.message}</div>}
      </div>
      <button
        type="submit"
        className="form-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? <span className="spinner" /> : 'Send Message'}
      </button>
      {toast && (
        <div className={`form-toast ${toast.type}`}>{toast.message}</div>
      )}
    </motion.form>
  );
};

export default ContactForm; 