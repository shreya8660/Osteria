const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST /api/bookings — Create a booking (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;

    // Auto-assign table number (simple logic)
    const tableNumber = Math.floor(Math.random() * 20) + 1;

    const booking = await Booking.create({
      user: req.user?._id,
      name,
      email,
      phone,
      date,
      time,
      guests,
      tableNumber,
      specialRequests,
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings/my — User's own bookings
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.user.email }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings — Admin: all bookings
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/bookings/:id — Admin: update status
router.patch("/:id", protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/bookings/:id — Cancel booking
router.delete("/:id", protect, async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "cancelled" });
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
