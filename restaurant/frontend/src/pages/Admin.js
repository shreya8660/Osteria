import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const STATUS_COLORS = {
  pending: "text-yellow-400",
  confirmed: "text-green-400",
  cancelled: "text-red-400",
};

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");
    if (user.role !== "admin") return navigate("/");
    axios.get("/api/bookings")
      .then(r => setBookings(r.data))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const updateStatus = async (id, status) => {
    await axios.patch(`/api/bookings/${id}`, { status });
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    toast.success("Status updated");
  };

  const seedMenu = async () => {
    try {
      const { data } = await axios.post("/api/menu/seed");
      toast.success(data.message);
    } catch {
      toast.error("Seed failed");
    }
  };

  const counts = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-1">Dashboard</p>
            <h1 className="font-display text-3xl text-cream-light">Admin Panel</h1>
          </div>
          <button onClick={seedMenu} className="btn-outline text-xs py-2">
            Seed Menu Data
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total", value: counts.total, color: "text-gold" },
            { label: "Pending", value: counts.pending, color: "text-yellow-400" },
            { label: "Confirmed", value: counts.confirmed, color: "text-green-400" },
            { label: "Cancelled", value: counts.cancelled, color: "text-red-400" },
          ].map(s => (
            <div key={s.label} className="bg-espresso-light border border-gold/15 p-6 text-center">
              <div className={`font-display text-3xl mb-1 ${s.color}`}>{s.value}</div>
              <div className="font-sans text-xs tracking-widest uppercase text-cream/40">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="bg-espresso-light border border-gold/15 overflow-hidden">
          <div className="px-6 py-4 border-b border-gold/10">
            <h2 className="font-sans text-xs tracking-widest uppercase text-gold">All Reservations</h2>
          </div>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/10">
                    {["Guest", "Date", "Time", "Guests", "Table", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left font-sans text-xs tracking-widest uppercase text-cream/30 px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b._id} className="border-b border-gold/5 hover:bg-espresso/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-sans text-cream text-sm">{b.name}</div>
                        <div className="font-sans text-cream/40 text-xs">{b.email}</div>
                      </td>
                      <td className="px-4 py-3 font-sans text-cream/70 text-xs">
                        {new Date(b.date).toLocaleDateString("en-IN", { day:"numeric", month:"short" })}
                      </td>
                      <td className="px-4 py-3 font-sans text-cream/70 text-xs">{b.time}</td>
                      <td className="px-4 py-3 font-sans text-cream/70 text-xs">{b.guests}</td>
                      <td className="px-4 py-3 font-sans text-cream/70 text-xs">#{b.tableNumber}</td>
                      <td className="px-4 py-3">
                        <span className={`font-sans text-xs tracking-widest uppercase ${STATUS_COLORS[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={b.status}
                          onChange={e => updateStatus(b._id, e.target.value)}
                          className="bg-espresso border border-gold/20 text-cream/70 text-xs px-2 py-1 focus:outline-none focus:border-gold"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirm</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <p className="text-center font-body text-cream/30 py-10">No bookings yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
