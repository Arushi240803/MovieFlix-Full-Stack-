const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const watchlistRoutes = require("./routes/watchlist");

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);


// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});