import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data.user);
        setIsLoggedIn(true);
        setIsAdmin(response.data.user.isAdmin);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
      });
    }
  }, []);

  const login = (token, isAdmin) => {
    localStorage.setItem('token', token);
    axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setUser(response.data.user);
      setIsLoggedIn(true);
      setIsAdmin(isAdmin);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
