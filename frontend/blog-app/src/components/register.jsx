import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <div className="formContainer">
        <form onSubmit={handleRegister}>
          <div className="entryArea">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username:</label>
          </div>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
