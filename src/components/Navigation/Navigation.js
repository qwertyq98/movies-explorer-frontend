// компонент, который отвечает за меню навигации на сайте.
import './Navigation.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className='navigation'>
      <Link to='/movies' className={
        location.pathname === '/' ? 
        'navigation__films navigation__films_white': 
        'navigation__films'
      }>Фильмы</Link>
      <Link to='/saved-movies' className={
        location.pathname === '/' ? 
        'navigation__films navigation__films_white navigation__films_saved': 
        'navigation__films navigation__films_saved'
      }>Сохранённые фильмы</Link>
    </nav>
  )
}

export default Navigation;