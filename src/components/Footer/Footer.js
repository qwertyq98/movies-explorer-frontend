// презентационный компонент, который отрисовывает подвал
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__wrapper'>
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className='footer__info'>
          <p className="footer__year">© {new Date().getFullYear()}</p>
          <div className='footer__list'>
            <a className='footer__link' href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a className='footer__link' href="https://github.com/qwertyq98" target="_blank" rel="noreferrer" lang='en'>Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;