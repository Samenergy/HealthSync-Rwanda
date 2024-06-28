import React, { useState } from "react";

const AddUserForm = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    specialization: "", // For Doctor
    // Add other role-specific fields here if needed
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, specialization: "" }); // Reset role-specific fields
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <select
          name="role"
          value={role}
          onChange={handleRoleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select Role</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Cashier">Cashier</option>
        </select>
      </div>
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

      {role === "Doctor" && (
        <div className="mb-4">
          <label className="block text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      )}

      {role === "Nurse" && (
        <div className="mb-4">
          <label className="block text-gray-700">Field</label>
          <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
