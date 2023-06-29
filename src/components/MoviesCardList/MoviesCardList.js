// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import React, {useLayoutEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isLiked, onMovieLike, onClickButton, numberVisibleMovies }) {
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
            image={`https://api.nomoreparties.co/${movie.image.url}`}
            movie={movie}
            isLiked={isLiked}
            onMovieLike={onMovieLike}
            trailerLink={movie.trailerLink}
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