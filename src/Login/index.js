import "./login.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as AccountService from "../services/AccountService";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    const userData = { username, password };
    let x = await AccountService.loginAccount(userData);
    if (x) {
      console.log("ACCOUNT FOUND");
      navigate(`../profile/${x.username}`);
    } else {
      console.log("NO ACCOUNT FOUND");
    }
  }
  return (
    <div className="login">
      <div className="form">
        <input
          className="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="passwordInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="loginButtons">
        <button onClick={handleLogin} className="backtoLogin">
          Login
        </button>
        <Link to="/register">
          <button className="createAccount">Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
