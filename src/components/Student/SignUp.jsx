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
    endLocation: "IQRA Gulshan Campus", // Fixed default value
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
        end_location: formData.endLocation, // Ensure endLocation is included here
      });

      // Check if routes exist and handle response
      if (data && data.routes && data.routes.length > 0) {
        setRoutes(data.routes); // Set multiple route options (shortest + alternatives)
        setShowDialog(true); // Show the dialog with the route options
      } else {
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
        endLocation: "IQRA Gulshan Campus", // Reset to default fixed value
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

        <input
          type="text"
          name="endLocation"
          value={formData.endLocation}
          readOnly
          placeholder="Destination"
          className="fixed-end-location"
        />

        <button type="submit">Sign Up</button>
      </form>
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            {routes.length > 0 ? (
              <div>
                <p>
                  <strong>Routes:</strong>
                </p>
                {routes.map((route, index) => (
                  <div key={index}>
                    <p>
                      <strong>
                        {index === 0
                          ? "Shortest Route:"
                          : `Alternative Route ${index + 1}:`}
                      </strong>{" "}
                      {route.path.join(" → ")} via [
                      {route.via ? route.via : "No intermediate stops"}]
                      (Distance: {route.distance} km)
                    </p>
                    <p>
                      <strong>Single Trip Fee:</strong> {route.fee} (Rs)
                    </p>
                    <p>
                      <strong>Monthly Fee:</strong> {route.fee * 20} (For 20
                      days)
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No routes found.</p>
            )}

            <h3>Prediction Result</h3>
            <button onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
