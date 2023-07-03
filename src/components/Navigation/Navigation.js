// компонент, который отвечает за меню навигации на сайте.
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className='navigation'>
      <NavLink to='/movies' className={({isActive}) =>
        location.pathname === '/' ? 
        'navigation__films navigation__films_white': 
        isActive ? 'navigation__films navigation__active' : 'navigation__films'
      }>Фильмы</NavLink>
      <NavLink to='/saved-movies' className={({isActive}) => 
        location.pathname === '/' ? 
        'navigation__films navigation__films_white': 
        isActive ? 'navigation__saved-films navigation__active' : 'navigation__saved-films'
      }>Сохранённые фильмы</NavLink>
    </nav>
  )
}

export default Navigation;