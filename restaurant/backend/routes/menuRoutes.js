const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/menu — All items (optionally filter by category)
router.get("/seed", async (req, res) => {
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
      { name: "Bruschetta al Pomodoro", description: "Toasted bread with fresh tomatoes, basil & extra virgin olive oil", price: 380, category: "starters", isVeg: true, featured: true },
      { name: "Burrata Caprese", description: "Creamy burrata with heirloom tomatoes, basil oil & sea salt", price: 520, category: "starters", isVeg: true },
      { name: "Crispy Calamari", description: "Lightly battered squid rings with marinara & lemon aioli", price: 480, category: "starters", featured: true },
      { name: "Wild Mushroom Arancini", description: "Risotto balls filled with porcini mushrooms, truffle & parmesan", price: 440, category: "starters", isVeg: true },
      { name: "Grilled Sea Bass", description: "Whole sea bass with herbs, capers, cherry tomatoes & white wine", price: 1200, category: "mains", featured: true },
      { name: "Osso Buco Milanese", description: "Slow-braised veal shank with gremolata & saffron risotto", price: 1450, category: "mains", featured: true },
      { name: "Truffle Tagliatelle", description: "Fresh pasta with black truffle, butter, parmesan & herbs", price: 980, category: "mains", isVeg: true },
      { name: "Bistecca Fiorentina", description: "T-bone steak grilled over charcoal, rosemary butter & roasted garlic", price: 1800, category: "mains" },
      { name: "Margherita Classica", description: "San Marzano tomato, fior di latte mozzarella & fresh basil", price: 620, category: "mains", isVeg: true },
      { name: "Tiramisu della Casa", description: "Classic homemade tiramisu with espresso, mascarpone & cocoa", price: 360, category: "desserts", isVeg: true, featured: true },
      { name: "Panna Cotta al Frutti", description: "Vanilla panna cotta with seasonal berry compote", price: 320, category: "desserts", isVeg: true },
      { name: "Cannoli Siciliani", description: "Crispy shells filled with sweetened ricotta & candied orange", price: 340, category: "desserts", isVeg: true },
      { name: "Fondente al Cioccolato", description: "Warm chocolate lava cake with vanilla gelato & salted caramel", price: 420, category: "desserts", isVeg: true },
      { name: "Negroni Sbagliato", description: "Campari, sweet vermouth & Prosecco on ice", price: 580, category: "drinks" },
      { name: "Aperol Spritz", description: "Aperol, Prosecco & soda with fresh orange slice", price: 520, category: "drinks", featured: true },
      { name: "Limoncello Spritz", description: "House limoncello, elderflower & sparkling water", price: 480, category: "drinks" },
      { name: "San Pellegrino", description: "Italian sparkling mineral water 750ml", price: 180, category: "drinks", isVeg: true },
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
