const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
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
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;