// компонент с вёрсткой баннера страницы «О проекте».
import './Promo.css';
import earth from "../../images/earth.svg";

function Promo({handleScroll, showMoreRef}) {

  return (
    <section className='promo'>
      <div className='promo__wrapper'>
        <div className='promo__text-wrapper'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className='promo__description'>Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
          <button className='promo__button' onClick={() => handleScroll(showMoreRef)}>Узнать больше</button>
        </div>
        <img className='promo__img' src={earth} alt='Земной шар'/>
      </div>
    </section>
  )
}

export default Promo;