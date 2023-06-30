// компонент одной карточки фильма
import './MoviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ like, nameRU, duration, image, trailerLink, handleCardLike }) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/saved-movies" && !like ? 
        <></> :
        <li className='movies__item'>
          <a className='movies__trailer-link' href={trailerLink} rel="noreferrer" target="_blank">
            <img src={`${image}`} alt='Постер фильма' className='movies__img' />
          </a>
          <div className='movies__text-wrapper'>
            <h3 className='movies__title'>{nameRU}</h3>
            { location.pathname === "/movies" ? 
              <button onClick={handleCardLike} className={
                like ? 
                'movies__like-button movies__like-button_active': 'movies__like-button'
              } type='button'
              /> :
              <button className='movies__delete-button' type='button' />
            }
          </div>
          <p className='movies__duration'>{duration}</p>
        </li> 
      } 
    </> 
  )
}

export default MoviesCard;