import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { AuthContext } from "../AuthContext";
import "../styles/Login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password }
      );
      login(response.data.token, response.data.isAdmin);
      alert("Login successful!");
      navigate('/');
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <div className="entryArea">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email:</label>
          </div>
          <div className="entryArea">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password:</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
