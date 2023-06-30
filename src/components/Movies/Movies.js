// компонент страницы с поиском по фильмам
import React, {useLayoutEffect, useEffect} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { getMovies, debounce } from '../../utils/common';
import mainApi from '../../utils/MainApi';
import { filterMovies } from '../../hooks/useFilter';

function Movies({ isLogin, handleBurger, burger }) {
  const [loading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [serverError, setServerError] = React.useState(false);
  const [initialQuantity, setInitialQuantity] = React.useState(0);
  const [additionalQuantity, setAdditionalQuantity] = React.useState(0);
  const [numberVisibleMovies, setNumberVisibleMovies] = React.useState(0);

  function handleCardLike(movie) {
    if (movie.like) {
      mainApi.deleteMovie(movie.id) 
        .then(() => {
          movie.like = false;
          setMovies([...movies]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mainApi.addNewMovie(movie)
        .then(() => {
          movie.like = true;
          setMovies([...movies]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function updateMoviesQuantity() {
    setNumberVisibleMovies(numberVisibleMovies + additionalQuantity);
  }

  function determineParams() {
    if (window.innerWidth > 1280) {
      setInitialQuantity(16); //изначальное число фильмов
      setAdditionalQuantity(4); //число фильмов, добавляемое после нажатия "Еще"
    } else if (window.innerWidth > 990) {
      setInitialQuantity(9);
      setAdditionalQuantity(3);
    } else if (window.innerWidth > 770) {
      setInitialQuantity(8);
      setAdditionalQuantity(2);
    } else {
      setInitialQuantity(5);
      setAdditionalQuantity(2);
    }
  }

  useLayoutEffect(() => {
    const debounceDetermineParams = debounce(determineParams, 200);
    const searchMovies = JSON.parse(localStorage.getItem('searchMovies'));

    if (searchMovies) {
      mainApi.getSavedMovies()
        .then((savedMovies) => {
          const savedMoviesIds = new Set();

          savedMovies.forEach(movie => {
            savedMoviesIds.add(movie.movieId);
          });
          searchMovies.forEach(movie => {
            movie.like = savedMoviesIds.has(movie.id); 
          });
          setMovies(searchMovies);
        })
        .catch(err => {
          console.log(err);
        })
    }

    determineParams();
    window.addEventListener('resize', debounceDetermineParams);
    return () => window.removeEventListener('resize', debounceDetermineParams);
  }, []);
  

  // проставить число видимых фильмов перед первы поиском
  useEffect(() => { 
    if (numberVisibleMovies === 0) {
      setNumberVisibleMovies(initialQuantity);
    }
  }, [initialQuantity, numberVisibleMovies]);

  function onChangeFilter({searchString, shortFilms}) {
    setLoading(true);
    setNumberVisibleMovies(initialQuantity);

    Promise.all([
      getMovies(),
      mainApi.getSavedMovies()
    ])
      .then(([allMovies, savedMovies]) => {
        const filteredMovies = filterMovies(allMovies, {
          searchString: searchString,
          shortFilms: shortFilms,
        });
        const savedMoviesIds = new Set();
      
        savedMovies.forEach(movie => {
          savedMoviesIds.add(movie.movieId);
        });
        filteredMovies.forEach(movie => {
          movie.like = savedMoviesIds.has(movie.id); 
        });


        setServerError(false);
        setMovies(filteredMovies);
        localStorage.setItem('searchMovies', JSON.stringify(filteredMovies));
        localStorage.setItem('shortFilms', JSON.stringify(shortFilms));
        localStorage.setItem('searchString', searchString);
      })
      .catch(() => {
        setServerError(true);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <main className='movies'>
        <Header isLogin={ isLogin } handleBurger={handleBurger} burger={burger} />
        <SearchForm 
          onChangeFilter={onChangeFilter}
          initialShortFilms={JSON.parse(localStorage.getItem('shortFilms')) || false}
          initialSearchString={localStorage.getItem('searchString') || ''}
          searchStringRequired={true}
        />
        <Preloader loading={loading} element={
          serverError ? 
          <p className='movies__server-error'>
            Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением 
            или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз
          </p> :
          movies.length === 0 && localStorage.getItem('searchString') ? 
          <p className='movies__noResults'>Ничего не найдено</p> :
          <MoviesCardList 
            movies={movies} 
            onClickButton={updateMoviesQuantity}
            numberVisibleMovies={numberVisibleMovies}
            handleCardLike={handleCardLike}
          />
        } /> 
      </main>
      <Footer />
    </>
  )
}

export default Movies;
