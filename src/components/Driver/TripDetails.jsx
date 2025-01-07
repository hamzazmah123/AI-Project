import React from "react";
import "./Driver.css";

function TripDetails() {
  return (
    <div className="trip-details">
      <h2>Trip Details</h2>
      <p>Here you can view and update the details of your trips.</p>
      <div className="trip-details-list">
        <div className="trip-card">
          <h3>Trip 1</h3>
          <p>Route: Main Campus to City Center</p>
          <p>Time: 8:00 AM - 9:00 AM</p>
          <p>Status: Completed</p>
        </div>
        <div className="trip-card">
          <h3>Trip 2</h3>
          <p>Route: City Center to Main Campus</p>
          <p>Time: 4:00 PM - 5:00 PM</p>
          <p>Status: Ongoing</p>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;