import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaSort } from "react-icons/fa";

function Patientlist() {
  const [LabExams] = useState([
    {
      patientName: "John Doe",
      Gender: "Male",
      DateofBirth: "04/05/2004",
      PhoneNumber: "0712312356",
      DoctorType: "Neurology",
    },
    {
      patientName: "Jane Smith",
      Gender: "Female",
      DateofBirth: "02/15/2002",
      PhoneNumber: "0723456789",
      DoctorType: "Pediatrician",
    },
    {
      patientName: "Alice Johnson",
      Gender: "Female",
      DateofBirth: "11/25/1998",
      PhoneNumber: "0734567890",
      DoctorType: "Cardiologist",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filterDoctorType, setFilterDoctorType] = useState("");

  const doctorTypes = Array.from(
    new Set(LabExams.map((exam) => exam.DoctorType))
  );

  const sortedAndFilteredLabExams = React.useMemo(() => {
    let sortableItems = [...LabExams];
    if (filterDoctorType) {
      sortableItems = sortableItems.filter(
        (item) => item.DoctorType === filterDoctorType
      );
    }
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [LabExams, sortConfig, filterDoctorType]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((app) => app.id !== appointmentId));
    }
  };

  return (
    <div className="w-[970px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h2 className="text-xl font-bold">Patient List</h2>
        <div className="flex items-center space-x-2">
          <span>Filter by Doctor:</span>
          <select
            className="border rounded p-1"
            onChange={(e) => setFilterDoctorType(e.target.value)}
            value={filterDoctorType}
          >
            <option value="">All</option>
            {doctorTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>No</th>
            <th>Patient Name </th>
            <th>Gender </th>
            <th>Date of Birth </th>
            <th>Phone Number </th>
            <th>Doctor Type </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredLabExams.map((exam, index) => (
            <tr
              key={index}
              className={`text-[11px] h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]" : ""
              }`}
            >
              <td>{index + 1}</td>
              <td>{exam.patientName}</td>
              <td>{exam.Gender}</td>
              <td>{exam.DateofBirth}</td>
              <td>{exam.PhoneNumber}</td>
              <td>{exam.DoctorType}</td>
              <td>
                <button
                  className="text-[20px]"
                  onClick={() => handleDelete(index)}
                >
                  <MdDelete />
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
