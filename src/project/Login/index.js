import "./login.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as AccountService from "../services/AccountService";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleLogin() {
    const userData = { username, password };
    let user = await AccountService.loginAccount(userData);
    // TODO: change to try catch with error handling
    if (user) {
      console.log("ACCOUNT FOUND");
      dispatch(setCurrentUser(user));
      navigate(`../profile/${user.username}`);
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
