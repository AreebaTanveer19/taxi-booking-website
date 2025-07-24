import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css'; // Link the CSS file

export default function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending login request with:', credentials);
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      console.log('Received response:', response);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        window.location.href = '/admin'; // Force full page reload to ensure auth state updates
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Network error during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <img 
          src="/logo.jpeg" 
          alt="Horizon Chauffeurs Logo"
          className="admin-logo"
        />
        <h2 className="admin-login-title">Admin Portal</h2>
        <div className="admin-form-group">
          <label>Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>
        <div className="admin-form-group">
          <label>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="admin-login-btn" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-dots">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </span>
          ) : 'Login'}
        </button>
      </form>
    </div>
  );
}
