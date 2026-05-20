import { useState } from "react";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import { searchMovies } from "../services/tmdbApi";

import "../styles/Home.css";
import "../styles/Search.css";

function Search() {

  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {

    if (!query) return;

    try {

      const data = await searchMovies(query);

      setMovies(data);

    } catch (error) {
      console.log("Search error:", error);
    }
  };

  return (

    <div className="search-page">

      <Navbar />

      <h1 className="heading">
        Search Movies
      </h1>


      {/* ================= SEARCH BAR ================= */}

      <div className="search-container">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

      </div>


      {/* ================= MOVIES ================= */}

      <div className="movies-container">

        {
          movies.length === 0 ? (

            <h3 className="empty-text">
             
            </h3>

          ) : (

            movies.map((movie) => (

              <MovieCard
                key={movie.id}

                id={movie.id}

                title={movie.title}

                rating={movie.vote_average}

                poster={movie.poster_path}
              />

            ))
          )
        }

      </div>

    </div>
  );
}

export default Search;