import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RxMixerVertical } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";

function Receptionpatienttable() {
  const [LabExams] = useState([
    {
      Name: "John Doe",
      Gender: "Male",
      DateofBirth: "04/05/2004",
      PhoneNumber: "0712312356",
    },
  ]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedAssurance, setSelectedAssurance] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    patientName: "",
    appointmentDate: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    // Implement your search functionality here
  };

  const handleAddAppointmentClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    // Perform password verification logic
    // For simplicity, I'm just setting it to true if password is not empty
    if (password.trim() !== "") {
      setShowPasswordModal(false);
      setShowAppointmentModal(true);
    }
  };

  const handleAppointmentSubmit = () => {
    // Implement appointment submission logic here
    // You can add the appointment to a list or send it to a backend server
    const newAppointment = {
      patientName: patientInfo.patientName,
      doctor: selectedDoctor,
      assurance: selectedAssurance,
      appointmentDate: patientInfo.appointmentDate,
      // Add more fields as needed
    };
    console.log("New Appointment:", newAppointment);
    // Reset state variables
    setSelectedDoctor("");
    setSelectedAssurance("");
    setPatientInfo({
      patientName: "",
      appointmentDate: "",
    });
    setShowAppointmentModal(false);
  };

  return (
    <div className="w-[970px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-6 py-5">
      {showPasswordModal && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2>Enter Password:</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-2"
            />
            <button className="bg-[#00afee] w-[100px] text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded" onClick={handlePasswordSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      {showAppointmentModal && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2>Select Doctor:</h2>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="border rounded border-red-950 -md p-2"
            >
              <option value="">Select Doctor</option>
              <option value="">Neurologist</option>
              <option value="">Pediatricians</option>
              <option value="">Dermatologist</option>
              <option value="">Cardiologist</option>
            </select>

            <h2>Select Assurance:</h2>
            <select
              value={selectedAssurance}
              onChange={(e) => setSelectedAssurance(e.target.value)}
              className="border border-red-950 rounded-md p-2 "
            >
              <option value="">Select Assurance</option>
              <option value="">UAP</option>
              <option value="">RADIANT</option>
              <option value="">SANLAM</option>
            </select>

            {/* Add more input fields for patient information */}

            <button
              className="bg-[#00afee] ml-5  w-[150px] text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded"
              onClick={handleAppointmentSubmit}
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-8">
        <div className="flex justify-between items-center  w-28 border border-black rounded-md px-2 py-1 mb-5">
          <RxMixerVertical />
          <h1>Filter by...</h1>
        </div>
        <div className="-mt-5 flex items-center ">
          <input
            type="text"
            placeholder="Search all patients.."
            onChange={handleChange}
            className="px- py-1 pl-8 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-[00afee] focus:border-[#00afee] "
          />
          <button onClick={handleAddAppointmentClick}>
            <IoSearch className="-ml-[205px]  text-xl " />
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
          {LabExams.map((exam, index) => (
            <tr
              key={index}
              className={`text-[11px]  h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]  " : ""
              }`}
            >
              <td>{index + 1}</td>
              <td>{exam.Name}</td>
              <td>{exam.Gender}</td>
              <td>{exam.DateofBirth}</td>
              <td>{exam.PhoneNumber}</td>
              <td>
                <button
                  onClick={handleAddAppointmentClick}
                  className="bg-[#00afee] w-[100px] text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded"
                >
                  Add Patient
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
