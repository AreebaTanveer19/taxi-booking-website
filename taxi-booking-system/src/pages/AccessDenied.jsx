import React from 'react';

const AccessDenied = () => (
  <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif' }}>
    <h1>Your access to this site has been limited by the site owner</h1>
    <p>Your access to this service has been limited. (HTTP response code 403)</p>
    <p>If you think you have been blocked in error, contact the owner of this site for assistance.</p>
    <hr style={{ width: '50%' }} />
    <p><b>Block Reason:</b> Access from your area has been temporarily limited for security reasons.</p>
    <p style={{ color: '#888', marginTop: '40px' }}>Time: {new Date().toUTCString()}</p>
  </div>
);

export default AccessDenied; 