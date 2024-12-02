import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/post-signup", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    }).then((res) => {
      return res.json()
    })
    .then(data => {
      console.log("saved info")

      setTimeout(() => {
        navigate(data.redirect)
      }, 1000)
      
    })
    .catch(err => {
      console.log(err.message)
    })
   
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/">Log in</a>
      </p>
    </div>
  );
}

export default Signup;
