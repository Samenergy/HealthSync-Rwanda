import React from "react";

const PatientInfo = ({ patient }) => {
  return (
    <div className="max-w-md  bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center gap-5">
          <div className="mb-4">
            <img
              src={patient.image}
              alt={`${patient.name}'s profile`}
              className="w-32 h-auto rounded-full mx-auto"
            />
          </div>
          <div>
            <p className="text-gray-700  text-3xl">{patient.name}</p>
            <p className="text-orange-700 text-md">
              {patient.medicalHistory} Patient
            </p>
          </div>
        </div>
        <table className="text-gray-700 text-base">
          <tr>
            <td>Date of Birth:</td>
            <td>{patient.dob}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{patient.age}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{patient.gender}</td>
          </tr>
          <tr>
            <td>Height:</td>
            <td>{patient.height}</td>
          </tr>
          <tr>
            <td>Weight:</td>
            <td>{patient.weight}</td>
          </tr>
          <tr>
            <td>BMI:</td>
            <td>{patient.bmi}</td>
          </tr>
          <tr>
            <td>Blood Pressure:</td>
            <td>{patient.bloodPressure}</td>
          </tr>
          <tr>
            <td>Contact:</td>
            <td>{patient.contact}</td>
          </tr>

          <tr>
            <td>Allergies:</td>
            <td>{patient.allergies}</td>
          </tr>
          <tr>
            <td>Immunizations:</td>
            <td>{patient.immunizations}</td>
          </tr>

          <tr>
            <td>Insurance:</td>
            <td>{patient.insurance}</td>
          </tr>
          <tr>
            <td>Social History:</td>
            <td>{patient.socialHistory}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PatientInfo;
