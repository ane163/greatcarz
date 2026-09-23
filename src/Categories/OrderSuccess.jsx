import React from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";


const OrderSuccess = () => {


  return (

    <div className="success-container">


      <div className="success-box">


        <div className="success-icon">
          ✓
        </div>


        <h1>
          Order Placed Successfully
        </h1>


        <p>
          Thank you for your purchase.
          We will contact you shortly to confirm delivery.
        </p>


        <Link to="/">
          <button className="home-btn">
            Continue Shopping
          </button>
        </Link>


      </div>


    </div>

  );

};


export default OrderSuccess;