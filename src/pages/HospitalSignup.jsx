import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HospitalSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    try {
      const response = await axios.post('http://localhost:8080/signup', {
        firstName,
        lastName,
        hospitalName,
        email,
        password,
        confirmPassword,
      });

      console.log('Signup successful:', response.data);
      alert('Signup successful!');
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || 'Unknown error');
      setErrorMessage(error.response?.data?.message || 'Signup failed: Unknown error');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-start px-6 py-56 lg:py-24 lg:px-8 bg-[#011c36]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <img
            className="mx-auto h-auto w-auto"
            src="./src/assets/logo.png"
            alt="Logo"
          />
        </a>
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white">
          Create an account
        </h2>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-black" 
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1 text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mb-4 mt-4">
          <label htmlFor="hospitalName" className="block mb-1 text-white">
            Hospital Name
          </label>
          <input
            type="text"
            id="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-white">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 text-white">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <Link to="/login">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-[#00aeef] font-bold px-4 py-2 rounded-md mt-5 sm:mx-auto sm:w-full sm:max-w-sm text-white transition hover:bg-blue-500"
        >
          Create Account
        </button>
        </Link>
      </form>
    </div>
  );
};

export default HospitalSignup;
