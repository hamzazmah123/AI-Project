import React from "react";
import { Link } from "react-router-dom";
import "./Driver.css";

function DriverDashboard() {
  return (
    <div className="driver-dashboard">
      <h2>Driver Dashboard</h2>
      <p>Welcome to the Driver Portal. Manage your trips:</p>
      <div className="dashboard-buttons">
        <Link to="/driver/trip-details" className="dashboard-link">Trip Details</Link>
      </div>
    </div>
  );
}

export default DriverDashboard;