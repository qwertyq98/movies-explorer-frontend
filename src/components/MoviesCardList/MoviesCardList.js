// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import React, {useLayoutEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIES_API_URL } from '../../utils/constants';

function MoviesCardList({ movies, isLiked, onClickButton, numberVisibleMovies, handleCardLike }) {
  const [visibalMovies, setVisibalMovies] = React.useState([]);

  useLayoutEffect(() => {
    if (movies) {
      setVisibalMovies(movies.slice(0, numberVisibleMovies));
    }
  }, [movies, numberVisibleMovies]);

  return (
    <section className='movies-list'>
      <ul className='movies-list__items'>
        {visibalMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            nameRU={movie.nameRU}
            duration={`${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`}
            image={`${MOVIES_API_URL}/${movie.image.url}`}
            trailerLink={movie.trailerLink}
            handleCardLike={() => handleCardLike(movie)}
            like={movie.like}
          />
        ))}
      </ul>
      { !movies ? <></> : 
        numberVisibleMovies >= movies.length ?
        <div className='movies__empty-block' /> :
        <button className="movies-list__button" type="button" onClick={onClickButton}>Ещё</button>
      }
    </section>
  )
}

export default MoviesCardList;