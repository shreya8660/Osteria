import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
  "https://osteria-1.onrender.com/api/auth/login",
  form
);

      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-cream-light mb-2">Welcome Back</h1>
          <p className="font-body text-cream/50">Sign in to manage your reservations</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-espresso-light border border-gold/15 p-8 space-y-5">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">Email</label>
            <input
              type="email" required value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com" className="input-dark"
            />
          </div>
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">Password</label>
            <input
              type="password" required value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••" className="input-dark"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full flex justify-center items-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-espresso/40 border-t-espresso rounded-full animate-spin" /> Signing in...</> : "Sign In"}
          </button>
        </form>
        <p className="text-center font-sans text-cream/40 text-xs mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-gold hover:text-gold-light">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
