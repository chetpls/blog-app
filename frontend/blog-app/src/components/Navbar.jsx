import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import "../styles/Navbar.css";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header">
      <h3>Blog</h3>
      <nav className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/articles">All Articles</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <nav className="nav-right">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Log In</button>
            <button onClick={() => navigate('/register')}>Sign Up</button>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
