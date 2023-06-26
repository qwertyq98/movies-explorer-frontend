// компонент с информацией о студенте.
import './AboutMe.css';
import TitleSection from '../TitleSection/TitleSection';
import Portfolio from '../Portfolio/Portfolio';
import photo from "../../images/photo.png";

function AboutMe() {
  return (
    <section className='about-me'>
      <TitleSection title={ 'Студент' }/>
      <div className='about-me__wrapper'>
        <div className='about-me__wrapper_text'>
          <h3 className='about-me__title'>Анастасия</h3>
          <p className='about-me__info'>Фронтенд-разработчик, 24 года</p>
          <p className='about-me__text'>
            Я&nbsp;родилась и&nbsp;живу в&nbsp;Ярославле, закончила факультет архитектурно-строительный 
            факультет ЯГТУ. Веб-разработка привлекает меня практически неограниченными возможностями: 
            можно реализовать множество вещей, а&nbsp;так&nbsp;же добавить элементам интерактивность, 
            взаимодействие с&nbsp;пользователем. Кроме того, мне очень нравится видеть результат своей работы.
          </p>
          <a
            lang="en"
            className="about-me__link"
            href="https://github.com/qwertyq98"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className='about-me__photo' src={photo} alt='Анастасия Капустина' />
      </div>
      <Portfolio />
  </section>
  )
}

export default AboutMe;