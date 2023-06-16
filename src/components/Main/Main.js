// компонент страницы «О проекте». Он будет содержать только презентационные компоненты и в будущем, за исключением шапки навигации.
import './Main.css';
import React from 'react'; 
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main({ handleScroll, showMoreRef }) {
  return (
    <main className="main">
      <Promo handleScroll={handleScroll} showMoreRef={showMoreRef} />
      <AboutProject showMoreRef={showMoreRef} />
      <Techs />
      <AboutMe />
    </main>
  )
}

export default Main;