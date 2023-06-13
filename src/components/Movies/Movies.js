// компонент страницы с поиском по фильмам
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ isLogin }) {
  return (
    <>
      <main className='movies'>
        <Header isLogin={ isLogin } />
        <SearchForm />
      </main>
      <Footer />
    </>
  )
}

export default Movies;
