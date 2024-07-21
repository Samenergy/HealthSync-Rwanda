import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashNavbar from "./DashNavbar";
import PatientInfo from "./Patientinfo";
import Quickaction from "./Quickaction";
import VisitsSection from "./VisitCard";

const Patientdata = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatientById = async (id) => {
      console.log("Fetching patient with ID:", id); // Debugging log
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/patients/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch patient details");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging log
        setPatient(data); // Assuming data itself is the patient object
      } catch (error) {
        console.error("Error fetching patient data:", error); // Debugging log
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientById(patientId);
  }, [patientId, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <DashNavbar sidebarOpen={true} setSidebarOpen={() => {}} />
      <div className="flex-1 ml-52 p-6 pt-20 transition-all duration-500">
        <h1 className="font-bold text-4xl mb-6">Patient Info</h1>
        <div className="flex flex-col lg:flex-row justify-between gap-32 mb-6">
          <PatientInfo patient={patient} />
          <Quickaction />
        </div>
        <div>
          <VisitsSection />
        </div>
      </div>
    </div>
  );
};

export default Patientdata;
