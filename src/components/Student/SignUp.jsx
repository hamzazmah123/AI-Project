import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Student.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    address: "",
    phone: "",
    cnic: "",
    class: "",
    section: "",
    universityID: "",
    pickDropTimings: "",
    startLocation: "",
    endLocation: "",
  });

  const [locations, setLocations] = useState([]); // To store distinct locations
  const [routes, setRoutes] = useState([]); // To store multiple routes (shortest and alternatives)
  const [showDialog, setShowDialog] = useState(false); // Dialog visibility state

  // Fetch distinct locations for dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/routes/distinct-routes"
        );
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save student data to the database
      await axios.post("http://localhost:5000/auth/students", {
        ...formData,
      });

      console.log("Student data saved successfully.");

      // Fetch routes based on selected start and end locations
      const { data } = await axios.post("http://localhost:5000/routes/filter", {
        start_location: formData.startLocation,
        end_location: formData.endLocation,
      });

      // Check if routes are available
      if (data.routes.length > 0) {
        console.log('data: ', data);
        setRoutes(data.routes); // Set multiple route options (shortest + alternatives)
        setShowDialog(true); // Show the dialog with the route options
      } else {
        console.log("data:in else ", data);

        setRoutes(["No route found"]);
        setShowDialog(true); // Show dialog indicating no route found
      }

      // Reset form
      setFormData({
        name: "",
        fatherName: "",
        address: "",
        phone: "",
        cnic: "",
        class: "",
        section: "",
        universityID: "",
        pickDropTimings: "",
        startLocation: "",
        endLocation: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="student-form-container">
      <h2>Student Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cnic"
          placeholder="CNIC"
          value={formData.cnic}
          onChange={handleChange}
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
        />
        <input
          type="text"
          name="universityID"
          placeholder="University ID"
          value={formData.universityID}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pickDropTimings"
          placeholder="Pick/Drop Timings"
          value={formData.pickDropTimings}
          onChange={handleChange}
        />

        <select
          name="startLocation"
          value={formData.startLocation}
          onChange={handleChange}
        >
          <option value="">Select Start Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select
          name="endLocation"
          value={formData.endLocation}
          onChange={handleChange}
        >
          <option value="">Select Destination</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <button type="submit">Sign Up</button>
      </form>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>Prediction Result</h3>
            <p>
              <strong>Routes:</strong>
            </p>
            {routes.length > 0 ? (
              routes.map((route, index) => (
                <p key={index}>
                  <strong>
                    {index === 0
                      ? "Shortest Route:"
                      : `Alternative Route ${index + 1}:`}
                  </strong>{" "}
                  {route.path.join(" → ")} via [
                  {route.via ? route.via : "No intermediate stops"}] (Distance:{" "}
                  {route.distance} km)
                </p>
              ))
            ) : (
              <p>No routes found.</p>
            )}
            <button onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
