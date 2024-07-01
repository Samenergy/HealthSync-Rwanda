import React from 'react';
import DashNavbar from './DashNavbar';
import DashbarHor from './DashbarHor';
import PatientInfo from './Patientinfo';
const patient = {
  name: 'John Doe',
  dob: '1980-01-01',
  gender: 'Male',
  contact: '123-456-7890',
  emergencyContact: 'Jane Doe - 098-765-4321',
  medicalHistory: 'Diabetes, Hypertension',
  medications: 'Metformin, Lisinopril',
  allergies: 'Penicillin',
  immunizations: 'COVID-19, Influenza',
  currentHealthConditions: 'Stable',
  labResults: 'Normal',
  treatmentPlans: 'Continue current medication',
  insurance: 'ABC Insurance',
  socialHistory: 'Non-smoker, occasional alcohol',
  consentForms: 'Signed',
};
const Patientdata = () => {
  return (
    <div className="flex">
      <DashNavbar />
      <div>
        <DashbarHor />
        <div className="bg-[#DDF4FC] py-5 px-20 min-h-screen">
          <h1 className="font-bold text-4xl">Patient - John Doe</h1>
          <PatientInfo patient={patient} />
        </div>
      </div>
    </div>
  );
};

export default Patientdata;
