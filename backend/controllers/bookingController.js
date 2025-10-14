const Booking = require('../models/Booking');
const User = require('../models/Users');
const { sendEmail } = require('../utils/email');

exports.createBooking = async (req, res) => {
    try {
        const {
            // User Information
            name,
            email,
            phone,
            
            // Trip Details
            city,
            serviceType,
            terminal,
            airportDirection,
            pickup,
            dropoff,
            additionalStop,
            date,
            time,
            expectedEndTime,
            bookingMethod,
            
            // Passenger Information
            totalPassengers,
            adults,
            children_0_4,
            children_5_8,
            
            // Luggage Information
            suitcases,
            carryOn,
            
            // Flight Information
            flightNumber,
            flightTime,
            
            // Vehicle Information
            vehicleType,
            vehiclePreference,
            
            // Additional Information
            specialInstructions,
            
            // System Information
            distance,
            estimatedCost,
            status,
            createdAt
        } = req.body;

        // Validate required fields - relaxed to match frontend
        if (!name || !email || !phone || !city || !serviceType || !pickup || 
            !date || !time || !totalPassengers || !adults || estimatedCost === undefined) {
            return res.status(400).json({ 
                success: false,
                error: 'Missing required fields',
                message: 'Please fill in all required fields'
            });
        }

        // Validate passenger counts
        const totalPax = parseInt(adults || 0) + parseInt(children_0_4 || 0) + parseInt(children_5_8 || 0);
        if (totalPax !== parseInt(totalPassengers)) {
            return res.status(400).json({ 
                success: false,
                error: 'Passenger counts do not match',
                message: 'Total passengers must equal sum of adults and children'
            });
        }

        // Save or fetch user
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email, phone });
            await user.save();
        }

        // Use vehiclePreference if vehicleType is not provided
        const vehicle = vehiclePreference || vehicleType;

        // Create and save booking
        const booking = new Booking({
            userId: user._id,
            name,
            email,
            phone,
            city,
            serviceType,
            terminal: serviceType === 'Airport Transfers' ? terminal : undefined,
            airportDirection: serviceType === 'Airport Transfers' ? airportDirection : undefined,
            pickup,
            dropoff: dropoff || '',
            additionalStop: additionalStop || '',
            date,
            time,
            expectedEndTime: expectedEndTime || '',
            bookingMethod: bookingMethod || 'distance',
            totalPassengers: parseInt(totalPassengers),
            adults: parseInt(adults),
            children_0_4: parseInt(children_0_4) || 0,
            children_5_8: parseInt(children_5_8) || 0,
            suitcases: parseInt(suitcases) || 0,
            carryOn: parseInt(carryOn) || 0,
            flightNumber: serviceType === 'Airport Transfers' ? (flightNumber || '') : undefined,
            flightTime: serviceType === 'Airport Transfers' ? (flightTime || '') : undefined,
            vehiclePreference: vehicle,
            specialInstructions: specialInstructions || '',
            distance: distance || '',
            estimatedCost: parseFloat(estimatedCost) || 0,
            status: status || 'pending'
        });

        await booking.save();

        // Prepare booking details for email
        const bookingDetails = {
            'Booking ID': booking._id,
            'Name': name,
            'Email': email,
            'Phone': phone,
            'City': city,
            'Service Type': serviceType,
            'From': pickup,
            'To': dropoff || 'N/A',
            'Date': date,
            'Time': time,
            'Vehicle Type': vehicle,
            'Total Passengers': totalPassengers,
            'Adults': adults,
            'Children (0-4)': children_0_4 || 0,
            'Children (5-8)': children_5_8 || 0,
            'Suitcases': suitcases || 0,
            'Carry-on': carryOn || 0,
            'Estimated Cost': `$${estimatedCost}`,
            'Special Instructions': specialInstructions || 'None'
        };

        if (serviceType === 'Airport Transfers') {
            bookingDetails['Terminal'] = terminal || 'N/A';
            bookingDetails['Direction'] = airportDirection === 'to' ? 'To Airport' : 'From Airport';
            bookingDetails['Flight Number'] = flightNumber || 'N/A';
            bookingDetails['Flight Time'] = flightTime || 'N/A';
        }

        // Notify Admin
        await sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: '🚖 New Booking Received',
            text: `New booking from ${name}:\n\n${JSON.stringify(bookingDetails, null, 2)}`
        });

        // Send confirmation to user
        await sendEmail({
            to: email,
            subject: '✅ Booking Confirmation',
            text: `Hi ${name},\n\nThank you for your booking. Here are your booking details:\n\n${Object.entries(bookingDetails).map(([key, value]) => `${key}: ${value}`).join('\n')}\n\nWe will get back to you shortly to confirm your booking.\n\nBest regards,\nYour Taxi Service Team`
        });

        res.status(201).json({ 
            success: true,
            message: 'Booking successful', 
            bookingId: booking._id,
            data: booking,
            bookingDetails
        });
    } catch (err) {
        console.error('Booking error:', err);
        res.status(500).json({ 
            success: false,
            error: 'Server error',
            message: err.message 
        });
    }
};

// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Get single booking
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        console.error('Error fetching booking:', err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        
        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        console.error('Error updating booking status:', err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};