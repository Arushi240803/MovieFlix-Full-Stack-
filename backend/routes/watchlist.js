const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Watchlist = require("../models/Watchlist");


// ================= ADD MOVIE =================
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { movieId, title, poster, rating } = req.body;

    console.log("USER:", req.user); // DEBUG

    const newMovie = new Watchlist({
      userId: req.user.id,   // ✅ FIXED
      movieId,
      title,
      poster,
      rating
    });

    await newMovie.save();

    res.status(201).json({ message: "Movie added to watchlist" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET WATCHLIST =================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const movies = await Watchlist.find({
      userId: req.user.id   // ✅ FIXED
    });

    res.json(movies);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= REMOVE MOVIE =================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);

    res.json({ message: "Movie removed" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;