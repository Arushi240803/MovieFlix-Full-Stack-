import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import "../styles/MovieCard.css";

function MovieCard({
  id,
  title,
  rating,
  poster,
  showButton = true,
  watchlistId,
  onRemove
}) {

  const navigate = useNavigate();

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${poster}`;

  // ================= ADD TO WATCHLIST =================
  const addToWatchlist = async (e) => {

    e.stopPropagation();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/watchlist/add",
        {
          movieId: id,
          title,
          poster,
          rating
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Movie added to watchlist!");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error adding movie"
      );
    }
  };


  // ================= REMOVE MOVIE =================
  const removeMovie = async (e) => {

    e.stopPropagation();

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/watchlist/${watchlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Movie removed!");

      if (onRemove) {
        onRemove(watchlistId);
      }

    } catch (error) {

      alert("Error removing movie");
    }
  };


  return (

    <motion.div

      className="movie-card"

      onClick={() => navigate(`/movie/${id}`)}

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.3 }}

      whileHover={{
        scale: 1.05,
        boxShadow:
          "0px 10px 25px rgba(0,0,0,0.4)"
      }}

      whileTap={{ scale: 0.97 }}

    >

      <img src={imageUrl} alt={title} />

      <h2>{title}</h2>

      <p>⭐ {rating}</p>


      {/* ================= HOME PAGE BUTTON ================= */}
      {
        showButton ? (

          <button
            className="save-btn"
            onClick={addToWatchlist}
          >
            Add to Watchlist
          </button>

        ) : (

          /* ================= WATCHLIST REMOVE ================= */
          <button
            className="remove-btn"
            onClick={removeMovie}
          >
            🗑 Remove
          </button>

        )
      }

    </motion.div>
  );
}

export default MovieCard;