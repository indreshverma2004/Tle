require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contest = require("./routes/contest");
const auth = require("./routes/auth.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://indreshverma:indresh@cluster0.z4mrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
}

startServer();

// Routes
app.use("/api/contest", contest);
app.use("/api/auth", auth);
