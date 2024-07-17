import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../frontend/blog-app/src/AuthContext';

function HomePage() {
  const { user } = useContext(AuthContext);
  const {isAdmin} = useContext(AuthContext);

  return (
    <div>
      <h2>Home Page</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
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
