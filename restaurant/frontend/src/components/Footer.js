import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-espresso-dark border-t border-gold/15 py-14 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="mb-4">
          <span className="font-display text-gold text-2xl tracking-wide">Osteria Aurea</span>
          <p className="font-sans text-cream/50 text-xs tracking-widest uppercase mt-1">Fine Italian Dining</p>
        </div>
        <p className="font-body text-cream/60 text-sm leading-relaxed max-w-xs">
          A celebration of Italian culinary traditions. Each dish tells a story of heritage, 
          passion and the finest seasonal ingredients.
        </p>
      </div>

      <div>
        <h4 className="font-sans text-gold text-xs tracking-widest uppercase mb-5">Navigate</h4>
        <ul className="space-y-3">
          {[["Home", "/"], ["Menu", "/menu"], ["Reserve a Table", "/booking"], ["Contact", "/contact"]].map(([l, h]) => (
            <li key={h}>
              <Link to={h} className="font-sans text-cream/50 text-xs tracking-wide hover:text-gold transition-colors">
                {l}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-sans text-gold text-xs tracking-widest uppercase mb-5">Contact</h4>
        <div className="space-y-3 font-sans text-cream/50 text-xs tracking-wide">
          <p>12 Via della Vigna<br />Bengaluru, Karnataka</p>
          <p>+91 98765 43210</p>
          <p>info@osteriaaurea.com</p>
          <div className="pt-2">
            <p className="text-gold/70 mb-1">Hours</p>
            <p>Tue–Sun: 12pm – 3pm</p>
            <p>Tue–Sun: 7pm – 11pm</p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-3">
      <p className="font-sans text-cream/30 text-xs tracking-wide">
        © {new Date().getFullYear()} Osteria Aurea. All rights reserved.
      </p>
      <p className="font-sans text-cream/30 text-xs tracking-wide">
        Crafted with passion · Built with MERN
      </p>
    </div>
  </footer>
);

export default Footer;
