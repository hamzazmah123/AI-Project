import React from "react";
import "./Student.css";

function Profile({ student }) {
  return (
    <div className="student-profile">
      <h2>Student Profile</h2>
      {/* <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Father's Name:</strong> {student.fatherName}</p>
      <p><strong>Address:</strong> {student.address}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>CNIC:</strong> {student.cnic}</p>
      <p><strong>Class:</strong> {student.class}</p>
      <p><strong>Section:</strong> {student.section}</p>
      <p><strong>Pick/Drop Timings:</strong> {student.pickDropTimings}</p> */}
    </div>
  );
}

export default Profile;