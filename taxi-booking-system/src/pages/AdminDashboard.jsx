import React, { useState, useEffect } from 'react';
import { FaUsers, FaMoneyBillWave, FaClipboardList, FaSignOutAlt, FaCar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import VehiclePricing from '../components/admin/VehiclePricing';
import '../styles/AdminDashboard.css';
import '../styles/VehiclePricing.css';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBookings, setExpandedBookings] = useState({});
  const [bookingSearch, setBookingSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const menuButton = document.querySelector('.menu-btn');
      
      if (sidebarOpen && window.innerWidth <= 1024 && 
          !sidebar.contains(event.target) && 
          !menuButton.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    // Add event listener for window resize
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Close sidebar on mobile after selecting a tab
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/bookings`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
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

  const sortedBookings = [...bookings].sort((a, b) => {
    // Use createdAt timestamp if available, otherwise use booking date and time
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(`${a.date} ${a.time}`);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(`${b.date} ${b.time}`);
    return dateB - dateA; // Sort in descending order (newest first)
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/bookings/${id}`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, {
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


  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    // Ensure we're redirecting to the admin login page
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
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Horizon Chauffeurs</h2>
          <button onClick={toggleSidebar} className="close-btn">×</button>
        </div>
        <ul className="sidebar-menu">
          <li 
            className={activeTab === 'bookings' ? 'active' : ''} 
            onClick={() => handleTabChange('bookings')}
          >
            <FaClipboardList className="icon" />
            <span>Bookings</span>
          </li>
          <li 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => handleTabChange('users')}
          >
            <FaUsers className="icon" />
            <span>Users</span>
          </li>
          <li 
            className={activeTab === 'pricing' ? 'active' : ''}
            onClick={() => handleTabChange('pricing')}
          >
            <FaMoneyBillWave className="icon" />
            <span>Pricing</span>
          </li>
          <li className="logout-item">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="logout-button"
            >
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="header">
          <button onClick={toggleSidebar} className="menu-btn">☰</button>
          <h1>
            {activeTab === 'bookings' && 'Bookings'}
            {activeTab === 'users' && 'Users'}
            {activeTab === 'pricing' && 'Pricing Management'}
          </h1>
          <div className="user-info">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        {activeTab === 'pricing' ? (
          <div className="content">
            <VehiclePricing />
          </div>
        ) : activeTab === 'users' ? (
          <div className="content">
            <div className="table-container">
              <div className="table-header">
                {/* <h2>Users</h2> */}
                <div className="search-export">
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="loading-indicator">Loading users...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="4" className="error-message">{error}</td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="no-users">No users found</td>
                      </tr>
                    ) : (
                      filteredUsers.map(user => (
                        <tr key={user._id} className="user-row">
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone || 'N/A'}</td>
                          <td className="user-actions">
                            <button 
                              className="delete-btn"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
            <div className="content">
              <div className="bookings-list">
                {filteredBookings.map(booking => (
                <div key={booking._id} className="booking-item">
                  <div className="booking-summary">
                    <div className="trip-info">
                      <div className="trip-flow">
                        <p className="pickup-location">{booking.pickup || 'Not specified'}</p>
                        <div className="trip-arrow">↓</div>
                        <p className="dropoff-location">{booking.dropoff || 'Not specified'}</p>
                      </div>
                      {booking.city && <p className="city-subtitle">{booking.city}</p>}
                    </div>
                    <span>${(Number(booking.price || booking.estimatedCost || booking.totalAmount || 0)).toFixed(2)}</span>
                    <span>{new Date(`${booking.date}T${booking.time}`).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }).replace(',', '')}</span>
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
                        {/* Trip Information */}
                        <div className="details-group">
                          <h4>🚖 Trip Information</h4>
                          <p><strong>Booking Type:</strong> {booking.bookingMethod === 'distance' ? 'Distance-based' : 'Time-based'}</p>
                          <p><strong>Service Type:</strong> {booking.serviceType || 'Not specified'}</p>
                          <p><strong>Booking Date:</strong> {new Date(booking.createdAt || booking.date).toLocaleDateString()}</p>
                          <p><strong>Pickup Time:</strong> {new Date(`2000-01-01T${booking.time}`).toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', hour12: false})}</p>
                          <p><strong>Pickup Location:</strong> {booking.pickup || 'Not specified'}</p>
                          <p><strong>Drop-off Location:</strong> {booking.dropoff || 'Not specified'}</p>
                          {booking.additionalStop && (
                            <p><strong>Additional Stop:</strong> {booking.additionalStop}</p>
                          )}
                          {booking.city && <p><strong>City/Region:</strong> {booking.city}</p>}
                          {booking.distance && <p><strong>Distance:</strong> {(booking.distance / 1000).toFixed(1)} km</p>}
                          {booking.expectedEndTime && <p><strong>Expected End Time:</strong> {new Date(`2000-01-01T${booking.expectedEndTime}`).toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', hour12: false})}</p>}
                          
                        </div>

                        {/* Passenger & Luggage Information */}
                        <div className="details-group">
                          <h4>👥 Passenger & Luggage</h4>
                          <div className="passenger-details">
                            <div className="detail-row">
                              <span className="detail-label"><strong>Adults:</strong> {booking.adults || 1}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label"><strong>Children less than 4:</strong> {booking.children_0_4 || 0}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label"><strong>Children (5-8):</strong> {booking.children_5_8 || 0}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label"><strong>Total Passengers:</strong> {booking.totalPassengers || booking.passengers || 1}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label"><strong>Suitcases:</strong> {booking.suitcases || 0}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label"><strong>Carry-on:</strong> {booking.carryOn || 0}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label"><strong>Selected Vehicle:</strong> {booking.vehiclePreference || 'Not specified'}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label"><strong>Estimated Fare:</strong> ${booking.estimatedCost}</span>
                            </div>

                          </div>
                          <p><strong>Airport Pickup:</strong> {booking.serviceType === 'Airport Transfers' ? 'Yes' : 'No'}</p>
                          {booking.serviceType === 'Airport Transfers' && booking.terminal && (
                            <>
                              <p><strong>Direction:</strong> {booking.airportDirection === 'to' ? 'To Airport' : booking.airportDirection === 'from' ? 'From Airport' : 'Not specified'}</p>
                              <p><strong>Terminal:</strong> {booking.terminal}</p>
                            </>
                          )}
                        </div>

                        {/* Passenger Details */}
                        <div className="details-group">
                          <h4>👤 Passenger Details</h4>
                          <p><strong>Full Name:</strong> {booking.userId?.name || booking.name || 'Not provided'}</p>
                          <p><strong>Phone Number:</strong> {booking.userId?.phone || booking.phone || 'Not provided'}</p>
                          <p><strong>Email Address:</strong> {booking.userId?.email || booking.email || 'Not provided'}</p>
                          <p><strong>Payment Method:</strong> {booking.paymentMethod || 'Not specified'}</p>
                          <h4>📝 Special Instructions</h4>
                            <p>{booking.specialInstructions || 'No special instructions'}</p>
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
            </div>
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

