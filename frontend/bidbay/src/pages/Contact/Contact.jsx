import React, { useState } from "react";
import "./Contact.css";
import logo from "../../assets/logo.gif";
import mailicon from "../../assets/mailicon.svg";
import phone from "../../assets/phone.svg";
import api from "../../api";

const Contact = () => {
  const [formData, setFormData] = useState({
    c_name: "",
    c_email: "",
    c_message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/contact/", formData);
      if (response.status === 201) {
        alert("Contact submitted successfully!");
        setFormData({ c_name: "", c_email: "", c_message: "" });
      } else {
        alert("Failed to submit contact");
      }
    } catch (error) {
      alert("Failed to submit contact");
    }
  };

  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <img src={logo} alt="Logo" />
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>WELCOME</h1>
          <p>Get in touch</p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mailicon} alt="Mail Icon" />
              <p>bidbay369@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={phone} alt="Phone Icon" />
              <p>+216 50 021 071</p>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="formName">Your Name</label>
              <input
                type="text"
                id="formName"
                placeholder="Enter your name"
                name="c_name"
                onChange={handleChange}
                value={formData.c_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formEmail">Your Email</label>
              <input
                type="email"
                id="formEmail"
                placeholder="Enter your email"
                name="c_email"
                onChange={handleChange}
                value={formData.c_email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formMessage">Write your message here</label>
              <textarea
                id="formMessage"
                rows={8}
                placeholder="Enter your message"
                name="c_message"
                onChange={handleChange}
                value={formData.c_message}
              ></textarea>
            </div>
            <button type="submit" className="contact-submit">
              Submit now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
