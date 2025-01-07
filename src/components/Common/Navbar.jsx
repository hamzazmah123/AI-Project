import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/student">Student</Link></li>
        <li><Link to="/driver">Driver</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;