const MenuCard = ({ item }) => (
  <div className="group relative bg-espresso-light border border-gold/15 hover:border-gold/40 transition-all duration-300 overflow-hidden">
    {/* Veg / Non-veg indicator */}
    <div className="absolute top-3 right-3 z-10">
      <span
        className={`inline-block w-4 h-4 border-2 rounded-sm ${
          item.isVeg ? "border-green-500" : "border-red-500"
        }`}
      >
        <span
          className={`block w-2 h-2 rounded-full m-0.5 ${
            item.isVeg ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </span>
    </div>

    <div className="p-6">
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="font-display text-cream-light text-lg leading-snug group-hover:text-gold transition-colors duration-200">
          {item.name}
        </h3>
        <span className="font-sans text-gold font-semibold text-sm whitespace-nowrap">
          ₹{item.price}
        </span>
      </div>
      <p className="font-body text-cream/55 text-sm leading-relaxed">{item.description}</p>
      {item.featured && (
        <span className="inline-block mt-4 font-sans text-gold/70 text-xs tracking-widest uppercase border border-gold/30 px-2 py-0.5">
          Chef's Choice
        </span>
      )}
    </div>
  </div>
);

export default MenuCard;
