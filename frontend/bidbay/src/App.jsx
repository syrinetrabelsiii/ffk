/* eslint-disable no-unused-vars */
// src/App.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Bids from "./pages/Bids/Bids";
import Footer from "./components/Footer/Footer";
import BidDetails from "./pages/BidDeatails";
import UserInfo from "./pages/UserInfo";
import UploadUserInfo from "./pages/UploadUserInfo";
import UploadItem from "./pages/UploadItem";
import UserBids from "./pages/UserBids";
import FetchUserIdComponent from "./components/FetchUserId";
import Hero from "./components/Hero/Hero";
function Logout() {
  localStorage.clear();

  return <Navigate to="/login" />;
}

function SingnupAndLogout() {
  localStorage.clear();
  return <Signup />;
}

const App = () => {
  return (
    <div className="main-div">
    <Router>
        <Navbar />
        <FetchUserIdComponent/>
        <Routes>
          <Route path="/signup" element={<SingnupAndLogout />} />
          <Route path="/upload-info" element={<UploadUserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/bids" element={<Bids />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/bids/:id"
            element={
              <ProtectedRoute>
                <BidDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-bids"
            element={
              <ProtectedRoute>
                <UserBids />
              </ProtectedRoute>
            }
          />
          <Route
            path="/item"
            element={
              <ProtectedRoute>
                <UploadItem />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
    </Router>
    </div>
  );
};

export default App;
