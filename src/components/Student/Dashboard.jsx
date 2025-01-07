import React from "react";
import { Link } from "react-router-dom";
import "./Student.css";

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <p>Welcome to the Student Portal. Select an option:</p>
      <div className="dashboard-buttons">
        <Link to="/student/signup" className="dashboard-link">Sign Up</Link>
        <Link to="/student/profile" className="dashboard-link">Profile</Link>
      </div>
    </div>
  );
}

export default StudentDashboard;