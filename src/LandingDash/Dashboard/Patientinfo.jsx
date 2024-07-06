import React from "react";
const PatientInfo = ({ patient }) => {
  return (
    <div className="max-w-md h-fit  bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center gap-5">
          <div className="mb-4">
            <img
              src={patient.image}
              alt={`${patient.name}'s profile`}
              className="w-24 h-auto rounded-full "
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
            <td className="font-bold">Gender</td>
            <td className="font-semibold pl-10 ">{patient.gender}</td>
          </tr>
          <tr>
            <td className="font-bold">Date of Birth</td>
            <td className="font-semibold pl-10 ">{patient.dob}</td>
          </tr>
          <tr>
            <td className="font-bold">Age</td>
            <td  className="font-semibold pl-10 ">{patient.age}</td>
          </tr>

          <tr>
            <td className="font-bold">Height</td>
            <td className="font-semibold pl-10 ">{patient.height}</td>
          </tr>
          <tr>
            <td className="font-bold">Weight</td>
            <td className="font-semibold pl-10 ">{patient.weight}</td>
          </tr>
          <tr>
            <td className="font-bold">BMI</td>
            <td className="font-semibold pl-10 ">{patient.bmi}</td>
          </tr>
          <tr>
            <td className="font-bold">Blood Pressure</td>
            <td className="font-semibold pl-10 ">{patient.bloodPressure}</td>
          </tr>
          <tr>
            <td className="font-bold">Contact</td>
            <td className="font-semibold pl-10 ">{patient.contact}</td>
          </tr>

          <tr>
            <td className="font-bold">Allergies</td>
            <td className="font-semibold pl-10 ">{patient.allergies}</td>
          </tr>
          <tr>
            <td className="font-bold">Immunizations</td>
            <td className="font-semibold pl-10 ">{patient.immunizations}</td>
          </tr>

          <tr>
            <td className="font-bold">Insurance</td>
            <td className="font-semibold pl-10 ">{patient.insurance}</td>
          </tr>
          <tr>
            <td className="font-bold">Social History</td>
            <td className="font-semibold pl-10 ">{patient.socialHistory}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PatientInfo;
