// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import StudentPage from "./pages/StudentPage";
// import DriverPage from "./pages/DriverPage";
// import HomePage from "./pages/HomePage";
// import Navbar from "./components/Common/Navbar.jsx";
// import Footer from "./components/Common/Footer.jsx";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/admin/*" element={<AdminPage />} /> {/* Note the '/*' for nested routes */}
//         <Route path="/student/*" element={<StudentPage />} />
//         <Route path="/driver/*" element={<DriverPage />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Common/Login";
import Signup from "./components/Common/Signup";
import AdminDashboard from "./components/Admin/Dashboard";
import VehicleManagement from "./components/Admin/VehicleManagement";
import RouteManagement from "./components/Admin/RouteManagement";
import FeeManagement from "./components/Admin/FeeManagement";
import StudentDashboard from "./components/Student/Dashboard";
import StudentProfile from "./components/Student/Profile";
import StudentSignup from "./components/Student/SignUp";
import DriverDashboard from "./components/Driver/Dashboard";
import TripDetails from "./components/Driver/TripDetails";
import "./App.css"; // Optional for app-wide styling

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vehicle-management" element={<VehicleManagement />} />
        <Route path="/admin/route-management" element={<RouteManagement />} />
        <Route path="/admin/fee-management" element={<FeeManagement />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/signup" element={<StudentSignup />} />

        {/* Driver Routes */}
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/trip-details" element={<TripDetails />} />

        {/* Fallback Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
