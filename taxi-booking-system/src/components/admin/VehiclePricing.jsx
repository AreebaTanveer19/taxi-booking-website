import React, { useState, useEffect } from 'react';
import { FaSave, FaSync, FaInfoCircle } from 'react-icons/fa';
import '../../styles/VehiclePricing.css';

const VehiclePricing = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/vehicle-prices`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setPrices(data.data);
      } else {
        setError('Failed to load vehicle prices');
      }
    } catch (err) {
      setError('Network error while loading vehicle prices');
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultPrices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/vehicle-prices/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setPrices(data.data);
        setSuccess('Default prices initialized successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to initialize default prices');
      }
    } catch (err) {
      setError('Network error while initializing prices');
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...prices];
    newPrices[index] = {
      ...newPrices[index],
      [field]: parseFloat(value) || 0
    };
    setPrices(newPrices);
  };

  const savePrice = async (price, index) => {
    try {
      setSaving({ ...saving, [index]: true });
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/vehicle-prices/${encodeURIComponent(price.vehicleType)}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            baseFare: price.baseFare,
            perKmRate: price.perKmRate,
            hourlyRate: price.hourlyRate,
            baseDistance: price.baseDistance
          })
        }
      );
      
      const data = await response.json();
      if (data.success) {
        setSuccess(`${price.vehicleType} prices updated successfully`);
        setTimeout(() => setSuccess(''), 3000);
        // Update the local state with the saved price
        const newPrices = [...prices];
        newPrices[index] = data.data;
        setPrices(newPrices);
      } else {
        setError(`Failed to update ${price.vehicleType} prices`);
      }
    } catch (err) {
      setError('Network error while saving prices');
    } finally {
      setSaving({ ...saving, [index]: false });
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  // if (loading && prices.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="vehicle-pricing-container">
      <div className="pricing-header">
        {/* <h2>Vehicle Pricing</h2> */}
        <button
          onClick={initializeDefaultPrices}
          className="reset-button"
          disabled={loading}
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
          Reset to Defaults
        </button>
      </div>

      {error && (
        <div className="status-message error">
          <FaInfoCircle />
          {error}
        </div>
      )}

      {success && (
        <div className="status-message success">
          <FaInfoCircle />
          {success}
        </div>
      )}

      <div className="table-container">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Base Fare ($)</th>
              <th>Per Km Rate ($)</th>
              <th>Hourly Rate ($)</th>
              <th>Base Distance (km)</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={price._id}>
                <td>{price.vehicleType}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="pricing-input"
                    value={price.baseFare}
                    onChange={(e) => handlePriceChange(index, 'baseFare', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="pricing-input"
                    value={price.perKmRate}
                    onChange={(e) => handlePriceChange(index, 'perKmRate', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="pricing-input"
                    value={price.hourlyRate}
                    onChange={(e) => handlePriceChange(index, 'hourlyRate', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="pricing-input"
                    value={price.baseDistance}
                    onChange={(e) => handlePriceChange(index, 'baseDistance', e.target.value)}
                  />
                </td>
                <td className="text-sm text-gray-500">
                  {new Date(price.updatedAt).toLocaleString()}
                </td>
                <td>
                  <button
                    onClick={() => savePrice(price, index)}
                    disabled={saving[index]}
                    className="action-button"
                  >
                    <FaSave />
                    {saving[index] ? 'Saving...' : 'Save'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="note-box">
        <p>
          <strong>Note:</strong> Changes to pricing will affect all new bookings. Existing bookings will not be affected.
        </p>
      </div>
    </div>
  );
};

export default VehiclePricing;
