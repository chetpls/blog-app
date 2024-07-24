import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewPost from './pages/NewPost';
import './App.css';
import { AuthProvider } from './AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';

function App() {
  return (
    <AuthProvider>
    <Router>
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} /> {/* Add this route */}
        </Routes>
      </div>
      <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
