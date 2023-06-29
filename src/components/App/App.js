// корневой компонент приложения
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'; 
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies  from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import './App.css';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';

function App() {
  const [isLogin, setIsLogin] = React.useState(true); //временно true
  const [isLiked, setIsLiked] = React.useState(false);
  const showMoreRef = React.useRef(null);
  const [burger, setBurger] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    text: '',
    email: ''
  });
  const [userData, setUserData] = React.useState({
    text: '',
    email: ''
  });
  const navigate = useNavigate();

  useLayoutEffect(() => {
    function updateWidth() {
      if (window.innerWidth > 770) {
        setBurger(false);
      }
    }

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function handleBurger() {
    setBurger(!burger);
  }

  function handleScroll(ref) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleMovieLike() {
    setIsLiked(!isLiked);
  }

  function handleSubmitRegister({ text, email, password }) {
    if (text && email && password) {
      
      mainApi.register(text, email, password)
        .then(() => {
          setUserData({
            text,
            email,
          });
          onRegistered(true);
        }) 
        .catch((err) => {
          onRegistered(false);
          setServerError(err);
        });
    }
  } 

  function onRegistered(isSuccess) {
    if (isSuccess) {
      navigate('/movies', {replace: true});
    }
  }

  function handleSubmitLogin({ email, password }) {
    if (!email || !password){
      return;
    }
    mainApi.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <>
              <Header isLogin={false} handleBurger = {handleBurger} burger={burger} />
              <Main handleScroll={handleScroll} showMoreRef={showMoreRef} />
              <Footer />
            </>
          } />
          <Route path='/movies' element={
            <Movies 
              isLogin={true} 
              isLiked={isLiked} 
              onMovieLike={handleMovieLike}
              handleBurger={handleBurger} 
              burger={burger}
            />
          } />
          <Route path='/saved-movies' element={<SavedMovies 
            isLogin={true} 
            handleBurger={handleBurger} 
            burger={burger}
          />} />
          <Route path='/profile' element={
            <>
              <Header isLogin={true} handleBurger = {handleBurger} burger={burger} />
              <Profile 
                userData={userData}
              />
            </>
          } />
          <Route path='/signin' element={
            <Login 
              onSubmit={handleSubmitLogin}
              serverError={serverError}
            />
          } />
          <Route path='/signup' element={
            <Register 
              onSubmit={handleSubmitRegister} 
              serverError={serverError}
            />
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
    
  )
}

export default App;