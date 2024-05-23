import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

function Labtable() {
  const [LabExams] = useState([
    {
      patientName: "John Doe",
      type: "Testosteron",
      appointmentDate: "04/05/2024",
      account: "2550",
    },
    {
      patientName: "John Doe",
      type: "Testosteron",
      appointmentDate: "04/05/2024",
      account: "2550",
    },
    {
      patientName: "John Doe",
      type: "Testosteron",
      appointmentDate: "04/05/2024",
      account: "2550",
    },
    {
      patientName: "John Doe",
      type: "Testosteron",
      appointmentDate: "04/05/2024",
      account: "2550",
    },
  ]);

  return (
    <div className="w-[450px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h1 className="text-[15px] font-bold">Labs</h1>
        <div>
          <a href="">
            <button className="bg-[#00afee] w-[100px] text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded">
              View All
            </button>
          </a>
        </div>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>Patient Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Account</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {LabExams.map((exam, index) => (
            <tr
              key={index}
              className={`text-[11px] font-bold h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]  " : ""
              }`}
            >
              <td>{exam.patientName}</td>
              <td>{exam.type}</td>
              <td>{exam.appointmentDate}</td>
              <td>{exam.account}</td>
              <td>
                <a href="">
                  <button className="text-center pl-2 text-lg hover:text-[#00afee] ">
                    <FaEye />
                  </button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Labtable;
