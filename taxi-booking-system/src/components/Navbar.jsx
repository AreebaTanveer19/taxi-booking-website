import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Switch, useTheme, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

const fleetMenu = [
  { name: 'Luxury Sedan', icon: <DirectionsCarIcon fontSize="small" /> },
  { name: 'Mercedes Sprinter', icon: <AirportShuttleIcon fontSize="small" /> },
  { name: 'Audi Q7', icon: <DirectionsCarIcon fontSize="small" /> },
  { name: 'Executive Car', icon: <DirectionsCarIcon fontSize="small" /> },
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Book', path: '/book' },
  { label: 'Fleet', path: '/fleet' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Driver', path: '/driver' },
  { label: 'Admin', path: '/admin' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = ({ darkMode, onToggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavClick = (link) => {
    if (link.dropdown) return; // handled by dropdown
    if (link.path.startsWith('#')) {
      const sectionId = link.path.replace('#', '');
      if (location.pathname === '/') {
        scrollToSection(sectionId);
      } else {
        navigate('/', { state: { scrollTo: sectionId } });
      }
    } else {
      navigate(link.path);
    }
  };

  const handleFleetMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFleetMenuClose = () => {
    setAnchorEl(null);
  };
  const handleFleetItemClick = (vehicle) => {
    setAnchorEl(null);
    if (location.pathname === '/') {
      scrollToSection('fleet-section');
      // Optionally, highlight the vehicle card here
    } else {
      navigate('/', { state: { scrollTo: 'fleet-section', highlightFleet: vehicle.name } });
    }
  };

  return (
    <AppBar position="sticky" color="default" elevation={4} sx={{ mb: 2, background: theme.palette.background.paper }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer' }} onClick={() => navigate('/') }>
          <TaxiAlertIcon color="primary" fontSize="large" />
          <Typography variant="h6" fontWeight={700} color="primary">TaxiBooker</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          {navLinks.map(link =>
            link.dropdown ? (
              <Box key={link.label}>
                <Button
                  color="inherit"
                  onClick={handleFleetMenuOpen}
                  sx={{ borderRadius: 3, fontWeight: 600 }}
                >
                  {link.label}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleFleetMenuClose}
                  MenuListProps={{ onMouseLeave: handleFleetMenuClose }}
                >
                  {fleetMenu.map(vehicle => (
                    <MenuItem key={vehicle.name} onClick={() => handleFleetItemClick(vehicle)}>
                      <ListItemIcon>{vehicle.icon}</ListItemIcon>
                      <ListItemText>{vehicle.name}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                key={link.label}
                color={location.pathname === link.path || (link.path.startsWith('#') && location.pathname === '/' && window.location.hash === link.path) ? 'primary' : 'inherit'}
                variant={location.pathname === link.path ? 'contained' : 'text'}
                onClick={() => handleNavClick(link)}
                sx={{ borderRadius: 3, fontWeight: 600, boxShadow: location.pathname === link.path ? 2 : 0 }}
              >
                {link.label}
              </Button>
            )
          )}
          <Switch checked={darkMode} onChange={onToggleDarkMode} color="primary" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 