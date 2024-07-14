import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddUserForm = () => {
  const [role, setRole] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    field: "",
    responsibilities: "",
    password: "",
  });

  const fields = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Oncology",
    "Orthopedics",
    "Emergency Medicine",
    "Gynecology",
    "Surgery",
    "General Medicine",
  ];

  const responsibilities = [
    "Patient Intake",
    "Appointment Scheduling",
    "Medical Records Management",
    "Insurance Verification",
    "Billing and Payments",
    "Customer Service",
    "Administrative Support",
    "Office Management",
  ];

  const specializations = [
    "General Medicine",
    "Internal Medicine",
    "Surgery",
    "Pediatrics",
    "Gynecology",
    "Orthopedics",
    "Neurology",
    "Cardiology",
    "Oncology",
    "Emergency Medicine",
  ];

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({
      ...formData,
      specialization: "",
      field: "",
      responsibilities: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "No Token Found",
          text: "Please log in.",
        });
        return;
      }

      const userCheckResponse = await fetch(
        "http://localhost:5000/api/admin/check-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (!userCheckResponse.ok) {
        throw new Error(`HTTP error! status: ${userCheckResponse.status}`);
      }

      const userCheckData = await userCheckResponse.json();
      if (userCheckData.exists) {
        Swal.fire({
          icon: "error",
          title: "User Exists",
          text: "A user with this email already exists.",
        });
        return;
      }

      const response = await fetch("http://localhost:5000/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, role, hospitalId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "User Added",
        text: `User ${formData.name} was added successfully.`,
      });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        specialization: "",
        field: "",
        responsibilities: "",
        password: "",
      });
      setRole("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    const fetchHospitalId = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          setHospitalId(decodedToken.hospitalId);
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
    };
    fetchHospitalId();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <div className="flex gap-5">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="Administrator">Administrator</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Cashier">Cashier</option>
            <option value="Patient">Patient</option>
          </select>
        </div>
        {role === "Doctor" && (
          <div className="mb-4">
            <label className="block text-gray-700">Specialization</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        )}
        {role === "Nurse" && (
          <div className="mb-4">
            <label className="block text-gray-700">Field</label>
            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Field</option>
              {fields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        )}
        {(role === "Receptionist" || role === "Cashier") && (
          <div className="mb-4">
            <label className="block text-gray-700">Responsibilities</label>
            <select
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Responsibilities</option>
              {responsibilities.map((responsibility) => (
                <option key={responsibility} value={responsibility}>
                  {responsibility}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <input type="hidden" name="hospitalId" value={hospitalId} />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
