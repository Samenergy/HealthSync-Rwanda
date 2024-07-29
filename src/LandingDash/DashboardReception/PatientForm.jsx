import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const PatientForm = ({ onClose }) => {
  const [patientData, setPatientData] = useState({
    name: "",
    dob: "",
    gender: "",
    bloodtype: "",
    contact: "",
    emergencyContact: "",
    allergies: "",
    insurance: "",
    email: "",
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    // Set the token from local storage when the component mounts
    setToken(localStorage.getItem("token") || "");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "dob" && { age: calculateAge(value) }), // Handle age calculation if needed
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPatient(patientData);
      Swal.fire({
        icon: "success",
        title: "Patient Added",
        text: "The patient has been added successfully!",
      });
      onClose(); // Close the form/modal
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "An error occurred while adding the patient.",
      });
    }
  };

  const addPatient = async (patientData) => {
    const API_URL = "https://healthsync.up.railway.app/api/user/patients";
    try {
      const response = await axios.post(API_URL, patientData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding patient:", error);
      throw error;
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Patient Registration Form</h2>
      <div>
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={patientData.dob}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Gender:</label>
        <select
          name="gender"
          value={patientData.gender}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Blood Type:</label>
        <input
          type="text"
          name="bloodtype"
          value={patientData.bloodtype}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label className="block text-gray-700">Contact:</label>
        <input
          type="text"
          name="contact"
          value={patientData.contact}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label className="block text-gray-700">Emergency Contact:</label>
        <input
          type="text"
          name="emergencyContact"
          value={patientData.emergencyContact}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label className="block text-gray-700">Allergies:</label>
        <input
          type="text"
          name="allergies"
          value={patientData.allergies}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label className="block text-gray-700">Insurance:</label>
        <input
          type="text"
          name="insurance"
          value={patientData.insurance}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={patientData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
