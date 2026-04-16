import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaMap, FaBookmark, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <div className="logo-icon">🧭</div>
        <h1>Bharat<span>Yatra</span></h1>
      </div>

      {user ? (
        <ul className="navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/map" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FaMap size={13} /> Map
            </Link>
          </li>
          <li>
            <Link to="/bookings" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FaBookmark size={13} /> Bookings
            </Link>
          </li>
          <li style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "#c8963c", color: "#fff", fontWeight: 700, borderRadius: 8, padding: "8px 16px", border: "none", cursor: "pointer", fontFamily: "'Lato', sans-serif" }}
            >
              <FaUser size={13} /> {user.name?.split(" ")[0]}
            </button>
            {showMenu && (
              <div style={{ position: "absolute", right: 0, top: "110%", background: "#fff", borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", minWidth: 180, zIndex: 999, border: "1px solid #e2ddd6" }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid #e2ddd6" }}>
                  <div style={{ fontWeight: 700, color: "#1a3c5e", fontSize: "0.9rem" }}>{user.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#888" }}>{user.city}, {user.state}</div>
                </div>
                <button onClick={handleLogout} style={{ width: "100%", padding: "12px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "#c62828", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontWeight: 700 }}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li><Link to="/login">Login</Link></li>
          <li>
            <Link to="/register" style={{ background: "#c8963c", color: "#fff", padding: "8px 18px", borderRadius: 8, fontWeight: 700 }}>
              Register
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
