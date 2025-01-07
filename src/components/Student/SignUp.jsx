import React, { useState } from "react";
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
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
    });
  };

  return (
    <div className="student-form-container">
      <h2>Student Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} />
        <input type="text" name="class" placeholder="Class" value={formData.class} onChange={handleChange} />
        <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} />
        <input type="text" name="universityID" placeholder="University ID" value={formData.universityID} onChange={handleChange} />
        <input type="text" name="pickDropTimings" placeholder="Pick/Drop Timings" value={formData.pickDropTimings} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
