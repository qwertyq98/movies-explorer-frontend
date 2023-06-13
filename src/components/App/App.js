// корневой компонент приложения
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import './App.css';
import React, { useEffect, useState, useLayoutEffect } from 'react'; 
import { Route, Routes } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header isLogin={false} />
            <Main />
            <Footer />
          </>
        } />
        <Route path='/movies' element={<Movies isLogin={true}/>} />
      </Routes>
    </div>
  )
}

export default App;