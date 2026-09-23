import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About GREATCARS</h1>

        <p>
          At <strong>GREATCARS</strong>, we make it easy to find quality
          vehicles at competitive prices. Our collection includes luxury,
          family, sports, and everyday cars from trusted brands.
        </p>

        <div className="about-cards">
          <div className="about-card">
            <h3>🚗 Quality Cars</h3>
            <p>Every vehicle is carefully selected for quality and reliability.</p>
          </div>

          <div className="about-card">
            <h3>💰 Best Prices</h3>
            <p>Affordable pricing with excellent value for every customer.</p>
          </div>

          <div className="about-card">
            <h3>🤝 Trusted Service</h3>
            <p>Friendly support before, during, and after your purchase.</p>
          </div>
        </div>

        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            To provide a simple, secure, and enjoyable car shopping experience
            while helping customers find the perfect vehicle with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About