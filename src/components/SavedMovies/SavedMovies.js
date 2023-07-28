// компонент страницы с поиском по фильмам
import React, { useLayoutEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { getMovies } from '../../utils/common';
import mainApi from '../../utils/MainApi';
import { filterMovies } from '../../hooks/useFilter';

function SavedMovies({ isLogin, handleBurger, burger }) {
  const [loading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [serverError, setServerError] = React.useState(false);
  const [savedMovieIds, setSavedMovieIds] = React.useState(new Set());
  const [allMovies, setAlldMovies] = React.useState([]);

  useLayoutEffect(() => {
    setLoading(true);
    Promise.all([getMovies(), mainApi.getSavedMovies()])
      .then(([movies, savedMovies]) => {
        const savedMoviesIds = new Set();

        savedMovies.forEach(movie => {
          savedMoviesIds.add(movie.movieId);
        });

        setSavedMovieIds(savedMoviesIds);
        setAlldMovies(movies);

        const filteredMovies = filterMovies(movies, {
          searchString: '',
          shortFilms: false,
          likedFilmIds: savedMoviesIds,
        });

        setMovies(filteredMovies);
        setServerError(false);
      })
      .catch(() => {
        setServerError(true);
      })
      .finally(() => setLoading(false));
    
  }, []);

  function handleCardLike(movie) {
    mainApi.deleteMovie(movie.id) 
      .then(() => {
        const newMovies = movies.filter(currentMovie => currentMovie !== movie);
        setMovies(newMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  function onChangeFilter({searchString, shortFilms}) {
    const filteredMovies = filterMovies(allMovies, {
      searchString: searchString,
      shortFilms: shortFilms,
      likedFilmIds: savedMovieIds,
    });

    setMovies(filteredMovies);
  }

  return (
    <>
      <main className='movies'>
        <Header isLogin={ isLogin } handleBurger={handleBurger} burger={burger} />
        <SearchForm 
          onChangeFilter={onChangeFilter}
          searchStringRequired={false}
        />
        <Preloader loading={loading} element={
          serverError ? 
          <p className='movies__server-error'>
            Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением 
            или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз
          </p> :
          movies.length === 0 ? 
          <p className='movies__noResults'>Ничего не найдено</p> :
          <MoviesCardList 
            movies={movies} 
            numberVisibleMovies={movies.length}
            handleCardLike={handleCardLike}
          />
        } /> 
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;
