const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    'https://taxi-booking-website-production.up.railway.app',
    'http://localhost:5000',
    'https://your-vercel-app-url.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// Remove duplicate json parser and add proper config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
