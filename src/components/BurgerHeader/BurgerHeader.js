// компонент бургерного меню
import './BurgerHeader.css';
import { NavLink } from 'react-router-dom';
import Account from '../Account/Account';

const BurgerHeader = ({ burger, handleBurger }) => {
  return ( 
    <div className={`${ burger ? 'burger_active': 'burger' }`}>
      <div className='burger__wrapper'>
        <button className='burger__close-button' onClick={handleBurger}/>
        <nav className='burger__navigation'>
          <NavLink to="/" 
            className={({isActive}) => isActive ? 
            'burger__link burger__link_line': 'burger__link'} 
            onClick={handleBurger}
          >Главная</NavLink>
          <NavLink to="/movies"
            className={({isActive}) => isActive ? 
            'burger__link burger__link_line': 'burger__link'} 
            onClick={handleBurger}
          >Фильмы</NavLink>
          <NavLink to="/saved-movies"
            className={({isActive}) => isActive ? 
            'burger__link burger__link_line': 'burger__link'} 
            onClick={handleBurger}
          >Сохранённые фильмы</NavLink>
        </nav>
        <Account burger = {burger} handleBurger={handleBurger} />
      </div>
    </div>
  )
}

export default BurgerHeader;