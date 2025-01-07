import React, { useState } from "react";
import "./Admin.css";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ name: "", type: "", capacity: "" });

  const handleAddVehicle = () => {
    if (newVehicle.name && newVehicle.type && newVehicle.capacity) {
      setVehicles([...vehicles, newVehicle]);
      setNewVehicle({ name: "", type: "", capacity: "" });
    }
  };

  return (
    <div className="admin-section">
      <h2>Vehicle Management</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Vehicle Name"
          value={newVehicle.name}
          onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vehicle Type"
          value={newVehicle.type}
          onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newVehicle.capacity}
          onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
        />
        <button onClick={handleAddVehicle}>Add Vehicle</button>
      </div>

      <div className="list">
        <h3>Vehicle List</h3>
        {vehicles.length ? (
          <ul>
            {vehicles.map((vehicle, index) => (
              <li key={index}>
                {vehicle.name} - {vehicle.type} - {vehicle.capacity} seats
              </li>
            ))}
          </ul>
        ) : (
          <p>No vehicles added yet.</p>
        )}
      </div>
    </div>
  );
}

export default VehicleManagement;