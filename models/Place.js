const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now }
});

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["tourist", "hotel", "hostel", "hospital", "medical_shop", "restaurant", "shopping", "temple", "park", "museum"],
    required: true
  },
  description: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
  address: { type: String },
  phone: { type: String },
  timings: { type: String },
  price: { type: Number },
  priceRange: { type: String }, // "₹500-₹2000"
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
  photos: [{ type: String }], // URLs to photos
  amenities: [{ type: String }],
  latitude: { type: Number },
  longitude: { type: Number },
  isPreBookable: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }]
});

// Recalculate rating on save
placeSchema.pre("save", function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    this.rating = (total / this.reviews.length).toFixed(1);
    this.totalReviews = this.reviews.length;
  }
  next();
});

module.exports = mongoose.model("Place", placeSchema);
