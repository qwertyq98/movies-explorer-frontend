import moviesApi from './MoviesApi';

function getMovies() {
  if (localStorage.getItem('movies') !== null) {
    return Promise.resolve(JSON.parse(localStorage.getItem('movies')));
  }
  
  return moviesApi.getInitialMovies()
    .then((movies) => {
      localStorage.setItem('movies', JSON.stringify(movies));
      return movies;
    })
}

export {
  getMovies,
}
