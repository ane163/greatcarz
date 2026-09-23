import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>GREATCARS</h2>
          <p>
            Premium cars, trusted service, and the best prices. Drive your
            dream with confidence.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/products">Shop</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📍 Harare, Zimbabwe</p>
          <p>📞 +263 77 123 4567</p>
          <p>✉️ info@greatcars.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 GREATCARS. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;