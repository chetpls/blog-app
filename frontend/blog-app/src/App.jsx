import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Article from './pages/Article';
import AllArticles from './pages/AllArticles';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/articles" element={<AllArticles />} />
              <Route path="/posts/:id" element={<Article />} /> 
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>
          <Footer /> {/* Add Footer */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
