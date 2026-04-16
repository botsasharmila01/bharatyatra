import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import BookingsPage from "./pages/BookingsPage";
import MapPage from "./pages/MapPage";
import "./index.css";
import "leaflet/dist/leaflet.css";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-container"><div className="spinner"></div><p>Loading...</p></div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily: "'Lato', sans-serif", borderRadius: '8px' },
          success: { iconTheme: { primary: '#1a3c5e', secondary: '#fff' } }
        }} />
        <Navbar />
        <div className="page-container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/city/:cityName" element={<PrivateRoute><CityPage /></PrivateRoute>} />
            <Route path="/place/:id" element={<PrivateRoute><PlaceDetailPage /></PrivateRoute>} />
            <Route path="/bookings" element={<PrivateRoute><BookingsPage /></PrivateRoute>} />
            <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
