function filterMovies(movies, {searchString, shortFilms, likedFilms}) {
  const savedMoviesIds = new Set();

  likedFilms && likedFilms.forEach(movie => {
    savedMoviesIds.add(movie.movieId);
  });

  return movies.filter(movie => {
    return (
      (!likedFilms || savedMoviesIds.has(movie.id)) &&
      (!shortFilms || movie.duration < 40) &&
      (movie.nameRU.toLowerCase().includes(searchString) || movie.nameEN.toLowerCase().includes(searchString))
    )
  });
}

export {
  filterMovies
}
