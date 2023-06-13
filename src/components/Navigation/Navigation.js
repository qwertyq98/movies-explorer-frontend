// компонент, который отвечает за меню навигации на сайте.
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='navigation'>
      <Link to='/movies' className='navigation__films'>Фильмы</Link>
      <Link to='/saved-movies' className='navigation__films navigation__films_saved'>Сохранённые фильмы</Link>
    </nav>
  )
}

export default Navigation;