import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FleetPage from './pages/FleetPage';
import ServicesPage from './pages/ServicesPage';
import Navbar from './components/Navbar';
import AccessDenied from './pages/AccessDenied';
import AdminLogin from './pages/AdminLogin';
import { useState } from 'react';

// Remove process.env reference since we're using proxy

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin login function
  const handleAdminLogin = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        setIsAdmin(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></>} />
        <Route path="/book" element={<><Navbar /><BookingPage /></>} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <AdminLogin onLogin={handleAdminLogin} />} />
        <Route path="/about" element={<><Navbar /><AboutPage /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
        <Route path="/fleet" element={<><Navbar /><FleetPage /></>} />
        <Route path="/services" element={<><Navbar /><ServicesPage /></>} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
}

export default App;
