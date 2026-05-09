const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/menu — All items (optionally filter by category)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured) filter.featured = true;
    const items = await MenuItem.find({ ...filter, isAvailable: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/menu/seed — Seed sample menu items
router.get("/seed", async (req, res) => {
  try {
    await MenuItem.deleteMany();
   const items = [
  {
    name: "Bruschetta al Pomodoro",
    description: "Toasted bread with fresh tomatoes, basil & extra virgin olive oil",
    price: 380,
    category: "starters",
    isVeg: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f"
  },

  {
    name: "Burrata Caprese",
    description: "Creamy burrata with heirloom tomatoes, basil oil & sea salt",
    price: 520,
    category: "starters",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d"
  },

  {
    name: "Crispy Calamari",
    description: "Lightly battered squid rings with marinara & lemon aioli",
    price: 480,
    category: "starters",
    featured: true,
    image: "https://images.unsplash.com/photo-1625944525533-473f1b3d54b3"
  },

  {
    name: "Wild Mushroom Arancini",
    description: "Risotto balls filled with porcini mushrooms, truffle & parmesan",
    price: 440,
    category: "starters",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947"
  },

  {
    name: "Grilled Sea Bass",
    description: "Whole sea bass with herbs, capers, cherry tomatoes & white wine",
    price: 1200,
    category: "mains",
    featured: true,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae"
  },

  {
    name: "Osso Buco Milanese",
    description: "Slow-braised veal shank with gremolata & saffron risotto",
    price: 1450,
    category: "mains",
    featured: true,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554"
  },

  {
    name: "Truffle Tagliatelle",
    description: "Fresh pasta with black truffle, butter, parmesan & herbs",
    price: 980,
    category: "mains",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
  },

  

  {
    name: "Bistecca Fiorentina",
    description: "T-bone steak grilled over charcoal, rosemary butter & roasted garlic",
    price: 1800,
    category: "mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947"
  },

  {
    name: "Margherita Classica",
    description: "San Marzano tomato, fior di latte mozzarella & fresh basil",
    price: 620,
    category: "mains",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },

  {
    name: "Tiramisu della Casa",
    description: "Classic homemade tiramisu with espresso, mascarpone & cocoa",
    price: 360,
    category: "desserts",
    isVeg: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9"
  }
];
    await MenuItem.insertMany(items);
    res.json({ message: "Menu seeded!", count: items.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/menu — Admin: add item
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/menu/:id — Admin: delete item
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
