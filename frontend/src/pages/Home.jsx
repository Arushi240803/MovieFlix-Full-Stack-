import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import MovieSkeleton from "../components/MovieSkeleton";

import { fetchTrendingMovies } from "../services/tmdbApi";

import "../styles/Home.css";

function Home() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getMovies = async () => {

      try {

        setLoading(true);

        const data = await fetchTrendingMovies();

        setMovies(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    getMovies();

  }, []);

  // ================= HERO MOVIE =================
  const heroMovie = movies[0];

  return (
    <div className="home">

      <Navbar />

      {/* ================= HERO SECTION ================= */}
      {
        heroMovie && (
          <div
            className="hero-section"
            style={{
              backgroundImage:
                `linear-gradient(
                  to right,
                  rgba(0,0,0,0.9),
                  rgba(0,0,0,0.4)
                ),
                url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`
            }}
          >

            <div className="hero-content">

              <h1>
                {heroMovie.title}
              </h1>

              <p>
                {heroMovie.overview}
              </p>

              <div className="hero-buttons">

                <button className="play-btn">
                  ▶ Play
                </button>

                <button className="info-btn">
                  More Info
                </button>

              </div>

            </div>

          </div>
        )
      }

      {/* ================= TRENDING ================= */}
      <div className="trending-section">

        <h2 className="section-title">
          Trending Now
        </h2>

        <div className="movies-container">

          {
            loading ? (
              Array(8).fill().map((_, index) => (
                <MovieSkeleton key={index} />
              ))
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

    </div>
  );
}

export default Home;