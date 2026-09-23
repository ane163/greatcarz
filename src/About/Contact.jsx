import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">

        <h1>Contact Us</h1>
        <p>We're here to help. Get in touch with us anytime.</p>

        <div className="contact-content">

          <div className="contact-info">
            <h2>Get In Touch</h2>

            <p><strong>📍 Address:</strong> Harare, Zimbabwe</p>
            <p><strong>📞 Phone:</strong> +263 77 123 4567</p>
            <p><strong>✉️ Email:</strong> info@greatcars.com</p>
            <p><strong>🕒 Hours:</strong> Mon - Sat: 8:00 AM - 6:00 PM</p>
          </div>

          <form className="contact-form">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <input type="text" placeholder="Subject" />
            <textarea rows="6" placeholder="Your Message"></textarea>

            <button type="submit">Send Message</button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Contact;