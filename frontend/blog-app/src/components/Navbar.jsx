import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import "../styles/Navbar.css";

function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <h3><span>Tech</span>Blog</h3>
      <div className={`nav-wrapper ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="nav-center">
          <NavLink exact to="/" className={({ isActive }) => isActive ? "activeLink" : ""}>Home</NavLink>
          <NavLink to="/articles" className={({ isActive }) => isActive ? "activeLink" : ""}>Articles</NavLink>
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
      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>
    </div>
  );
}

export default Navbar;
