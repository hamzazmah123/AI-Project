import React, { useState, useEffect } from "react";
import "./Admin.css";
import axios from "axios";

function RouteManagement() {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    start: "",
    end: "",
    distance: "",
    fare: "",
  });
  const baseURL = "http://localhost:5000/routes";

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get(baseURL);
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleAddRoute = async () => {
    if (newRoute.start && newRoute.end) {
      try {
        await axios.post(`${baseURL}/routes`, newRoute);
        // await axios.post(baseURL, newVehicle);
        setNewRoute({ start: "", end: "", fare: "", origin : '', destination: '' });
        fetchRoutes();
      } catch (error) {
        console.error("Error adding routes:", error);
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Fetch vehicles on component mount
  useEffect(() => {
    fetchRoutes();
  }, []);

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
          type="text"
          placeholder="Start Lat Long"
          value={newRoute.origin}
          onChange={(e) => setNewRoute({ ...newRoute, origin: e.target.value })}
        />
        <input
          type="text"
          placeholder="End Lat Long"
          value={newRoute.destination}
          onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fare of route"
          value={newRoute.fare}
          onChange={(e) => setNewRoute({ ...newRoute, fare: e.target.value })}
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
