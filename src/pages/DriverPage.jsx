import React from "react";
import { Routes, Route } from "react-router-dom";
import DriverDashboard from "../components/Driver/Dashboard";
import TripDetails from "../components/Driver/TripDetails";

function DriverPage() {
  return (
    <div className="driver-page">
      <Routes>
        <Route path="/" element={<DriverDashboard />} />
        <Route path="/trip-details" element={<TripDetails />} />
      </Routes>
    </div>
  );
}

export default DriverPage;
