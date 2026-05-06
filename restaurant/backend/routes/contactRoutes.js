const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: "Message received!", contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contact — Admin only
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
