import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Admin/Dashboard";
import VehicleManagement from "../components/Admin/VehicleManagement";
import RouteManagement from "../components/Admin/RouteManagement";
import FeeManagement from "../components/Admin/FeeManagement";
import "../components/Admin/Admin.css";

function AdminPage() {
  return (
    <div className="admin-page">
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<Dashboard />} />
        {/* Sub-Routes */}
        <Route path="/vehicle-management" element={<VehicleManagement />} />
        <Route path="/route-management" element={<RouteManagement />} />
        <Route path="/fee-management" element={<FeeManagement />} />
      </Routes>
    </div>
  );
}

export default AdminPage;