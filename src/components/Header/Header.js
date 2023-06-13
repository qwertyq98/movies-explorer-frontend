// компонент, который отрисовывает шапку сайта на страницу
import './Header.css';
import { Route, Routes, Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import BurgerHeader from '../BurgerHeader/BurgerHeader';
import React from 'react'; 

function Header({ isLogin }) {
  const [isBurgerMenu, setIsBurgerMenu] = React.useState(false);

  const handleToggleBurger = () => {
    setIsBurgerMenu(!isBurgerMenu);
  };

  return (
    <>
      {isLogin ? 
        <header className ='header'>
          <div className='header__wrapper'>
            <Logo />
            <Navigation />
            {isBurgerMenu ? null : <Account isBurgerMenu={isBurgerMenu} />}
            <button className='header__burger'onClick={handleToggleBurger} />
            <BurgerHeader isBurgerMenu={isBurgerMenu} handleToggleBurger={handleToggleBurger} />
          </div>
        </header> : 

        <header className ='header header_gray'>
          <div className='header__wrapper'>
            <Logo />
            <div className='header__links'>
              <Link to='/signup' className='header__button header__button_signup'>
                Регистрация
              </Link>
              <Link to='/signin' className='header__button header__button_signin'>
                Войти
              </Link>
            </div>
          </div>
        </header>
      }
    </>
  ) 
}

export default Header;