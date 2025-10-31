import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import ServiceTemplate from './components/ServiceTemplate';
import TermsAndConditions from './pages/TermsAndConditions';

// Remove process.env reference since we're using proxy

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const isAdminAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return !!token; // Convert to boolean
  };
  
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></>} />
        <Route path="/book" element={<><Navbar /><BookingPage /></>} />
        <Route path="/terms-and-conditions" element={<><Navbar /><TermsAndConditions /></>} />
        <Route 
          path="/admin" 
          element={isAdminAuthenticated() ? <AdminDashboard /> : <AdminLogin />} 
        />
        <Route path="/about" element={<><Navbar /><AboutPage /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
        <Route path="/fleet" element={<><Navbar /><FleetPage /></>} />
        <Route path="/services" element={<><Navbar /><ServicesPage /></>} />
        <Route path="/services/:serviceId" element={<><Navbar /><ServiceTemplate /></>} />
        <Route path="*" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
}

export default App;