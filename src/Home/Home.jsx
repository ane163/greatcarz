import React from "react";
import "./Home.css";
import img from "./images/car2.jpeg";
import { FaCarSide, FaShieldAlt, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

const Home = () => {
  return (
    <>

      <div className="home">

        <img src={img} alt="Luxury Car" className="hero-image" />

        <div className="overlay"></div>

        <div className="home_text">

          <h1>Drive Your Dream Car</h1>

          <h2>Luxury • Performance • Excellence</h2>

          <p>
            Discover the world's finest collection of premium vehicles.
            Find the perfect car that matches your lifestyle.
          </p>

          <button className="hero-btn">
            Explore Cars
          </button>

        </div>

      </div>


      <section className="why-us">

        <h2>Why Choose GreatCars?</h2>

        <div className="features">

          <div className="feature-card">
            <FaCarSide className="feature-icon" />
            <h3>Premium Cars</h3>
            <p>Luxury vehicles from trusted brands worldwide.</p>
          </div>

          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Quality Guaranteed</h3>
            <p>Every vehicle is carefully inspected for quality.</p>
          </div>

          <div className="feature-card">
            <FaMoneyBillWave className="feature-icon" />
            <h3>Best Prices</h3>
            <p>Competitive prices with great value for money.</p>
          </div>

          <div className="feature-card">
            <FaHeadset className="feature-icon" />
            <h3>24/7 Support</h3>
            <p>Our team is always ready to help you.</p>
          </div>

        </div>

      </section>

    </>
  );
};

export default Home