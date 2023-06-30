// компонент страницы с поиском по фильмам
import React, {useLayoutEffect, useEffect} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { getMovies } from '../../utils/common';
import mainApi from '../../utils/MainApi';

function Movies({ isLogin, handleBurger, burger, handleCardLike }) {
  const [loading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [serverError, setServerError] = React.useState(false);
  const [initialQuantity, setInitialQuantity] = React.useState(0);
  const [additionalQuantity, setAdditionalQuantity] = React.useState(0);
  const [numberVisibleMovies, setNumberVisibleMovies] = React.useState(0);

  function handleCardLike(movie) {
    if (movie.like) {
      mainApi.deleteMovie(movie._id) 
        .then()
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
    window.addEventListener('resize', determineParams);
    determineParams();
    setMovies(JSON.parse(localStorage.getItem('searchMovies')) || []);
   
    return () => window.removeEventListener('resize', determineParams);
  }, []);

  useEffect(() => {
    if (numberVisibleMovies === 0) {
      setNumberVisibleMovies(initialQuantity);
    }
  }, [initialQuantity, numberVisibleMovies]);

  function onChangeFilter({searchString, shortFilms}) {
    setLoading(true);
    setNumberVisibleMovies(initialQuantity);
    getMovies()
      .then(movies => {
        const resaltMovies = movies.filter(movie => {
          const isFiltred = !shortFilms || movie.duration < 40;
          return isFiltred && (movie.nameRU.toLowerCase().includes(searchString) || movie.nameEN.toLowerCase().includes(searchString));
        })
        setServerError(false);
        return resaltMovies;
      })
      .then(movies => {
        setMovies(movies);
        localStorage.setItem('searchMovies', JSON.stringify(movies));
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
        />
        <Preloader loading={loading} element={
          serverError ? 
          <p className='movies__server-error'>
            Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением 
            или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз
          </p> :
          movies.length === 0 ? 
          <p className='movies__noResalts'>Ничего не найдено</p> :
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
