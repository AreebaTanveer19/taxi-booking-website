import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
// import BookingConfirmationPage from './pages/BookingConfirmationPage';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FleetPage from './pages/FleetPage';
import ServicesPage from './pages/ServicesPage';
import Navbar from './components/Navbar';
import AccessDenied from './pages/AccessDenied';
import AdminLogin from './pages/AdminLogin';
import { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin login function
  const handleAdminLogin = async (credentials) => {
    try {
      const response = await fetch('/api/admin/login', {
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
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
        {/* <Route path="/confirmation" element={<BookingConfirmationPage />} /> */}
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleAdminLogin} />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
}

export default App;
