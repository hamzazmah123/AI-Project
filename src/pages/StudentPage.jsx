import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../components/Student/Dashboard";
import SignUp from "../components/Student/SignUp";
import Profile from "../components/Student/Profile";

function StudentPage() {
  return (
    <div className="student-page">
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default StudentPage;