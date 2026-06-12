import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import MovieSkeleton from "../components/MovieSkeleton";

import {
  fetchTrendingMovies,
  fetchMoviesByGenre
} from "../services/tmdbApi";

import "../styles/Home.css";

function Home() {

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedMood, setSelectedMood] =
    useState("Trending");



  // ================= MOOD GENRE MAP =================
  const moodGenres = {

    Action: 28,

    Thriller: 53,

    Romantic: 10749,

    Emotional: 18,

    SciFi: 878

  };



  // ================= FETCH TRENDING =================
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



  // ================= UPDATE MOOD =================
  const updateMood = async (mood) => {

    try {

      setSelectedMood(mood);

      const token = localStorage.getItem("token");

      // ================= UPDATE USER MOOD =================
      await fetch(
        "http://localhost:5000/api/auth/mood",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            moodPreference: mood
          })
        }
      );



      // ================= FETCH MOVIES BY GENRE =================
      setLoading(true);

      const genreId = moodGenres[mood];

      const filteredMovies =
        await fetchMoviesByGenre(genreId);

      setMovies(filteredMovies);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



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



      {/* ================= MOOD SECTION ================= */}
      <div className="mood-section">

        <h2 className="section-title">
          What Are You In The Mood For Today?
        </h2>

        <div className="mood-buttons">

          <button
            className={
              selectedMood === "Action"
              ? "active-mood"
              : ""
            }

            onClick={() => updateMood("Action")}
          >
            🔥 Action
          </button>



          <button
            className={
              selectedMood === "Thriller"
              ? "active-mood"
              : ""
            }

            onClick={() => updateMood("Thriller")}
          >
            🕵 Thriller
          </button>



          <button
            className={
              selectedMood === "Romantic"
              ? "active-mood"
              : ""
            }

            onClick={() => updateMood("Romantic")}
          >
            💖 Romantic
          </button>



          <button
            className={
              selectedMood === "Emotional"
              ? "active-mood"
              : ""
            }

            onClick={() => updateMood("Emotional")}
          >
            😢 Emotional
          </button>



          <button
            className={
              selectedMood === "SciFi"
              ? "active-mood"
              : ""
            }

            onClick={() => updateMood("SciFi")}
          >
            🚀 Sci-Fi
          </button>

        </div>

      </div>



      {/* ================= MOVIE SECTION ================= */}
      <div className="trending-section">

        <h2 className="section-title">

          {
            selectedMood === "Trending"

            ? "Trending Now"

            : `${selectedMood} Recommendations`
          }

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