import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import { fetchMovieDetails } from "../services/tmdbApi";

import "../styles/MovieDetails.css";

function MovieDetails() {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {

    const getMovie = async () => {

      const data = await fetchMovieDetails(id);

      setMovie(data);
    };

    getMovie();

  }, [id]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div>

      <Navbar />

      <div className="movie-details">

        <img
          src={imageUrl}
          alt={movie.title}
        />

        <div className="movie-info">

          <h1>{movie.title}</h1>

          <p className="rating">
            ⭐ {movie.vote_average}
          </p>

          <p>
            <strong>Release Date:</strong>
            {" "}
            {movie.release_date}
          </p>

          <p>
            <strong>Runtime:</strong>
            {" "}
            {movie.runtime} minutes
          </p>

          <p className="overview">
            {movie.overview}
          </p>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;