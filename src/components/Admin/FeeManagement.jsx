import React, { useState } from "react";
import "./Admin.css";

function FeeManagement() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", id: "", fee: "" });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.id && newStudent.fee) {
      setStudents([...students, newStudent]);
      setNewStudent({ name: "", id: "", fee: "" });
    }
  };

  return (
    <div className="admin-section">
      <h2>Fee Management</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={newStudent.id}
          onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fee Amount"
          value={newStudent.fee}
          onChange={(e) => setNewStudent({ ...newStudent, fee: e.target.value })}
        />
        <button onClick={handleAddStudent}>Add Fee</button>
      </div>

      <div className="list">
        <h3>Fee Records</h3>
        {students.length ? (
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.name} (ID: {student.id}) - ${student.fee}
              </li>
            ))}
          </ul>
        ) : (
          <p>No fee records yet.</p>
        )}
      </div>
    </div>
  );
}

export default FeeManagement;