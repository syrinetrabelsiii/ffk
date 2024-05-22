import React from "react";
import "./Navbar.css";
import '../../index.css';
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.gif"
const Navbar = () => {
  const navigate = useNavigate();
  // Retrieve ACCESS_TOKEN from localStorage
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  // Check if the ACCESS_TOKEN exists to determine authentication status
  const isAuthenticated = accessToken !== null;


  const handleLogout = () => {
    // Clear the access token from localStorage
    localStorage.removeItem(ACCESS_TOKEN);
    // Refresh the page after logging out
    window.location.reload();
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    navigate("/logout");
  };

  return (
    <section className="nav-wrapper">
      <div className="flexCenter paddings innerWidth nav-container ">
        <img src={logo} alt="logo" width={100}/>
      <div className="flexCenter nav-menu">
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/bids">
            Bids
          </Link>
        </li>
        <li>
          <Link className="link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="link" to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className="link" to="/user">
            Profile
          </Link>
        </li>
      </div>
      {!isAuthenticated && (
      <div onClick={handleLoginClick} className="nav-connect">
        Login
      </div>
      )}
      {!isAuthenticated && (
        <div onClick={handleSignupClick} className="nav-connect">
        Signup
      </div>
      )}
      {isAuthenticated && (
        <div onClick={handleLogoutClick} className="nav-connect">
        Logout
      </div>
      )}
      </div>
    </section>
  );
};

export default Navbar;
