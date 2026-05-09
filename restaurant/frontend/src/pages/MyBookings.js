import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const STATUS_COLORS = {
  pending: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  confirmed: "text-green-400 border-green-400/30 bg-green-400/10",
  cancelled: "text-red-400 border-red-400/30 bg-red-400/10",
};

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");
    axios.get("https://osteria-1.onrender.com/api/bookings/my")
      .then(r => setBookings(r.data))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const cancel = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    await axios.delete(`https://osteria-1.onrender.com/api/bookings/${id}`)
    toast.success("Booking cancelled.");
    setBookings(bookings.map(b => b._id === id ? { ...b, status: "cancelled" } : b));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-2">Your Account</p>
          <h1 className="font-display text-4xl text-cream-light">My Reservations</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 border border-gold/15 bg-espresso-light">
            <p className="font-display text-2xl text-cream/50 mb-4">No Reservations Yet</p>
            <p className="font-body text-cream/40 mb-8">Your table awaits. Book a memorable dining experience.</p>
            <button onClick={() => navigate("/booking")} className="btn-gold">Reserve Now</button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="bg-espresso-light border border-gold/15 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    {[
                      ["Date", new Date(b.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })],
                      ["Time", b.time],
                      ["Guests", b.guests],
                      ["Table", `#${b.tableNumber}`],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div className="font-sans text-xs tracking-widest uppercase text-cream/30 mb-1">{k}</div>
                        <div className="font-sans text-cream text-sm">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-sans text-xs tracking-widest uppercase px-3 py-1 border ${STATUS_COLORS[b.status]}`}>
                      {b.status}
                    </span>
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => cancel(b._id)}
                        className="font-sans text-xs tracking-widest uppercase text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                {b.specialRequests && (
                  <p className="mt-3 pt-3 border-t border-gold/10 font-body text-cream/40 text-xs">
                    Note: {b.specialRequests}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
