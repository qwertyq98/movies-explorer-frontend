// корневой компонент приложения
import React, { useEffect, useLayoutEffect } from 'react'; 
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
import UnProtectedRouteElement from '../UnProtectedRoute/UnProtectedRoute';
import { debounce } from '../../utils/common';

function App() {
  const [isLogin, setIsLogin] = React.useState(undefined);
  const showMoreRef = React.useRef(null);
  const [burger, setBurger] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
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
  }, []);

  useEffect(() => {
    setServerError('');
  }, [location]);

  React.useEffect(() => {
    if (!isLogin) {
      return;
    }
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogin]);

  const tokenCheck = () => {
    mainApi.checkToken().then((data) => {
      setIsLogin(true);
        setCurrentUser({
          text: data.name,
          email: data.email,
        });
    })
    .catch((err) => {
      setIsLogin(false);
      console.log(err);
    })
  }

  useLayoutEffect(() => {
    const updateWidth = debounce(() => {
      if (window.innerWidth > 770) {
        setBurger(false);
      }
    }, 200);

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
      setLoading(true);
      mainApi.register(text, email, password)
        .then(() => {
          setIsLogin(true);
          setCurrentUser({
            text,
            email,
          });
          onRegistered(true);
        }) 
        .catch((err) => {
          onRegistered(false);
          setServerError(err);
        })
        .finally(() => setLoading(false));
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
    setLoading(true);
    mainApi.authorize(email, password)
      .then(() => {
        setIsLogin(true);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    mainApi.setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
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
        navigate('/');
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
          <Route path='/signin' element={
            <>
              <UnProtectedRouteElement element={Login}
                onSubmit={handleSubmitLogin}
                serverError={serverError}
                isLogin={isLogin}
                loading={loading}
              />
            </>
          } />
          <Route path='/signup' element={
            <>
              <UnProtectedRouteElement element={Register} 
                onSubmit={handleSubmitRegister} 
                serverError={serverError}
                isLogin={isLogin}
                loading={loading}
              />
            </>
          } />
          <Route path='*' element={<NotFound />} />
          <Route path='/movies' element={
            <>
              <ProtectedRouteElement element={Movies} 
                isLogin={isLogin} 
                handleBurger={handleBurger} 
                burger={burger}
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
                onSubmit={handleUpdateUser}
                serverError={serverError}
                signOut={signOut}
                isLogin={isLogin}
                successMessage={successMessage}
                loading={loading}
              />
            </>
          } />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
    
  )
}

export default App;