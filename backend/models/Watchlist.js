const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true   // ✅ helps query performance
  },
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  poster: {
    type: String
  },
  rating: {
    type: Number
  }
}, { timestamps: true }); // ✅ useful for debugging

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;