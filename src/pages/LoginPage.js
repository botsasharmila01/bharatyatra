import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"calc(100vh - 68px)", display:"flex", background:"linear-gradient(135deg,#0f2540 0%,#1a3c5e 50%,#2563a8 100%)" }}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 40px", color:"#fff" }}>
        <div style={{ fontSize:"4rem", marginBottom:20 }}>🧭</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.6rem", color:"#fff", marginBottom:16, lineHeight:1.2 }}>
          Explore India's<br/>Hidden Gems
        </h1>
        <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"1rem", maxWidth:360, textAlign:"center", lineHeight:1.8 }}>
          From the majestic Himalayas to the serene backwaters of Kerala — your next adventure begins here.
        </p>
        <div style={{ display:"flex", gap:40, marginTop:48 }}>
          {[["🏛️","Heritage Sites"],["🏨","Top Hotels"],["🗺️","Live Maps"]].map(([icon,label]) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"1.8rem" }}>{icon}</div>
              <div style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.7)", marginTop:6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:460, display:"flex", alignItems:"center", justifyContent:"center", background:"#f8f6f2", padding:"40px" }}>
        <div style={{ width:"100%", maxWidth:380 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.8rem", color:"#0f2540", marginBottom:6 }}>Welcome Back</h2>
          <p style={{ color:"#888", fontSize:"0.9rem", marginBottom:32 }}>Sign in to continue your journey</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required/>
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required/>
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width:"100%", justifyContent:"center", padding:"14px", fontSize:"1rem", marginTop:8 }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
          <div style={{ textAlign:"center", marginTop:28, color:"#888", fontSize:"0.9rem" }}>
            Don't have an account? <Link to="/register" style={{ color:"#1a3c5e", fontWeight:700 }}>Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
