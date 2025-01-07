import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <p>Select a section to manage:</p>
      <div className="dashboard-buttons">
        <Link to="/admin/vehicle-management" className="dashboard-link">Vehicle Management</Link>
        <Link to="/admin/route-management" className="dashboard-link">Route Management</Link>
        <Link to="/admin/fee-management" className="dashboard-link">Fee Management</Link>
      </div>
    </div>
  );
}

export default Dashboard;
