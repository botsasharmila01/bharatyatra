const express = require("express");
const router = express.Router();
const Place = require("../models/Place");
const { protect } = require("../middleware/auth");

// Get all places with filters
router.get("/", async (req, res) => {
  try {
    const { city, state, category, search, featured } = req.query;
    let filter = {};
    if (city) filter.city = city;
    if (state) filter.state = state;
    if (category) filter.category = category;
    if (featured) filter.featured = true;
    if (search) filter.name = { $regex: search, $options: "i" };

    const places = await Place.find(filter).sort({ rating: -1, featured: -1 });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single place
router.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get nearby places (by city)
router.get("/nearby/:city", async (req, res) => {
  try {
    const places = await Place.find({ city: req.params.city }).sort({ rating: -1 }).limit(20);
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add review
router.post("/:id/review", protect, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });

    const review = { user: req.user.name, comment, rating };
    place.reviews.push(review);
    await place.save();
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get categories in a city
router.get("/categories/:city", async (req, res) => {
  try {
    const categories = await Place.distinct("category", { city: req.params.city });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
