// компонент бургерного меню
import './BurgerHeader.css';
import { Link } from 'react-router-dom';
import Account from '../Account/Account';

const BurgerHeader = ({ burger, handleBurger }) => {
  return ( 
    <div className={`${ burger ? 'burger_active': 'burger' }`}>
      <div className='burger__wrapper'>
        <button className='burger__close-button' onClick={handleBurger}/>
        <nav className='burger__navigation'>
          <Link to="/" className='burger__link' onClick={handleBurger}>Главная</Link>
          <Link to="/movies" className='burger__link burger__link_line' onClick={handleBurger}>Фильмы</Link>
          <Link to="/saved-movies" className='burger__link' onClick={handleBurger}>Сохранённые фильмы</Link>
        </nav>
        <Account burger = {burger} handleBurger={handleBurger} />
      </div>
    </div>
  )
}

export default BurgerHeader;