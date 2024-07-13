import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Home Page</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
        </div>
      ) : (
        <p>Please log in to see your information.</p>
      )}
    </div>
  );
}

export default HomePage;
