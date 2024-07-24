import React, { useState } from "react";

function AppointmentTable() {
  const [appointments] = useState([
    {
      patientName: "John Doe",
      type: "Consultation",
      appointmentDate: "04/05/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "John Doe",
      type: "Consultation",
      appointmentDate: "04/05/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "John Doe",
      type: "Consultation",
      appointmentDate: "04/05/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "John Doe",
      type: "Consultation",
      appointmentDate: "04/05/2024",
      account: "2550",
      status: "Not Seen",
    },
  ]);

  return (
    <div className=" w-[450px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h1 className="text-[15px] font-bold">Appointments</h1>
        <div>
          <a href="">
            <button className="bg-[#00afee] w-[100px] text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded">
              Browse All
            </button>
          </a>
        </div>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] ">
            <th>Patient Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Account</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={index}
              className={`text-[11px] font-bold h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]  " : ""
              }`}
            >
              <td>{appointment.patientName}</td>
              <td>{appointment.type}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.account}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
