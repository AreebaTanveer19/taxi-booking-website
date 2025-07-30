import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AccessDenied.css';

export default function AccessDenied() {
  return (
    <div className="access-denied-container">
      <h1>Access Denied</h1>
      <p>You don't have permission to view this page.</p>
      <Link to="/" className="return-home-btn">Return to Home</Link>
    </div>
  );
}