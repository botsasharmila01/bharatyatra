const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const { seedDatabase } = require("./seedData");

const runSeed = async () => {
  try {
    // Direct connection (no db.js needed)
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await seedDatabase();

    await mongoose.connection.close();

    console.log("✅ Seeding completed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

runSeed();