// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, isLiked, onMovieLike }) {
  const location = useLocation();

  return (
    <section className='movies-list'>
      <ul className='movies-list__items'>
        {movies.map((movie) => (
          <MoviesCard
            key={movie._id}
            movie={movie}
            isLiked={isLiked}
            onMovieLike={onMovieLike}
          />
        ))}
      </ul>
      {location.pathname === '/saved-movies' ? 
        <div className='movies__empty-block' /> :
        <button className="movies-list__button" type="button">Ещё</button>
      }
    </section>
  )
}

export default MoviesCardList;