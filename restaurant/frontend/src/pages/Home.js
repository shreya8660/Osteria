import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuCard from "../components/MenuCard";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get("/api/menu?featured=true").then((r) => setFeatured(r.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-espresso-dark">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso-dark via-espresso/80 to-espresso" />
        </div>

        {/* Decorative circle */}
        <div className="absolute w-[600px] h-[600px] border border-gold/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-[700px] h-[700px] border border-gold/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <p className="font-sans text-gold text-xs tracking-[0.5em] uppercase mb-6 fade-up">
            Est. 1987 · Bengaluru
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream-light leading-tight mb-6 fade-up-delay-1">
            Where Italy<br />
            <em className="text-gold">meets soul</em>
          </h1>
          <p className="font-body text-cream/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 fade-up-delay-2">
            An intimate trattoria celebrating the art of slow food, 
            fine wine, and convivial dining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up-delay-3">
            <Link to="/booking" className="btn-gold">Reserve a Table</Link>
            <Link to="/menu" className="btn-outline">View Menu</Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-sans text-xs tracking-widest uppercase text-cream/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-20 px-6 bg-espresso">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { num: "37", label: "Years of Tradition", desc: "Carrying forward authentic Italian recipes since 1987" },
            { num: "60+", label: "Signature Dishes", desc: "From handmade pasta to wood-fired delights" },
            { num: "4.9★", label: "Guest Rating", desc: "Consistently loved by our discerning guests" },
          ].map((s) => (
            <div key={s.num} className="group">
              <div className="font-display text-gold text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {s.num}
              </div>
              <div className="font-sans text-cream-light text-sm tracking-widest uppercase mb-2">{s.label}</div>
              <div className="font-body text-cream/50 text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-20 px-6 bg-espresso-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-3">From Our Kitchen</p>
            <h2 className="section-title">Chef's Selections</h2>
            <div className="divider-gold max-w-xs mx-auto">
              <span className="text-gold text-lg">✦</span>
            </div>
          </div>

          {featured.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 6).map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-cream/40 font-body">
              Menu loading... (seed the database via <code className="text-gold">POST /api/menu/seed</code>)
            </p>
          )}

          <div className="text-center mt-10">
            <Link to="/menu" className="btn-outline">Explore Full Menu</Link>
          </div>
        </div>
      </section>

      {/* RESERVE BANNER */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 border-y border-gold/20" />
        <div className="relative text-center max-w-2xl mx-auto">
          <p className="font-sans text-gold/70 text-xs tracking-[0.5em] uppercase mb-4">Join Us</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream-light mb-5">
            Reserve Your Table Tonight
          </h2>
          <p className="font-body text-cream/60 text-lg mb-8">
            Every meal at Osteria Aurea is an experience crafted with care. 
            Let us create a moment you'll savour long after the last bite.
          </p>
          <Link to="/booking" className="btn-gold">Book Now</Link>
        </div>
      </section>

      {/* OPENING HOURS */}
      <section className="py-20 px-6 bg-espresso">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-3">When to Visit</p>
          <h2 className="section-title mb-10">Opening Hours</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { day: "Tuesday – Friday", lunch: "12:00 – 3:00 pm", dinner: "7:00 – 11:00 pm" },
              { day: "Saturday & Sunday", lunch: "11:00 – 4:00 pm", dinner: "6:30 – 11:30 pm" },
            ].map((h) => (
              <div key={h.day} className="border border-gold/20 p-8">
                <div className="font-sans text-gold text-xs tracking-widest uppercase mb-4">{h.day}</div>
                <div className="space-y-2">
                  <div className="flex justify-between font-body text-cream/70 text-sm">
                    <span>Lunch</span><span>{h.lunch}</span>
                  </div>
                  <div className="h-px bg-gold/15" />
                  <div className="flex justify-between font-body text-cream/70 text-sm">
                    <span>Dinner</span><span>{h.dinner}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-sans text-cream/30 text-xs mt-6">Monday — Closed</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
