import React from 'react';
import './Banner.css';
import bannerImage from '../img/desarrollador-web.jpg'; // Ajusta según tu estructura de directorios

const Banner = () => {
  return (
    <div className="banner">
        <h1 className='titulo'>Challenge React</h1>
      <img src={bannerImage} alt="Banner para desarrolladores web" />
    </div>
  );
};

export default Banner;