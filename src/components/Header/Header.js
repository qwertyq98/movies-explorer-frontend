// компонент, который отрисовывает шапку сайта на страницу
import './Header.css';
import { Route, Routes, Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import BurgerHeader from '../BurgerHeader/BurgerHeader';
import React from 'react'; 

function Header({ isLogin, handleBurger, burger }) {

  return (
    <>
      {isLogin ? 
        <header className ='header'>
          <div className='header__wrapper'>
            <Logo />
            <Navigation />
            {!burger ? <Account burger={burger} handleBurger={handleBurger} /> : <></>}
            <button className='header__burger' onClick={handleBurger} />
            <BurgerHeader burger={burger} handleBurger={handleBurger} />
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