import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";

function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctorId, setDoctorId] = useState(null); // To store doctorId

  useEffect(() => {
    const fetchUserAndPatients = async () => {
      setLoading(true);
      
      const token = localStorage.getItem("token");

      try {
        const userResponse = await fetch("http://localhost:5000/api/user/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        const userId = userData.user.id;

        
        const patientsResponse = await fetch(
          `http://localhost:5000/api/queue/doctor/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!patientsResponse.ok) {
          throw new Error("Failed to fetch patients data");
        }

        const patientsData = await patientsResponse.json();
        setPatients(patientsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPatients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[970px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h2 className="text-xl font-bold">Patient Queue</h2>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>No</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={patient.id}
              className={`text-[11px]  h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]  " : ""
              }`}
            >
              <td>{index + 1}</td>
              <td>{patient.Patient.name}</td>
              <td>{patient.Patient.gender}</td>
              <td>{new Date(patient.Patient.dob).toLocaleDateString()}</td>
              <td>{patient.Patient.contact}</td>
              <td>
                <a href={`/patientinfo/${patient.Patient.id}`}>
                  <button className="text-center pl-2 text-lg hover:text-[#00afee] ">
                    <FaEye />
                  </button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;
