import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
function AppointmentTable() {
  const appointments = [
    {
      patientName: "John Doe",
      type: "Consultation",
      appointmentDate: "04/04/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "Jeffery Carter",
      type: "Consultation",
      appointmentDate: "04/05/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "Leo Roberson",
      type: "Consultation",
      appointmentDate: "04/06/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "Christina Walsh",
      type: "Consultation",
      appointmentDate: "04/07/2024",
      account: "2550",
      status: "Not Seen",
    },
  ];

  return (
    <div className="max-w-md bg-gradient-to-r from-blue-900 to-blue-500 text-white px-5 py-5 shadow-xl rounded-lg mt-5">
      <div className="flex flex-col ">
        <div className="">
          <h1 className="text-lg font-bold">Appointments</h1>
        </div>
        <div className="flex items-center">
          <FaRegCalendarCheck className="text-3xl " />
          <div className="text-4xl font-bold mb-3">{appointments.length}</div>
        </div>
        <div className="text-sm mb-3">21% Higher Than Last Month</div>
      </div>
    </div>
  );
}

export default AppointmentTable;
