const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(express.json());
// Allow origins from env var (comma-separated) OR default to localhost for local dev
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : ["http://localhost:3000"];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/travelplatform")
  .then(() => {
    console.log("✅ MongoDB Connected to MongoDB Atlas");
    // Seed database with places
    const { seedDatabase } = require("./config/seedData");
    seedDatabase();
  })
  .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => res.json({ message: "Travel Platform API Running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
