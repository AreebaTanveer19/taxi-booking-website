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
import ServiceTemplate from './components/ServiceTemplate';

// Remove process.env reference since we're using proxy

function App() {
  const isAdminAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return !!token; // Convert to boolean
  };
  
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></>} />
        <Route path="/book" element={<><Navbar /><BookingPage /></>} />
        <Route 
          path="/admin" 
          element={isAdminAuthenticated() ? <AdminDashboard /> : <AdminLogin />} 
        />
        <Route path="/about" element={<><Navbar /><AboutPage /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
        <Route path="/fleet" element={<><Navbar /><FleetPage /></>} />
        <Route path="/services" element={<><Navbar /><ServicesPage /></>} />
        <Route path="/services/:serviceId" element={<><Navbar /><ServiceTemplate /></>} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
}

export default App;
