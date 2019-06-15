import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-tasks" /> Todo App
        </Link>
      </h1>
   
    </nav>
  );
};

export default Navbar;
