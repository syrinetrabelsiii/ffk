// UploadUserInfo.js
import React, { useState } from "react";
import api from "../api";
import "../styles/Form.css"
import { useNavigate } from "react-router-dom";

const UploadUserInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    phone: '',
    fullname: '',
    adress: '',
    city: '',
    email: '',
    zip: '',
    state: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/userinfo/', userInfo);
      if (res.status === 201) {
        navigate("/user")
      }
    } catch (error) {
      console.error('Error uploading user info:', error);
    }
  };

  return (
    <div className="upload-info-container">
      <h1>Upload Your Information</h1>
      <form onSubmit={handleSubmit} className="form-container-left">
        <div className="user-info">
          <label>
            <strong>Phone Number:</strong>
            <input className="form-input" type="text" name="phone" value={userInfo.phone} onChange={handleChange} />
          </label>
          <label>
            <strong>Full Name:</strong>
            <input className="form-input" type="text" name="fullname" value={userInfo.fullname} onChange={handleChange} />
          </label>
          <label>
            <strong>Address:</strong>
            <input className="form-input" type="text" name="adress" value={userInfo.adress} onChange={handleChange} />
          </label>
          <label>
            <strong>City:</strong>
            <input className="form-input" type="text" name="city" value={userInfo.city} onChange={handleChange} />
          </label>
          <label>
            <strong>Email:</strong>
            <input className="form-input" type="email" name="email" value={userInfo.email} onChange={handleChange} />
          </label>
          <label>
            <strong>Zip Code:</strong>
            <input className="form-input" type="text" name="zip" value={userInfo.zip} onChange={handleChange} />
          </label>
          <label>
            <strong>State:</strong>
            <input className="form-input" type="text" name="state" value={userInfo.state} onChange={handleChange} />
          </label>
        </div>
        <button className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadUserInfo;
