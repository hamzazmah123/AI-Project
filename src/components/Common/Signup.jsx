import React, { useState } from "react";
import "./Auth.css";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signup successful! (For now, this is just a placeholder.)");
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            required
          />
        </label>
        <label>
          Signup as:
          <select
            value={userDetails.role}
            onChange={(e) =>
              setUserDetails({ ...userDetails, role: e.target.value })
            }
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