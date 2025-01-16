import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

function DriverAssign() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [assignments, setAssignments] = useState([]); // To store assigned driver-vehicle pairs

  const fetchVehicles = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/vehicles");
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/auth/drivers");
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const handleAssign = async () => {
    if (selectedVehicle && selectedDriver) {
      try {
        // Assigning driver to vehicle (add API call here if needed)
        const assignment = {
          vehicle: vehicles.find((v) => v.name === selectedVehicle),
          driver: drivers.find((d) => d.name === selectedDriver),
        };
        setAssignments([...assignments, assignment]);

        alert(`Assigned ${selectedDriver} to ${selectedVehicle}`);
        setSelectedVehicle("");
        setSelectedDriver("");
      } catch (error) {
        console.error("Error assigning driver:", error);
        alert("Failed to assign driver.");
      }
    } else {
      alert("Please select both a vehicle and a driver.");
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
  }, []);

  return (
    <div className="admin-section">
      <h2>Driver Assignment</h2>
      <div className="form">
        <div className="dropdown">
          <label htmlFor="vehicle-select">Select Vehicle:</label>
          <select
            id="vehicle-select"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="">--Select Vehicle--</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.name}>
                {vehicle.name} - {vehicle.type}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="driver-select">Select Driver:</label>
          <select
            id="driver-select"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">--Select Driver--</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver.name}>
                {driver.name} - {driver.email}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleAssign}>Assign Driver</button>
      </div>

      <div className="list">
        <h3>Assignments</h3>
        {assignments.length ? (
          <ul>
            {assignments.map((assignment, index) => (
              <li key={index}>
                {assignment.driver.name} ({assignment.driver.email}) →{" "}
                {assignment.vehicle.name} ({assignment.vehicle.type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments yet.</p>
        )}
      </div>
    </div>
  );
}

export default DriverAssign;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Admin.css";

// function DriverAssign() {
//   const [vehicles, setVehicles] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [selectedVehicle, setSelectedVehicle] = useState("");
//   const [selectedDriver, setSelectedDriver] = useState("");

//   const fetchVehicles = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/vehicles");
//       setVehicles(data);
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }
//   };

//   const fetchDrivers = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/drivers");
//       setDrivers(data);
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//     }
//   };

//   const handleAssign = () => {
//     if (selectedVehicle && selectedDriver) {
//       alert(`Assigned ${selectedDriver} to ${selectedVehicle}`);
//       // TODO: Call the backend API to assign the driver to the vehicle
//     } else {
//       alert("Please select both a vehicle and a driver.");
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//     fetchDrivers();
//   }, []);

//   return (
//     <div className="admin-section">
//       <h2>Driver Assignment</h2>
//       <div className="form">
//         <div className="dropdown">
//           <label htmlFor="vehicle-select">Select Vehicle:</label>
//           <select
//             id="vehicle-select"
//             value={selectedVehicle}
//             onChange={(e) => setSelectedVehicle(e.target.value)}
//           >
//             <option value="">--Select Vehicle--</option>
//             {vehicles.map((vehicle) => (
//               <option key={vehicle._id} value={vehicle.name}>
//                 {vehicle.name} - {vehicle.type}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="dropdown">
//           <label htmlFor="driver-select">Select Driver:</label>
//           <select
//             id="driver-select"
//             value={selectedDriver}
//             onChange={(e) => setSelectedDriver(e.target.value)}
//           >
//             <option value="">--Select Driver--</option>
//             {drivers.map((driver) => (
//               <option key={driver._id} value={driver.name}>
//                 {driver.name} - {driver.email}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button onClick={handleAssign}>Assign Driver</button>
//       </div>
//     </div>
//   );
// }

// export default DriverAssign;
