import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";
import "../styles/UserInfo.css"

const UserInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for profile image

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/api/userinfo/");
      if (response.data.length > 0) {
        setUserInfo(response.data[0]);
      } else {
        navigate("/upload-info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]); // Update profile image state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profile_image", profileImage); // Append profile image to FormData
      formData.append("phone", userInfo.phone);
      formData.append("adress", userInfo.adress);
      formData.append("city", userInfo.city);
      formData.append("email", userInfo.email);
      formData.append("zip", userInfo.zip);
      formData.append("state", userInfo.state);

      const response = await api.put(`/api/userinfo/${userInfo.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserInfo(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  if (userInfo === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>{userInfo.fullname} Profile Overview</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="user-info-form">
          <label>
              <strong>Profile Image:</strong>
              <input
                type="file"
                name="profile_image"
                onChange={handleImageChange}
              />
            </label>
            <label>
              <strong>Phone Number:</strong>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>Address:</strong>
              <input
                type="text"
                name="adress"
                value={userInfo.adress}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>City:</strong>
              <input
                type="text"
                name="city"
                value={userInfo.city}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>Zip Code:</strong>
              <input
                type="text"
                name="zip"
                value={userInfo.zip}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>State:</strong>
              <input
                type="text"
                name="state"
                value={userInfo.state}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            
            Cancel
          </button>
          <button onClick={() => setIsEditing(true)}>Edit Profile Picture</button>
        </form>
      ) : (
        <div className="user-info">
          <p>
            <strong>Profile Image:</strong>{" "}
            <img src={userInfo.profile_image} alt="Profile" />
          </p>
          <p>
            <strong>Phone Number:</strong> {userInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {userInfo.adress}
          </p>
          <p>
            <strong>City:</strong> {userInfo.city}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Zip Code:</strong> {userInfo.zip}
          </p>
          <p>
            <strong>State:</strong> {userInfo.state}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <Link className="link-to-bids" to="/user-bids">See Your current bids!</Link>
      <Link className="link-to-bids" to="/item">Upload an Item for review!</Link>

    </div>
  );
};


export default UserInfo;