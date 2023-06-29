// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isLogin, movies, isLiked, onMovieLike, onMovieDelete, handleBurger, burger }) {
  function onChangeFilter() {
    // Логика для сохранненых фильмов
  }

  return (
    <>
      <main className='movies'>
        <Header isLogin={ isLogin } handleBurger={handleBurger} burger={burger} />
        <SearchForm onChangeFilter={onChangeFilter} />
        <MoviesCardList movies={movies} isLiked={isLiked} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;