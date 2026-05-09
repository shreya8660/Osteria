import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
  "https://osteria-1.onrender.com/api/contact",
  form
);
      toast.success("Message sent! We'll be in touch.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-3">Get in Touch</p>
          <h1 className="section-title">Contact Us</h1>
          <div className="divider-gold max-w-xs mx-auto">
            <span className="text-gold">✦</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-10">
            {[
              {
                icon: "📍",
                title: "Address",
                lines: ["12 Via della Vigna", "Indiranagar, Bengaluru", "Karnataka 560038"],
              },
              {
                icon: "📞",
                title: "Phone",
                lines: ["+91 98765 43210", "+91 80-4567 8901"],
              },
              {
                icon: "✉️",
                title: "Email",
                lines: ["info@osteriaaurea.com", "reservations@osteriaaurea.com"],
              },
              {
                icon: "🕐",
                title: "Hours",
                lines: ["Tue–Fri: 12pm–3pm, 7pm–11pm", "Sat–Sun: 11am–4pm, 6:30pm–11:30pm", "Monday: Closed"],
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-sans text-gold text-xs tracking-widest uppercase mb-2">{item.title}</h3>
                  {item.lines.map((l) => (
                    <p key={l} className="font-body text-cream/60 text-sm">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-espresso-light border border-gold/15 p-8 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">Name *</label>
                <input
                  name="name" required value={form.name} onChange={handleChange}
                  placeholder="Your name" className="input-dark"
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">Email *</label>
                <input
                  type="email" name="email" required value={form.email} onChange={handleChange}
                  placeholder="your@email.com" className="input-dark"
                />
              </div>
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">Subject *</label>
              <input
                name="subject" required value={form.subject} onChange={handleChange}
                placeholder="How can we help?" className="input-dark"
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">Message *</label>
              <textarea
                name="message" rows={5} required value={form.message} onChange={handleChange}
                placeholder="Your message..." className="input-dark resize-none"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full flex justify-center items-center gap-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-espresso/40 border-t-espresso rounded-full animate-spin" /> Sending...</>
              ) : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
