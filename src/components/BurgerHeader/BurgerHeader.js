// компонент бургерного меню
import './BurgerHeader.css';
import { Link } from 'react-router-dom';
import Account from '../Account/Account';

const BurgerHeader = ({ isBurgerMenu, handleToggleBurger }) => {
  return ( 
    <div className={`${ isBurgerMenu ? 'burger_active': 'burger' }`}>
      <div className='burger__wrapper'>
        <button className='burger__close-button' onClick={handleToggleBurger}/>
        <nav className='burger__navigation'>
          <Link to="/" className='burger__link'>Главная</Link>
          <Link to="/movies" className='burger__link burger__link_line'>Фильмы</Link>
          <Link to="/saved-movies" className='burger__link'>Сохранённые фильмы</Link>
        </nav>
        <Account isBurgerMenu = {isBurgerMenu} />
      </div>
    </div>
  )
}

export default BurgerHeader;