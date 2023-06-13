// компонент с описанием дипломного проекта
import './AboutProject.css';
import TitleSection from '../TitleSection/TitleSection';

function AboutProject() {
  return (
    <section className='about-project' id='about_project'>
      <TitleSection title={ 'О проекте' }/>
      <div className='about-project__text-wrapper'>
        <div className='about-project__column'>
          <h3 className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__column-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className='about-project__column'>
          <h3 className="about-project__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about-project__column-text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__time">
        <div className="about-project__lines">
          <p className="about-project__line about-project__line_green">1 неделя</p>
          <p className="about-project__line about-project__line_gray">4 недели</p>
        </div>
        <div className="about-project__section">
          <p className="about-project__name about-project__name_back">Back-end</p>
          <p className="about-project__name about-project__name_front">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;