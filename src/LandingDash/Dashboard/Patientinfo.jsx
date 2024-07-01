import React from 'react';

const PatientInfo = ({ patient }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Patient Information</div>
        <p className="text-gray-700 text-base">Name: {patient.name}</p>
        <p className="text-gray-700 text-base">Date of Birth: {patient.dob}</p>
        <p className="text-gray-700 text-base">Gender: {patient.gender}</p>
        <p className="text-gray-700 text-base">Contact: {patient.contact}</p>
        <p className="text-gray-700 text-base">Emergency Contact: {patient.emergencyContact}</p>
        <p className="text-gray-700 text-base">Medical History: {patient.medicalHistory}</p>
        <p className="text-gray-700 text-base">Medications: {patient.medications}</p>
        <p className="text-gray-700 text-base">Allergies: {patient.allergies}</p>
        <p className="text-gray-700 text-base">Immunizations: {patient.immunizations}</p>
        <p className="text-gray-700 text-base">Current Health Conditions: {patient.currentHealthConditions}</p>
        <p className="text-gray-700 text-base">Lab Results: {patient.labResults}</p>
        <p className="text-gray-700 text-base">Treatment Plans: {patient.treatmentPlans}</p>
        <p className="text-gray-700 text-base">Insurance: {patient.insurance}</p>
        <p className="text-gray-700 text-base">Social History: {patient.socialHistory}</p>
        <p className="text-gray-700 text-base">Consent Forms: {patient.consentForms}</p>
      </div>
    </div>
  );
};

export default PatientInfo;
