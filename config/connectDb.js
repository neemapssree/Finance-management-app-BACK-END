const mongoose = require('mongoose');

// Cache the active connection status across hot serverless instances
let isConnected = false;

const connectDb = async () => {
  if (!process.env.MONGO_URL) {
    console.error("❌ Critical: MONGO_URL variable is missing from environmental settings.");
    return;
  }

  if (isConnected) {
    console.log("🔄 Reusing existing hot database connection proxy");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB serverless pipeline initialized successfully");
  } catch (error) {
    console.error("❌ Database connection error caught at runtime:", error.message);
  }
};

module.exports = connectDb;