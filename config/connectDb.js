const mongoose = require('mongoose');

// Cache connection state across serverless instances
let isConnected = false;

const connectDb = async () => {
  // 1. Safety guard check
  if (!process.env.MONGO_URL) {
    console.error("❌ Critical Error: MONGO_URL environment variable is missing.");
    return;
  }

  // 2. Reuse connection if database instance is already hot
  if (isConnected) {
    console.log("🔄 Reusing active serverless MongoDB connection instance");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB serverless pipeline initialized successfully");
  } catch (error) {
    console.error("❌ Database connectivity exception caught at runtime:", error.message);
  }
};

module.exports = connectDb;