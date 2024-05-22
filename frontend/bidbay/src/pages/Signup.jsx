import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "../components/LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import React from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Signup the user
      await api.post("/api/user/register/", { username, password });

      // Log the user in after successful signup
      const res = await api.post("/api/token/", { username, password });

      // Save tokens to localStorage
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      // Decode the token and save the current user
      

      // Redirect to the desired page after login
      navigate("/user");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Signup</h1>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;
