import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const TIMES = [
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM",
];

const Booking = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/bookings`,
  form
);
      setSuccess(data.booking);
      toast.success("🎉 Table reserved successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark flex items-center justify-center">
        <div className="max-w-lg w-full text-center border border-gold/30 p-12 bg-espresso-light">
          <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
            <span className="text-gold text-2xl">✓</span>
          </div>
          <h2 className="font-display text-3xl text-cream-light mb-3">Reservation Confirmed</h2>
          <p className="font-body text-cream/60 mb-8">
            We look forward to welcoming you, <em>{success.name}</em>.
          </p>
          <div className="bg-espresso p-6 text-left space-y-3 mb-8">
            {[
              ["Date", new Date(success.date).toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })],
              ["Time", success.time],
              ["Guests", success.guests],
              ["Table", `#${success.tableNumber}`],
              ["Status", success.status.toUpperCase()],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="font-sans text-cream/40 text-xs tracking-widest uppercase">{k}</span>
                <span className="font-sans text-gold text-sm">{v}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSuccess(null)}
            className="btn-outline"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-3">Join Us</p>
          <h1 className="section-title">Reserve a Table</h1>
          <div className="divider-gold max-w-xs mx-auto">
            <span className="text-gold">✦</span>
          </div>
          <p className="font-body text-cream/55 mt-4">
            For parties larger than 10, please contact us directly at +91 98765 43210.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-espresso-light border border-gold/15 p-8 md:p-12 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="input-dark"
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input-dark"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="input-dark"
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">
                Number of Guests *
              </label>
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="input-dark"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                required
                min={today}
                value={form.date}
                onChange={handleChange}
                className="input-dark"
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">
                Preferred Time *
              </label>
              <select
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="input-dark"
              >
                <option value="">Select time</option>
                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              rows={3}
              value={form.specialRequests}
              onChange={handleChange}
              placeholder="Allergies, dietary requirements, occasion..."
              className="input-dark resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm Reservation"
            )}
          </button>
        </form>

        <p className="text-center font-body text-cream/30 text-xs mt-6">
          Cancellations must be made 24 hours in advance. We hold reservations for 15 minutes.
        </p>
      </div>
    </div>
  );
};

export default Booking;
