// import "./signup.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as AccountService from "../services/AccountService";

const Signup = () => {
  const handleSignup = () => {
    if (!accountType) {
      console.log("show error popup");
    } else {
      const user = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        accountType: accountType,
      };
      try {
        AccountService.createAccount(user);
        console.log("account created");
      } catch (err) {
        console.log("error creating acct");
      }
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState(null);
  return (
    <div className="signup">
      <div className="form">
        <input
          className="usernameInput"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="passwordInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          className="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <label for="userTypePro">Professional</label>
        <input
          type="radio"
          id="userTypePro"
          name="userType"
          onChange={() => setAccountType("Professional")}
        />
        <label for="userTypeCas">Casual</label>
        <input
          type="radio"
          id="userTypeCas"
          name="userType"
          onChange={() => setAccountType("Casual")}
        />
      </div>
      <div className="signupButtons">
        <Link to="/login">
          <button className="backtoLogin">Back to Login</button>
        </Link>
        <button className="createAccount" onClick={handleSignup}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Signup;
