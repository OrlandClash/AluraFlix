import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Alura<span className="highlight">FLIX</span></h1>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/nuevo-video" className="nav-button">Nuevo Video</Link>
      </nav>
    </header>
  );
};

export default Header;