import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import "../styles/Navbar.css";

function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header">
      <h3>Blog</h3>
      <nav className="nav-center">
      <NavLink exact to="/" className={({ isActive }) => isActive ? "activeLink" : ""}>Home</NavLink>
<NavLink to="/articles" className={({ isActive }) => isActive ? "activeLink" : ""}>All Articles</NavLink>
<NavLink to="/about" className={({ isActive }) => isActive ? "activeLink" : ""}>About Us</NavLink>
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