import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./User.css";

const User = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };


  const uploadProfile = async () => {

  if (!image) {
    alert("Please choose an image first");
    return;
  }

  const formData = new FormData();

  formData.append(
    "profilePicture",
    image
  );


  try {

    const response = await fetch(
      `http://localhost:5000/api/users/profile/${user.id}`,
      {
        method: "PUT",
        body: formData,
      }
    );


    const data = await response.json();


    if(response.ok){

      alert("Profile picture updated!");

      const updatedUser = {
        ...user,
        profilePicture: data.profilePicture
      };


      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      window.location.reload();

    } else {

      alert(data.message);

    }


  } catch(err){

    console.log(err);
    alert("Server error");

  }

};

  if (!user) {
    return (
      <div className="user">
        <div className="user-card">

          <div className="profile">
            👤
          </div>

          <h2>Welcome to GREATCARS</h2>

          <p>Please login or create an account.</p>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="register-btn">
              Create Account
            </button>
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="user">
      <div className="user-card">

        <img
          src={`http://localhost:5000${user.profilePicture}`}
          alt="Profile"
          className="profile-image"
        />

        <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
/>


<button
  className="login-btn"
  onClick={uploadProfile}
>
  Update Profile Picture
</button>

        <h2>{user.fullName}</h2>

        <p>{user.email}</p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        {user.role === "admin" && (
          <button
            className="login-btn"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </button>
        )}

        <button
          className="register-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default User;