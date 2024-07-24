import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../frontend/blog-app/src/AuthContext';
import "../styles/HomePage.css"
function HomePage() {
  const { user } = useContext(AuthContext);
  const {isAdmin} = useContext(AuthContext);

  return (
    <div className="homePage">
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          {isAdmin ?(
            <p>You have admin privleges.</p>
          ): (
            <p>You do not have admin privileges.</p>
          )}
        </div>
      ) : (
        <p>Please log in with an admin account to see your information.</p>
      )}
    </div>
  );
}

export default HomePage;
