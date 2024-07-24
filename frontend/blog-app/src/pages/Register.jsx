import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      await axios.post("/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <div className="formContainer">
        {error && <div className="error">{error}</div>}
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
          <div className="entryArea">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirm Password:</label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
