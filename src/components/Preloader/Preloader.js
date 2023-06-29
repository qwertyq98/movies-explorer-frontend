import React from 'react'
import './Preloader.css'

const Preloader = ({loading, element}) => {
  return (
    loading ?
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div> : 
    element
  )
};

export default Preloader
