// src/components/navbar/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="power-rangers-nav">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/seasons">Seasons</Link></li>
        <li><Link to="/characters">Characters</Link></li>
        <li><Link to="/megazords">Megazords</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
