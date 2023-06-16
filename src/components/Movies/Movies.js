// компонент страницы с поиском по фильмам
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isLogin, movies, isLiked, onMovieLike }) {
  return (
    <>
      <main className='movies'>
        <Header isLogin={ isLogin } />
        <SearchForm />
        <MoviesCardList movies={movies} isLiked={isLiked} onMovieLike={onMovieLike} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;
