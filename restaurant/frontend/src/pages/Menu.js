import { useEffect, useState } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "starters", label: "Starters" },
  { key: "mains", label: "Mains" },
  { key: "desserts", label: "Desserts" },
  { key: "drinks", label: "Drinks" },
];

const Menu = () => {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const url =
  active === "all"
    ? "https://osteria-1.onrender.com/api/menu"
    : `https://osteria-1.onrender.com/api/menu?category=${active}`;

  setLoading(true);

  axios
    .get(url)
    .then((r) => setItems(r.data))
    .finally(() => setLoading(false));
}, [active]);
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-3">Cucina Italiana</p>
          <h1 className="section-title">Our Menu</h1>
          <div className="divider-gold max-w-xs mx-auto">
            <span className="text-gold">✦</span>
          </div>
          <p className="font-body text-cream/55 max-w-lg mx-auto mt-4">
            Prepared fresh daily with seasonal ingredients sourced from trusted producers 
            across Italy and local farms.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`font-sans text-xs tracking-widest uppercase px-6 py-2.5 border transition-all duration-200 ${
                active === c.key
                  ? "bg-gold text-espresso border-gold"
                  : "border-gold/30 text-cream/60 hover:border-gold hover:text-gold"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-cream/40 text-lg mb-4">No items available.</p>
            <p className="font-sans text-cream/30 text-xs">
              Seed the database: <code className="text-gold">POST /api/menu/seed</code>
            </p>
          </div>
        )}

        {/* Dietary legend */}
        <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-gold/15">
          {[
            { color: "bg-green-500 border-green-500", label: "Vegetarian" },
            { color: "bg-red-500 border-red-500", label: "Non-Vegetarian" },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span className={`w-3.5 h-3.5 border-2 rounded-sm ${d.color}`} />
              <span className="font-sans text-cream/50 text-xs">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
