import React, { useState, useEffect, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";

function Receptionpatienttable() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedAssurance, setSelectedAssurance] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [hospitalId, setHospitalId] = useState(""); // Added state for hospitalId
  const modalRef = useRef(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      confirmButtonColor: "#00afee",
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      confirmButtonColor: "#00afee",
    });
  };

  const showInfoAlert = (message) => {
    Swal.fire({
      icon: "info",
      title: "Information",
      text: message,
      confirmButtonColor: "#00afee",
    });
  };

  // Fetch all patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/patients", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        showErrorAlert("Failed to fetch patients");
      }
    };
    fetchPatients();
  }, [token]); // Token as dependency to handle token change

  // Fetch hospital ID when the component mounts
  useEffect(() => {
    const fetchHospitalId = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/data", { // Updated endpoint for fetching hospital ID
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        const data = await response.json();
        setHospitalId(data.hospitalId); // Set the hospitalId from the response
      } catch (error) {
        showErrorAlert("Failed to fetch hospital details");
      }
    };

    fetchHospitalId();
  }, [token]); // Token as dependency to handle token change

  // Filter patients based on search term and gender
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = patients.filter((patient) => {
      const matchesSearch = patient.name
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const matchesGender = filterGender
        ? patient.gender === filterGender
        : true;
      return matchesSearch && matchesGender;
    });
    setFilteredPatients(filtered);
  }, [searchTerm, filterGender, patients]);

  // Fetch patient details when a patient is selected
  useEffect(() => {
    const fetchPatientById = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/patients/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        const data = await response.json();
        setSelectedPatient(data);
      } catch (error) {
        showErrorAlert("Failed to fetch patient details");
      }
    };

    if (selectedPatient?.id) {
      fetchPatientById(selectedPatient.id);
    }
  }, [selectedPatient, token]); // Correctly depend on selectedPatient

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterGender(e.target.value);
  };

  const handleAddAppointmentClick = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    showInfoAlert(
      `You are about to add ${patient.name} to the queue. Please enter your password.`
    );
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (password.trim() !== "") {
      setShowPasswordModal(false);
      setShowAppointmentModal(true);
    } else {
      showErrorAlert("Password cannot be empty");
    }
  };

  const handleAddToQueue = async () => {
    if (!selectedDoctor || !selectedAssurance || !selectedPatient?.hospitalId) {
      showErrorAlert(
        "Please select doctor, assurance, and ensure the patient has a hospital ID"
      );
      return;
    }

    const queueData = {
      patientId: selectedPatient.id,
      doctor: selectedDoctor,
      assurance: selectedAssurance,
      hospitalId: hospitalId, // Use the fetched hospitalId
    };

    try {
      const response = await fetch("http://localhost:5000/api/queue/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
        body: JSON.stringify(queueData),
      });

      if (!response.ok) {
        throw new Error("Failed to add patient to the queue");
      }

      showSuccessAlert("Patient added to the queue");
      setSelectedDoctor("");
      setSelectedAssurance("");
      setShowAppointmentModal(false);
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  // Close modal when clicking outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowAppointmentModal(false);
    }
  };

  useEffect(() => {
    if (showAppointmentModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAppointmentModal]);

  return (
    <div className="w-[970px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-6 py-5 relative">
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[300px]">
            <h2>Enter Password:</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <button
              className="bg-[#00afee] w-full text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handlePasswordSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {showAppointmentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-md w-[400px] relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowAppointmentModal(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Add to Queue</h2>
            <p className="mb-4">Patient: {selectedPatient?.name}</p>

            <label className="block mt-4">
              <span>Select Doctor:</span>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="border border-red-950 rounded-md p-2 mt-1 w-full"
              >
                <option value="">Select Doctor</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Cardiologist">Cardiologist</option>
              </select>
            </label>

            <label className="block mt-4">
              <span>Select Assurance:</span>
              <select
                value={selectedAssurance}
                onChange={(e) => setSelectedAssurance(e.target.value)}
                className="border border-red-950 rounded-md p-2 mt-1 w-full"
              >
                <option value="">Select Assurance</option>
                <option value="UAP">UAP</option>
                <option value="RADIANT">RADIANT</option>
                <option value="SANLAM">SANLAM</option>
                <option value="BRITAM">BRITAM</option>
              </select>
            </label>

            <button
              className="bg-[#00afee] w-full text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleAddToQueue}
            >
              Add to Queue
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-8 p-5">
        <div className="-mt-5 flex items-center gap-3 ">
          <select
            value={filterGender}
            onChange={handleFilterChange}
            className="px-2 py-1 -ml-5 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-[00afee] focus:border-[#00afee]"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Search all patients..."
            onChange={handleChange}
            className="px-2 py-1 pl-8 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-[00afee] focus:border-[#00afee] ml-2"
          />
          <button>
            <IoSearch className="text-xl -ml-[230px]" />
          </button>
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>File Number</th>
            <th>Names</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr
              key={patient.id} // Use patient.id as the key
              className={`text-[11px]  h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]  " : ""
              }`}
            >
              <td>{index + 1}</td>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.dob}</td>
              <td>{patient.contact}</td>
              <td>
                <button
                  onClick={() => handleAddAppointmentClick(patient)}
                  className="bg-[#00afee] w-[100px] text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded"
                >
                  Add to Queue
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Receptionpatienttable;
