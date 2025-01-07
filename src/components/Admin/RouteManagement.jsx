import React, { useState } from "react";
import "./Admin.css";

function RouteManagement() {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ start: "", end: "", distance: "" });

  const handleAddRoute = () => {
    if (newRoute.start && newRoute.end && newRoute.distance) {
      setRoutes([...routes, newRoute]);
      setNewRoute({ start: "", end: "", distance: "" });
    }
  };

  return (
    <div className="admin-section">
      <h2>Route Management</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Start Location"
          value={newRoute.start}
          onChange={(e) => setNewRoute({ ...newRoute, start: e.target.value })}
        />
        <input
          type="text"
          placeholder="End Location"
          value={newRoute.end}
          onChange={(e) => setNewRoute({ ...newRoute, end: e.target.value })}
        />
        <input
          type="number"
          placeholder="Distance (km)"
          value={newRoute.distance}
          onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
        />
        <button onClick={handleAddRoute}>Add Route</button>
      </div>

      <div className="list">
        <h3>Route List</h3>
        {routes.length ? (
          <ul>
            {routes.map((route, index) => (
              <li key={index}>
                {route.start} to {route.end} - {route.distance} km
              </li>
            ))}
          </ul>
        ) : (
          <p>No routes added yet.</p>
        )}
      </div>
    </div>
  );
}

export default RouteManagement;