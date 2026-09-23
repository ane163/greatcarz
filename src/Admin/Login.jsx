import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      console.log("Logged in user:", data.user);

if (data.user.role === "admin") {
  console.log("Logged in user:", data.user);

if (data.user.role === "admin") {
  console.log("Navigating to admin...");
  navigate("/admin");
} else {
  console.log("Navigating to home...");
  navigate("/");
}
      }
    } catch (err) {
      console.log(err);
      alert("Server error.");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>🚗 GREATCARS</h1>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#ccc",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#00c6ff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;