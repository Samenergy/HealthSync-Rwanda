import React, { useState } from "react";
import DashNavbar from "./DashNavbar";
import PatientInfo from "./Patientinfo";
import Quickaction from "./Quickaction";
import VisitsSection from "./VisitCard";

const patient = {
  name: "John Doe",
  dob: "01/10/1980",
  age: 44,
  gender: "Male",
  height: "180 cm",
  weight: "75 kg",
  bloodtype: "A+",
  bmi: "23.1",
  bloodPressure: "120/80 mmHg",
  contact: "123-456-7890",
  emergencyContact: "Jane Doe - 098-765-4321",
  medicalHistory: "Diabetes, Hypertension",
  medications: "Metformin, Lisinopril",
  allergies: "Penicillin",
  immunizations: "COVID-19, Influenza",
  currentHealthConditions: "Stable",
  labResults: "Normal",
  treatmentPlans: "Continue current medication",
  insurance: "ABC Insurance",
  socialHistory: "Non-smoker, occasional alcohol",
  consentForms: "Signed",
  image:
    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

const Patientdata = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <DashNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex-1 ml-${
          sidebarOpen ? "52" : "1/6"
        } p-6 pt-20 transition-all duration-500`}
      >
        <h1 className="font-bold text-4xl mb-6">Patient Info </h1>
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
