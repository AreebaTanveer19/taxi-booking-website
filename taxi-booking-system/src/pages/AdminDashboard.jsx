import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBookings, setExpandedBookings] = useState({});
  const [stats, setStats] = useState({
    totalRevenue: 0,
    airportTransfers: 0,
    totalBookings: 0
  });
  const [bookingSearch, setBookingSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
        setError(null);
      } else {
        setError('Failed to load bookings');
      }
    } catch (err) {
      setError('Network error while loading bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setError(null);
      } else {
        setError('Failed to load users');
      }
    } catch (err) {
      setError('Network error while loading users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      const revenue = bookings.reduce((sum, booking) => {
        // Try multiple possible price fields and handle different formats
        const price = booking.price || booking.estimatedCost || booking.totalAmount || 0;
        return sum + (Number(price) || 0);
      }, 0);
      
      const airportTransfers = bookings.filter(booking => {
        return booking.pickup.toLowerCase().includes('airport') || 
               booking.dropoff.toLowerCase().includes('airport');
      }).length;
      
      setStats({
        totalRevenue: revenue,
        airportTransfers,
        totalBookings: bookings.length
      });
    }
  }, [bookings]);

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB - dateA;
  });

  const filteredBookings = sortedBookings.filter(booking => {
    if (!bookingSearch) return true;
    const searchTerm = bookingSearch.toLowerCase();
    return (
      booking.pickup.toLowerCase().includes(searchTerm) ||
      booking.dropoff.toLowerCase().includes(searchTerm) ||
      (booking.userId?.name || '').toLowerCase().includes(searchTerm)
    );
  });

  const filteredUsers = users.filter(user => {
    if (!userSearch) return true;
    return user.name.toLowerCase().includes(userSearch.toLowerCase());
  });

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(bks => bks.filter(b => b._id !== id));
      }
    } catch (err) {
      setError('Failed to delete booking');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users => users.filter(u => u._id !== userId));
      }
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleExport = () => {
    const csvRows = [
      [
        'Name', 'Email', 'Phone',
        'Booking Method', 'City', 'Service Type', 'Flight Number', 'Flight Time', 'Luggage', 'Special Instructions',
        'Payment Method', 'Name On Card', 'Card Type', 'Expiry Month', 'Expiry Year', 'Terms Accepted',
        'Vehicle Preference', 'Date', 'Time', 'Passengers', 'Child Under 7', 'Booster Seats', 'Baby Seats',
        'Pickup', 'Dropoff', 'Distance', 'Estimated Cost', 'Status'
      ],
      ...filteredBookings.map(b => [
        b.userId?.name || '',
        b.userId?.email || '',
        b.userId?.phone || '',
        b.bookingMethod,
        b.city,
        b.serviceType,
        b.flightNumber,
        b.flightTime,
        b.luggage,
        b.specialInstructions,
        b.paymentMethod,
        b.nameOnCard,
        b.cardType,
        b.expiryMonth,
        b.expiryYear,
        b.termsAccepted ? 'Yes' : 'No',
        b.vehiclePreference,
        b.date,
        b.time,
        b.passengers,
        b.hasChildUnder7 ? 'Yes' : 'No',
        b.boosterSeatQty || 0,
        b.babySeatQty || 0,
        b.pickup,
        b.dropoff,
        b.distance,
        b.estimatedCost,
        b.status || 'Confirmed',
      ]),
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  const toggleBookingDetails = (bookingId) => {
    setExpandedBookings(prev => ({
      ...prev,
      [bookingId]: !prev[bookingId]
    }));
  };

  return (
    <div className="admin-dashboard">
    
  
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Horizon chauffers</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-btn ${!showUsers ? 'active' : ''}`}
            onClick={() => {
              fetchBookings();
              setShowUsers(false);
            }}
          >
            Bookings
          </button>
          <button 
            className={`nav-btn ${showUsers ? 'active' : ''}`}
            onClick={() => {
              fetchUsers();
              setShowUsers(true);
            }}
          >
            Users
          </button>
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Bookings</h3>
              <div className="stat-icon">📅</div>
            </div>
            <p className="stat-value">{stats.totalBookings}</p>
            <p className="stat-change">+12% from last week</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <h3>Revenue</h3>
              <div className="stat-icon">💰</div>
            </div>
            <p className="stat-value">
              ${stats.totalRevenue.toFixed(2)}
            </p>
            <p className="stat-change">+8% from last week</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Airport Transfers</h3>
              <div className="stat-icon">✈️</div>
            </div>
            <p className="stat-value">
              {stats.airportTransfers}
            </p>
            <p className="stat-change">+15% from last week</p>
          </div>
        </div>

        {/* Search Filters */}
        <div className="search-filters">
          {showUsers ? (
            <div className="search-group">
              <label>Search Users by Name:</label>
              <input 
                type="text" 
                placeholder="Enter user name..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="search-input"
              />
            </div>
          ) : (
            <div className="search-group">
              <label>Search Bookings by Location:</label>
              <input 
                type="text" 
                placeholder="Enter pickup/dropoff location..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="search-input"
              />
            </div>
          )}
        </div>

        {/* Bookings/Users Table */}
        <div className="table-container">
          <div className="table-header">
            <h2>{showUsers ? 'Users' : 'Recent Bookings'}</h2>
            <div className="search-export">
              {!showUsers && (
                <button className="export-btn" onClick={handleExport}>
                  Export CSV
                </button>
              )}
            </div>
          </div>

          {showUsers ? (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(u => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDeleteUser(u._id)}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-bookings">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <div className="bookings-list">
              {filteredBookings.map(booking => (
                <div key={booking._id} className="booking-item">
                  <div className="booking-summary">
                    <span>{booking.pickup} → {booking.dropoff}</span>
                    <span>${(Number(booking.price || booking.estimatedCost || booking.totalAmount || 0)).toFixed(2)}</span>
                    <span>{new Date(`${booking.date} ${booking.time}`).toLocaleString()}</span>
                    <button 
                      onClick={() => toggleBookingDetails(booking._id)}
                      className="details-btn"
                    >
                      {expandedBookings[booking._id] ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                  
                  {expandedBookings[booking._id] && (
                    <div className="booking-details">
                      <div className="details-grid">
                        {/* Passenger & Luggage */}
                        <div className="details-group">
                          <h4>Passenger & Luggage</h4>
                          <p><strong>Name:</strong> {booking.userId?.name || booking.name}</p>
                          <p><strong>Email:</strong> {booking.userId?.email || booking.email}</p>
                          <p><strong>Phone:</strong> {booking.userId?.phone || booking.phone}</p>
                          <p><strong>Passengers:</strong> {booking.passengers}</p>
                          {booking.hasChildUnder7 && <p><strong>Child Under 7:</strong> Yes</p>}
                          {booking.hasChildUnder7 && <p><strong>Booster Seats:</strong> {booking.boosterSeatQty}</p>}
                          {booking.hasChildUnder7 && <p><strong>Baby Seats:</strong> {booking.babySeatQty}</p>}
                          {booking.luggage && <p><strong>Luggage:</strong> {booking.luggage}</p>}
                        </div>

                        {/* Trip Details */}
                        <div className="details-group">
                          <h4>Trip Details</h4>
                          <p><strong>From:</strong> {booking.pickup}</p>
                          <p><strong>To:</strong> {booking.dropoff}</p>
                          <p><strong>Date:</strong> {new Date(`${booking.date} ${booking.time}`).toLocaleString()}</p>
                          {booking.expectedEndTime && <p><strong>Expected End Time:</strong> {booking.expectedEndTime}</p>}
                          <p><strong>Distance:</strong> {booking.distance} km</p>
                          <p><strong>Vehicle:</strong> {booking.vehiclePreference}</p>
                        </div>

                        {/* Service Details */}
                        <div className="details-group">
                          <h4>Service Details</h4>
                          <p><strong>Service Type:</strong> {booking.serviceType}</p>
                          {booking.flightNumber && <p><strong>Flight Number:</strong> {booking.flightNumber}</p>}
                          {booking.flightTime && <p><strong>Flight Time:</strong> {booking.flightTime}</p>}
                          {booking.terminal && <p><strong>Terminal:</strong> {booking.terminal}</p>}
                        </div>

                        {/* Payment & Other */}
                        <div className="details-group">
                          <h4>Payment & Other</h4>
                          <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                          {booking.paymentMethod === 'Card' && (
                            <>
                              <p><strong>Card Type:</strong> {booking.cardType}</p>
                              <p><strong>Name on Card:</strong> {booking.nameOnCard}</p>
                            </>
                          )}
                          <p><strong>Estimated Cost:</strong> ${(Number(booking.estimatedCost) || 0).toFixed(2)}</p>
                          {booking.specialInstructions && <p><strong>Special Instructions:</strong> {booking.specialInstructions}</p>}
                        </div>
                      </div>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(booking._id)}
                      >
                        Delete Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="loading-indicator">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}