import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/bookings');
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
      const response = await fetch('http://localhost:5000/api/admin/users');
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

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB - dateA;
  });

  const filteredBookings = sortedBookings.filter(b => 
    b.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.userId?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setBookings(bks => bks.filter(b => b._id !== id));
      }
    } catch (err) {
      setError('Failed to delete booking');
    }
  };

  const handleExport = () => {
    const csvRows = [
      [
        'Name', 'Email', 'Phone',
        'Booking Method', 'City', 'Service Type', 'Flight Number', 'Flight Time', 'Luggage', 'Special Instructions',
        'Payment Method', 'Name On Card', 'Card Type', 'Expiry Month', 'Expiry Year', 'Terms Accepted',
        'Vehicle Preference', 'Date', 'Time', 'Passengers', 'Baby Seat',
        'Pickup', 'Dropoff', 'Distance', 'Pickup Postcode', 'Dropoff Postcode', 'Estimated Cost', 'Status'
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
        b.babySeat ? 'Yes' : 'No',
        b.pickup,
        b.dropoff,
        b.distance,
        b.pickupPostcode,
        b.dropoffPostcode,
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
    // Clear admin auth state
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.jpeg" alt="Logo" className="sidebar-logo" />
          <h2 className="sidebar-title">Horizon Chauffeurs</h2>
        </div>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#" className="nav-link active">
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${!showUsers ? 'active' : ''}`}
              onClick={() => {
                fetchBookings();
                setShowUsers(false);
              }}
            >
              <span className="nav-icon">🚖</span>
              <span>Bookings</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${showUsers ? 'active' : ''}`}
              onClick={() => {
                fetchUsers();
                setShowUsers(true);
              }}
            >
              <span className="nav-icon">👥</span>
              <span>Users</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link" 
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span className="nav-icon">🚪</span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1 className="header-title">Dashboard</h1>
          <div className="user-profile">
            <span>Welcome, Admin</span>
            <div className="user-avatar">👤</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="cards-container">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Total Bookings</h3>
              <div className="card-icon">📅</div>
            </div>
            <p className="card-value">{bookings.length}</p>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Active Drivers</h3>
              <div className="card-icon">👨‍✈️</div>
            </div>
            <p className="card-value">24</p>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Revenue</h3>
              <div className="card-icon">💰</div>
            </div>
            <p className="card-value">$12,450</p>
          </div>
        </div>

        {/* Recent Bookings */}
        {showUsers ? (
          <div className="recent-bookings">
            <h2 className="section-title">Users</h2>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(u => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-bookings">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="recent-bookings">
            <h2 className="section-title">Recent Bookings</h2>
            
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search bookings..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pickup</th>
                  <th>Dropoff</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map(b => (
                    <tr key={b._id}>
                      <td>{b.userId?.name || ''}</td>
                      <td>{b.userId?.email || ''}</td>
                      <td>{b.userId?.phone || ''}</td>
                      <td>{b.pickup}</td>
                      <td>{b.dropoff}</td>
                      <td>{b.date}</td>
                      <td>{b.status || 'Confirmed'}</td>
                      <td>
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDelete(b._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-bookings">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Export Button */}
        {!showUsers && (
          <button onClick={handleExport}>Export to CSV</button>
        )}
        
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