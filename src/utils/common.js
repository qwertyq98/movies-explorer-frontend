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

function debounce(func, delay) {
  let interval;

  return function() {
    if (interval) {
      clearInterval(interval);
    }

    interval = setTimeout(() => func.apply(this, arguments), delay);
  }
}


export {
  getMovies,
  debounce,
}
