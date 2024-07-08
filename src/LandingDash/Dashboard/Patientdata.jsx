import React from "react";
import DashNavbar from "./DashNavbar";
import DashbarHor from "./DashbarHor";
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
  bloodtype:"A+",
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
  return (
    <div className="flex">
      <DashNavbar />
      <div>
        <DashbarHor />
        <div className="bg-[#DDF4FC] py-5 px-20 min-h-screen grid grid-cols-2">
          <PatientInfo patient={patient} />
          <Quickaction/>
          <VisitsSection/>
        </div>
        
      </div>
    </div>
  );
};

export default Patientdata;
