import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
          <p>
            Welcome to our auction website! We specialize in providing a
            platform for buying and selling a wide range of items through
            auctions. Whether you're a collector, a seller, or just looking for
            unique treasures, we've got you covered.
          </p>
          <p>
            
          </p>
        </div>
        <hr />
        <div className="footer-bottom">
        <p className="footer-bottom-left">&copy; 2024 Your Auction Website. All rights reserved.</p>
        <div className="footer-bottom-right">
            <p>Term of Services</p>
            <p>Privacy Policy</p>
            <p>Connect with us</p>
        </div>
      </div>
      </div>
  );
};

export default Footer;
