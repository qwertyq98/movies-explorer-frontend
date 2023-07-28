import { SHORT_FILM_DURATION } from "../utils/constants";
function filterMovies(movies, {searchString, shortFilms, likedFilmIds}) {
  return movies.filter(movie => {
    return (
      (!likedFilmIds || likedFilmIds.has(movie.id)) &&
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
