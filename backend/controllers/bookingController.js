exports.createBooking = async (req, res) => {
    try {
      const { name, email, phone, ...rideData } = req.body;
  
      // Save or fetch user
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ name, email, phone });
        await user.save();
      }
  
      // Save ride
      const ride = new Ride({
        ...rideData,
        userId: user._id
      });
      await ride.save();
  
      // 1. Notify ADMIN
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: '🚖 New Booking Received',
        text: `New booking from ${name}:\n\n${JSON.stringify(req.body, null, 2)}`
      });
  
      // 2. Confirm with USER (if you want this)
      await sendEmail({
        to: email,
        subject: '✅ Booking Confirmation',
        text: `Hi ${name},\n\nThank you for your booking. Here are the details:\n\n${JSON.stringify(req.body, null, 2)}\n\nWe will get back to you shortly.`
      });
  
      res.status(201).json({ message: 'Booking successful', rideId: ride._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  