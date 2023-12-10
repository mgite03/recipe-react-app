import React, { useState, useEffect } from "react";
import * as AccountService from "../services/AccountService";
import { setCurrentUser } from "../users/reducer";
import { useDispatch, useSelector } from "react-redux";
import "./nav.css";

function NavigationBar() {
  const [activeLink, setActiveLink] = useState("Home"); // Set a default active link
  const { currentUser } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const signout = async () => {
    await AccountService.signout();
    dispatch(setCurrentUser(null));
    window.location.reload();
    // navigate("../login");
    setActiveLink("Home");
  };
  useEffect(() => {
    // Update the active link based on the current URL
    const path = window.location.pathname;
    if (path === "/login") {
      setActiveLink("Login");
    } else if (path === "/register") {
      setActiveLink("Signup");
    } else if (path === "/home") {
      setActiveLink("Home")
    } else {
      setActiveLink("Profile");
    }
  }, []);
  return (
    <>
      <nav className="navBar py-2">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <a
                href="/"
                className={`nav-link ${activeLink === "Home" ? "active" : ""}`}
                aria-current="page"
              >
                Home
              </a>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
              <a href="/search" className="nav-link link-dark px-2">
                Search
              </a>
            </li>
          </ul>
          {!currentUser && (
            <>
              <ul className="nav">
                <li className="nav-item">
                  <a
                    href="/login" className={`nav-link ${activeLink === "Login" ? "active" : ""}`}

                  >
                    Login
                  </a>
                </li>
              </ul>
              <ul className="nav">
                <li className="nav-item">
                  <a
                    href="/register"
                    className={`nav-link ${activeLink === "Signup" ? "active" : ""}`}

                  >
                    Signup
                  </a>
                </li>
              </ul>
            </>
          )}
          {currentUser && (
            <>
              <ul className="nav">
                <li className="nav-item">
                  <a href="/profile" 
                  className={`nav-link ${activeLink === "Profile" ? "active" : ""}`}
                  
                  >
                    Profile
                  </a>
                </li>
              </ul>
              <ul className="nav">
                <li className="nav-item">
                  <span className="nav-link link-dark px-2">
                    Signed in as: <strong>{currentUser.username}</strong>
                  </span>
                </li>
              </ul>
              <ul className="nav">
                <li className="nav-item">
                  <button onClick={signout} className="nav-link link-dark px-2">
                    Logout
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
      {/* {JSON.stringify(currentUser)} */}
    </>

    // <header className="d-flex justify-content-center py-3">
    //   <ul className="nav nav-pills">
    //     <li className="nav-item">
    //       <a href="#" className="nav-link">Home</a>
    //     </li>
    //     <li className="nav-item">
    //       <a href="#" className="nav-link">User</a>
    //     </li>
    //   </ul>
    // </header>

    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    //     <span class="navbar-toggler-icon"></span>
    //   </button>
    //   <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    //     <a class="navbar-brand" href="#">Hidden brand</a>
    //     <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
    //       <li class="nav-item active">
    //         <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Link</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link disabled" href="#">Disabled</a>
    //       </li>
    //     </ul>
    //     <form class="form-inline my-2 my-lg-0">
    //       <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    //       <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    //     </form>
    //   </div>
    // </nav>
  );
}
export default NavigationBar;