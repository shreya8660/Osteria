const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["starters", "mains", "desserts", "drinks"],
      required: true,
    },
    image: { type: String, default: "" },
    isVeg: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
