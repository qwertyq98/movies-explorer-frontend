import { SHORT_FILM_DURATION } from "../utils/constants";
function filterMovies(movies, {searchString, shortFilms, likedFilms}) {
  const savedMoviesIds = new Set();

  likedFilms && likedFilms.forEach(movie => {
    savedMoviesIds.add(movie.movieId);
  });

  return movies.filter(movie => {
    return (
      (!likedFilms || savedMoviesIds.has(movie.id)) &&
      (!shortFilms || movie.duration < SHORT_FILM_DURATION) &&
      (
        movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || 
        movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
      )
    )
  });
}

export {
  filterMovies
}
