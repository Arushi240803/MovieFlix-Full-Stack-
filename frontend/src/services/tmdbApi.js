import axios from "axios";

const API_KEY = "47e0b7d6569e668c5102e3224add295f";

const BASE_URL = "https://api.themoviedb.org/3";



// ================= FETCH TRENDING MOVIES =================
export const fetchTrendingMovies = async () => {

  const response = await axios.get(

    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`

  );

  return response.data.results;

};



// ================= SEARCH MOVIES =================
export const searchMovies = async (query) => {

  const response = await axios.get(

    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`

  );

  return response.data.results;

};



// ================= FETCH SINGLE MOVIE DETAILS =================
export const fetchMovieDetails = async (id) => {

  const response = await axios.get(

    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`

  );

  return response.data;

};



// ================= FETCH MOVIES BY GENRE =================
export const fetchMoviesByGenre = async (genreId) => {

  const response = await axios.get(

`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`

  );

  return response.data.results;

};