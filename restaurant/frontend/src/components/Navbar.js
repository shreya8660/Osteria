import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/booking", label: "Reserve" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-espresso/95 backdrop-blur-sm shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-gold text-2xl tracking-wide">Osteria</span>
          <span className="font-sans text-cream/60 text-xs tracking-[0.35em] uppercase">Aurea</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                location.pathname === link.to
                  ? "text-gold"
                  : "text-cream/70 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "admin" && (
                <Link to="/admin" className="font-sans text-xs tracking-widest uppercase text-gold/80 hover:text-gold">
                  Admin
                </Link>
              )}
              <Link to="/my-bookings" className="font-sans text-xs tracking-widest uppercase text-cream/70 hover:text-gold">
                My Bookings
              </Link>
              <button onClick={handleLogout} className="btn-outline text-xs py-2 px-5">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="font-sans text-xs tracking-widest uppercase text-cream/70 hover:text-gold">
                Sign In
              </Link>
              <Link to="/register" className="btn-gold text-xs py-2 px-5">
                Join
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-cream" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`h-px bg-gold transition-all ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`h-px bg-gold transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-gold transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-espresso border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs tracking-widest uppercase text-cream/80"
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-gold/20" />
          {user ? (
            <>
              <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="font-sans text-xs tracking-widest uppercase text-cream/70">
                My Bookings
              </Link>
              <button onClick={handleLogout} className="btn-outline w-fit">Sign Out</button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline">Sign In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-gold">Join</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
