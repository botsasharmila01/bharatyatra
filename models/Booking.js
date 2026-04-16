const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
  placeName: { type: String },
  category: { type: String },
  checkIn: { type: Date },
  checkOut: { type: Date },
  guests: { type: Number, default: 1 },
  totalAmount: { type: Number },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  specialRequests: { type: String },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
