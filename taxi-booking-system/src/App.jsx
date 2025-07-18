import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FleetPage from './pages/FleetPage';
import ServicesPage from './pages/ServicesPage';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#ff9800' },
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(m => !m)} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/confirmation" element={<BookingConfirmationPage />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
