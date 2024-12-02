import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/post-login", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify({email, password})
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      navigate("/dashboard")
    })
    .catch(err => {
      console.log(err.message)
    })

  };

  return (
    <div className="auth-form">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
