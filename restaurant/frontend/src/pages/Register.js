import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
  "https://osteria-1.onrender.com/api/auth/register",
  {
    name: form.name,
    email: form.email,
    phone: form.phone,
    password: form.password,
  }
);
      login(data);
      toast.success(`Welcome, ${data.name}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-espresso-dark flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-cream-light mb-2">Create Account</h1>
          <p className="font-body text-cream/50">Join us for exclusive dining experiences</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-espresso-light border border-gold/15 p-8 space-y-5">
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
            { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            { name: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
            { name: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
            { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Repeat password" },
          ].map(f => (
            <div key={f.name}>
              <label className="block font-sans text-xs tracking-widest uppercase text-cream/50 mb-2">{f.label}</label>
              <input
                type={f.type} name={f.name} required value={form[f.name]}
                onChange={handleChange} placeholder={f.placeholder} className="input-dark"
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-gold w-full flex justify-center items-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-espresso/40 border-t-espresso rounded-full animate-spin" /> Creating...</> : "Create Account"}
          </button>
        </form>
        <p className="text-center font-sans text-cream/40 text-xs mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-gold hover:text-gold-light">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
