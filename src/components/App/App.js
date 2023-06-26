// корневой компонент приложения
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies  from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import './App.css';
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import moviesConst from '../../temporary-data/movies-constants';
import user from '../../temporary-data/user';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [movies, setMovies] = React.useState(moviesConst);
  const showMoreRef = React.useRef(null);

  function handleScroll(ref) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleMovieLike() {
    setIsLiked(!isLiked);
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header isLogin={false} />
            <Main handleScroll={handleScroll} showMoreRef={showMoreRef} />
            <Footer />
          </>
        } />
        <Route path='/movies' element={<Movies 
          isLogin={true} 
          movies={movies} 
          isLiked={isLiked} 
          onMovieLike={handleMovieLike}
        />} />
        <Route path='/saved-movies' element={<SavedMovies 
          isLogin={true} 
          movies={movies} 
        />} />
        <Route path='/profile' element={
          <>
            <Header isLogin={true}/>
            <Profile user={user} />
          </>
        } />
        <Route path='/signin' element={
          <>
            <Login user={user} />
          </>
        } />
        <Route path='/signup' element={
          <>
            <Register user={user} />
          </>
        } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;