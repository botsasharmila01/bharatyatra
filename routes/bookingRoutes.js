const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Place = require("../models/Place");
const { protect } = require("../middleware/auth");

// Create booking
router.post("/", protect, async (req, res) => {
  try {
    const { placeId, checkIn, checkOut, guests, specialRequests } = req.body;
    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ message: "Place not found" });

    const days = checkOut && checkIn ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 1;
    const totalAmount = (place.price || 0) * days * (guests || 1);

    const booking = await Booking.create({
      user: req.user._id,
      place: placeId,
      placeName: place.name,
      category: place.category,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      specialRequests
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("place").sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = "cancelled";
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
