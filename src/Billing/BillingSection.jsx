import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import ServiceDetailsModal from "./ServiceDetailsModal";

function BillingSection() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserAndPatients = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      try {
        // Fetch user data
        const userResponse = await fetch(
          "https://healthsync.up.railway.app/api/user/data",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        const hospitalId = userData.hospital.id;

        // Fetch patients data based on hospital ID
        const patientsResponse = await fetch(
          `https://healthsync.up.railway.app/api/queue/in-progress/${hospitalId}`,
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

  const handleEyeClick = (patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
    setModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (patients.length === 0) return <p>No patients found.</p>;

  return (
    <div className="w-[970px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h2 className="text-xl font-bold">Billing Queue</h2>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>No</th>
            <th>Patient Name</th>
            <th>Assurance</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={patient.id}
              className={`text-[11px] h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]" : ""
              }`}
            >
              <td>{index + 1}</td>
              <td>{patient.Patient.name}</td>
              <td>{patient.assurance}</td>
              <td>{patient.Patient.contact}</td>
              <td>
                <button
                  onClick={() => handleEyeClick(patient)}
                  className="text-center pl-2 text-lg hover:text-[#00afee]"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPatient && (
        <ServiceDetailsModal
          patient={selectedPatient.Patient}
          services={selectedPatient.services}
          queueId={selectedPatient.id} // Pass the queueId
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default BillingSection;
