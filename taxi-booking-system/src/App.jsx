
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Dummy admin check (replace with real auth logic)
const isAdmin = false; // Set to true to allow admin access

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
        {/* <Route path="/confirmation" element={<BookingConfirmationPage />} /> */}
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <AccessDenied />} />
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
