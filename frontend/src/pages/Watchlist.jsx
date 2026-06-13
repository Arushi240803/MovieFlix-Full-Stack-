import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import "../styles/Home.css";
import "../styles/watchlist.css";

function Watchlist() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const API = "https://movieflix-full-stack-production.up.railway.app";

  // ================= FETCH WATCHLIST =================
  useEffect(() => {

    const fetchWatchlist = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await axios.get(
          `${API}/api/watchlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setMovies(response.data);

      } catch (error) {
        console.log("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();

  }, []);

  // ================= SEARCH FILTER =================
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <Navbar />

      <h1 className="heading">My Watchlist</h1>

      {/* ================= SEARCH BAR ================= */}
      <div className="watchlist-search">

        <input
          type="text"
          placeholder="🔍 Browse saved movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* ================= MOVIES ================= */}
      <div className="movies-container">

        {filteredMovies.length === 0 ? (
          <h2 className="empty-watchlist">
            🎬 No movies found
          </h2>
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              id={movie.movieId}
              title={movie.title}
              rating={movie.rating}
              poster={movie.poster}
              watchlistId={movie._id}
              showButton={false}
              onRemove={(id) =>
                setMovies((prev) =>
                  prev.filter((movie) => movie._id !== id)
                )
              }
            />
          ))
        )}

      </div>

    </div>
  );
}

export default Watchlist;