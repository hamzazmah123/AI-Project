import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [role, setRole] = useState("student");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      const { token } = response.data;
      localStorage.setItem("authToken", token); // Save token for authenticated requests
      navigate(`/${role}/dashboard`); // Navigate to respective dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </label>
        <label>
          Login as:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="driver">Driver</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;












// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Auth.css";

// function Login() {
//   const [role, setRole] = useState("admin");
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Hardcoded login credentials for testing
//     const hardcodedCreds = {
//       admin: { username: "admin", password: "admin123" },
//       student: { username: "student", password: "student123" },
//       driver: { username: "driver", password: "driver123" },
//     };

//     if (
//       credentials.username === hardcodedCreds[role].username &&
//       credentials.password === hardcodedCreds[role].password
//     ) {
//       navigate(`/${role}/dashboard`); // Navigate to respective dashboard
//     } else {
//       alert("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={credentials.username}
//             onChange={(e) =>
//               setCredentials({ ...credentials, username: e.target.value })
//             }
//             required
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={credentials.password}
//             onChange={(e) =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//             required
//           />
//         </label>
//         <label>
//           Login as:
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="admin">Admin</option>
//             <option value="student">Student</option>
//             <option value="driver">Driver</option>
//           </select>
//         </label>
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/signup">Sign Up</a>
//       </p>
//     </div>
//   );
// }

// export default Login;