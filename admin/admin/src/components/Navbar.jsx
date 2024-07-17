import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../frontend/blog-app/src/AuthContext';
import "../../../../frontend/blog-app/src/styles/Navbar.css";

function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header">
      <h3>Admin Panel</h3>
      <nav className="nav-center">
      {isAdmin && <NavLink to="/dashboard" className={({ isActive }) => isActive ? "activeLink" : ""}>Dashboard</NavLink>}
        {isAdmin && <NavLink to="/new-post" className={({ isActive }) => isActive ? "activeLink" : ""}>New Post</NavLink>}
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
