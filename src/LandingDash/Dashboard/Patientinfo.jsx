import React from "react";

const PatientInfo = ({ patient }) => {
  if (!patient) return <p>Loading...</p>;

  return (
    <div className="max-w-md h-fit bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center gap-5">
          {/* Placeholder for patient's profile picture */}
          <div className="mb-4">
            <img
              src={patient.image || "default-profile.png"}
              alt={`${patient.name}'s profile`}
              className="w-24 h-auto rounded-full"
            />
          </div>
          <div>
            <p className="text-gray-700 text-3xl">{patient.name}</p>
            {/* You can add a subtitle or medical history here if available */}
            <p className="text-orange-700 text-md">Patient</p>
          </div>
        </div>
        <table className="text-gray-700 text-base">
          <tbody>
            <tr>
              <td className="font-bold">Gender</td>
              <td className="font-semibold pl-10">{patient.gender}</td>
            </tr>
            <tr>
              <td className="font-bold">Date of Birth</td>
              <td className="font-semibold pl-10">
                {new Date(patient.dob).toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td className="font-bold">Blood Type</td>
              <td className="font-semibold pl-10">{patient.bloodtype}</td>
            </tr>
            <tr>
              <td className="font-bold">Contact</td>
              <td className="font-semibold pl-10">{patient.contact}</td>
            </tr>
            <tr>
              <td className="font-bold">Emergency Contact</td>
              <td className="font-semibold pl-10">
                {patient.emergencyContact}
              </td>
            </tr>
            <tr>
              <td className="font-bold">Allergies</td>
              <td className="font-semibold pl-10">{patient.allergies}</td>
            </tr>
            {/* Add other fields if necessary */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientInfo;
