import React, { useState } from "react";

const SignupAdmin = ({ nextStep, setAdminData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      return;
    }
    setAdminData(formData); 
    nextStep(); 
  };

  return (
    <div className="bg-[#011e3c] ">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto px-20 p-8 bg-[#011e3c] mt-0 pb-20 shadow-lg shadow-[#00aeee] rounded-lg text-white"
      >
        <a href="/" className=" ">
          <img
            className="mx-auto py-5 h-auto w-auto"
            src="./src/assets/logo.png"
            alt="Logo"
          />
        </a>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create your account
        </h2>
        <h2 className="text-xl font-light mb-4 text-center">
          Please provide your account information
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-50">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SignupAdmin;
