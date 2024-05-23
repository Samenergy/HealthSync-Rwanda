import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
function Patientlist() {
  const [LabExams] = useState([
    {
      patientName: "John Doe",
      Gender: "Male",
      DateofBirth: "04/05/2004",
      PhoneNumber: "0712312356",
    },
    {
      patientName: "John Doe",
      Gender: "Male",
      DateofBirth: "04/05/2004",
      PhoneNumber: "0712312356",
    },
    {
      patientName: "John Doe",
      Gender: "Male",
      DateofBirth: "04/05/2004",
      PhoneNumber: "0712312356",
    },
  ]);

  const handleDelete = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((app) => app.id !== appointmentId));
    }
  };

  return (
    <div className="w-[970px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3"></div>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>No</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {LabExams.map((exam, index) => (
            <tr
              key={index}
              className={`text-[11px]  h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]  " : ""
              }`}
            >
              <td>{index + 1}</td> {/* Display index starting from 1 */}
              <td>{exam.patientName}</td>
              <td>{exam.Gender}</td>
              <td>{exam.DateofBirth}</td>
              <td>{exam.PhoneNumber}</td>
              <td>
                <button
                  className="text-[20px] "
                  onClick={() => handleDelete(appointment.id)}
                >
                  <MdDelete className="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patientlist;
