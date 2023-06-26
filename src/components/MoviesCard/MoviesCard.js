// компонент одной карточки фильма
import './MoviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, isLiked, onMovieLike }) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/saved-movies" && !movie.like ? 
        <></> :
        <li className='movies__item'>
          <img src={`${movie.image}`} alt='Постер фильма' className='movies__img' />
          <div className='movies__text-wrapper'>
            <h3 className='movies__title'>{movie.name}</h3>
            { location.pathname === "/movies" ? 
              <button onClick={onMovieLike} className={
                movie.like || isLiked ? 
                'movies__like-button movies__like-button_active': 'movies__like-button'
              } type='button' /> :
              <button className='movies__delete-button' type='button' />
            }
          </div>
          <p className='movies__duration'>{movie.duration}</p>
        </li> 
      } 
    </> 
  )
}

export default MoviesCard;