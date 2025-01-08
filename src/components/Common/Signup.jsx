import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", userDetails);
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={userDetails.password}
            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            required
          />
        </label>
        <label>
          Signup as:
          <select
            value={userDetails.role}
            onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="driver">Driver</option>
          </select>
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;