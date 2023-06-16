// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isLogin, movies, isLiked, onMovieLike, onMovieDelete }) {
  return (
    <>
      <main className='movies'>
        <Header isLogin={ isLogin } />
        <SearchForm />
        <MoviesCardList movies={movies} isLiked={isLiked} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;