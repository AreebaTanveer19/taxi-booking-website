import React from 'react';
import '../ConfirmationPopup/ConfirmationPopup.css';

const ConfirmationPopup = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'success' 
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-popup-overlay">
      <div className={`confirmation-popup-container ${type}`}>
        <div className="confirmation-popup-header">
          <div className={`confirmation-popup-icon ${type}`}>
            {type === 'success' ? '✓' : type === 'error' ? '✕' : '!'}
          </div>
          <button className="confirmation-popup-close" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="confirmation-popup-content">
          <h3 className="confirmation-popup-title">{title}</h3>
          <p className="confirmation-popup-message">{message}</p>
        </div>
        
        <div className="confirmation-popup-actions">
          <button 
            className={`confirmation-popup-button ${type}`}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
