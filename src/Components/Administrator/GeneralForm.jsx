import React, { useState } from "react";
import axios from "axios";

export default function GeneralForm({ userType }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    else if (name === "emailAddress") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "role") setRole(value);
  };

  const generateLoginInfo = () => {
    const username = fullName.replace(/\s+/g, "").toLowerCase();
    const newPassword = Math.random().toString(36).slice(2);
    setLoginInfo({ username, password: newPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user", {
        fullName,
        email,
        role,
        password,
      });
      console.log("Response:", response.data); // Log the API response

      // Reset form data after successful submission
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("");
      setLoginInfo({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here, such as displaying an error message to the user
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border border-gray-300 rounded-md px-3 py-2 mb-3"
        />

        <label htmlFor="emailAddress" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border border-gray-300 rounded-md px-3 py-2 mb-3"
        />
        
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="border border-gray-300 rounded-md px-3 py-2 mb-3"
        />

        <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 mb-3"
        >
          <option value="">Select Role</option>
          <option value="Doctor">Doctor</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="button"
          onClick={generateLoginInfo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Generate Login Info
        </button>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
