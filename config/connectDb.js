const mongoose = require('mongoose');

const connectDb = async () => {
  // 1. Guard check to stop undefined URI strings from breaking the runtime
  if (!process.env.MONGO_URL) {
    console.error("❌ Critical: MONGO_URL environment variable is missing entirely.");
    return;
  }

  // 2. Prevent creating duplicate connection streams if the instance stays warm
  if (mongoose.connection.readyState >= 1) {
    console.log("🔄 Reusing existing MongoDB connection profile");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Exception Caught:", error.message);
  }
};

module.exports = connectDb;
