// компонент с использованными технологиями.
import './Techs.css';
import TitleSection from '../TitleSection/TitleSection';

function Techs() {
  return (
    <section className='techs'>
      <div className='techs__wrapper'>
        <TitleSection title={ 'Технологии' }/>
        <div className='techs__wrapper_text'>
          <h2 className='techs__title'>7 технологий</h2>
          <p className='techs__description'>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, 
            которые применили в&nbsp;дипломном проекте.</p>
          <ul className="techs__list">
            <li className="techs__item" lang="en">HTML</li>
            <li className="techs__item" lang="en">CSS</li>
            <li className="techs__item" lang="en">JS</li>
            <li className="techs__item" lang="en">React</li>
            <li className="techs__item" lang="en">Git</li>
            <li className="techs__item" lang="en">Express.js</li>
            <li className="techs__item" lang="en">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Techs;