// корневой компонент приложения
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'; 
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const showMoreRef = React.useRef(null);
  const [burger, setBurger] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  //const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    text: '',
    email: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
    setServerError('');
  }, []);

  React.useEffect(() => {
    if (!isLogin) {
      return;
    }
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogin]);

  const tokenCheck = () => {
    setLoading(true);
    mainApi.checkToken().then((data) => {
      setIsLogin(true);
        setCurrentUser({
          text: data.name,
          email: data.email,
        });
        if (location.pathname === "/movies") {
          navigate("/movies", {replace: true});
        } else if (location.pathname === "/profile") {
          navigate("/profile", {replace: true});
        }
    })
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
  }

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

  function handleSubmitRegister({ text, email, password }) {
    if (text && email && password) {
      
      mainApi.register(text, email, password)
        .then(() => {
          setCurrentUser({
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
        setIsLogin(true);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      })
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    mainApi.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data.data);
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 2000)
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function signOut() {
    mainApi.logout()
      .then(() => {
        setLoading(false)
        navigate('/signin');
        setBurger(false);
        setIsLogin(false);
      });
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <>
              <Header isLogin={isLogin} handleBurger = {handleBurger} burger={burger} />
              <Main handleScroll={handleScroll} showMoreRef={showMoreRef} />
              <Footer />
            </>
          } />
          <Route path={isLogin ? '' : '/signin'} element={
            <Login 
              onSubmit={handleSubmitLogin}
              serverError={serverError}
              isLogin={isLogin}
            />
          } />
          <Route path={isLogin ? '' : '/signup'} element={
            <Register 
              onSubmit={handleSubmitRegister} 
              serverError={serverError}
              isLogin={isLogin}
            />
          } />
          <Route path='*' element={<NotFound />} />

          <Route path='/movies' element={
            <>
              <ProtectedRouteElement element={Movies} 
                isLogin={isLogin} 
                handleBurger={handleBurger} 
                burger={burger}
                currentUser={currentUser}
              />
            </>
          } />
          <Route path='/saved-movies' element={
            <>
              <ProtectedRouteElement element={SavedMovies} 
                isLogin={isLogin} 
                handleBurger={handleBurger} 
                burger={burger}
              />
            </>
          } />
          <Route path='/profile' element={
            <>
              <ProtectedRouteElement element={Header} 
                isLogin={isLogin} 
                handleBurger={handleBurger} 
                burger={burger}
              />
              <ProtectedRouteElement element={Profile} 
                currentUser={currentUser}
                onSubmit={handleUpdateUser}
                serverError={serverError}
                signOut={signOut}
                isLogin={isLogin}
                successMessage={successMessage}
              />
            </>
          } />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
    
  )
}

export default App;