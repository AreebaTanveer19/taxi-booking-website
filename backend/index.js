const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');


dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
    'http://localhost:5173',
    'https://www.horizonchauffeurs.com.au',
    'https://horizonchauffeurs.com.au',
    'https://taxi-booking-website-production.up.railway.app',
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
  
// Remove duplicate json parser and add proper config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
