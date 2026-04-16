import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { indiaStatesAndCities } from "../data/indiaData";
import toast from "react-hot-toast";

const steps = ["Account", "Location", "Done"];

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", password:"", phone:"", country:"India", state:"", city:"" });

  const states = Object.keys(indiaStatesAndCities).sort();
  const cities = form.state ? indiaStatesAndCities[form.state] || [] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") setForm(f => ({ ...f, state: value, city: "" }));
    else setForm(f => ({ ...f, [name]: value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 0) {
      if (!form.name || !form.email || !form.password) return toast.error("Fill all fields");
      if (form.password.length < 6) return toast.error("Password min 6 chars");
      setStep(1);
    } else if (step === 1) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!form.state || !form.city) return toast.error("Select state and city");
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created! Welcome aboard 🎉");
      setStep(2);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"calc(100vh - 68px)", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0f2540,#1a3c5e,#2563a8)", padding:24 }}>
      <div style={{ width:"100%", maxWidth:480, background:"#f8f6f2", borderRadius:16, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
        {/* Header */}
        <div style={{ background:"#0f2540", padding:"28px 36px" }}>
          <div style={{ display:"flex", justifyContent:"center", gap:12, marginBottom:20 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontWeight:700, background: i <= step ? "#c8963c" : "rgba(255,255,255,0.2)", color:"#fff", transition:"all 0.3s" }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{ color: i === step ? "#e8b45e" : "rgba(255,255,255,0.5)", fontSize:"0.8rem", fontWeight: i === step ? 700 : 400 }}>{s}</span>
                {i < steps.length - 1 && <div style={{ width:30, height:2, background: i < step ? "#c8963c" : "rgba(255,255,255,0.2)", borderRadius:2 }}/>}
              </div>
            ))}
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", color:"#fff", fontSize:"1.5rem", textAlign:"center" }}>
            {step === 0 ? "Create Your Account" : step === 1 ? "Your Location" : "You're All Set!"}
          </h2>
        </div>

        <div style={{ padding:"32px 36px" }}>
          {step === 2 ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:"4rem" }}>🎉</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#0f2540", marginTop:16, fontSize:"1.4rem" }}>Welcome to BharatYatra!</h3>
              <p style={{ color:"#888", marginTop:8 }}>Redirecting to your dashboard...</p>
            </div>
          ) : (
            <form onSubmit={nextStep}>
              {step === 0 && (
                <>
                  <div className="input-group">
                    <label>Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required/>
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required/>
                  </div>
                  <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required/>
                  </div>
                  <div className="input-group">
                    <label>Phone (Optional)</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX"/>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="input-group">
                    <label>Country</label>
                    <input value="India 🇮🇳" disabled style={{ background:"#f0ede8", color:"#888" }}/>
                  </div>
                  <div className="input-group">
                    <label>State</label>
                    <select name="state" value={form.state} onChange={handleChange} required>
                      <option value="">— Select State —</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>City</label>
                    <select name="city" value={form.city} onChange={handleChange} required disabled={!form.state}>
                      <option value="">— Select City —</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {form.state && form.city && (
                    <div style={{ padding:"12px 16px", background:"rgba(26,60,94,0.06)", borderRadius:8, marginBottom:16, fontSize:"0.85rem", color:"#4a4a4a" }}>
                      📍 <strong>{form.city}</strong>, {form.state}, India
                    </div>
                  )}
                </>
              )}

              <div style={{ display:"flex", gap:12, marginTop:8 }}>
                {step > 0 && (
                  <button type="button" onClick={() => setStep(s => s - 1)} className="btn-outline" style={{ flex:1 }}>
                    ← Back
                  </button>
                )}
                <button type="submit" className="btn-primary" disabled={loading} style={{ flex:2, justifyContent:"center", padding:14 }}>
                  {loading ? "Creating..." : step === 0 ? "Next →" : "Create Account"}
                </button>
              </div>
            </form>
          )}

          {step === 0 && (
            <div style={{ textAlign:"center", marginTop:20, fontSize:"0.9rem", color:"#888" }}>
              Already have an account? <Link to="/login" style={{ color:"#1a3c5e", fontWeight:700 }}>Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
