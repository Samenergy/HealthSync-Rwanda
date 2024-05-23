import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
function Users() {
 const [data,setData] = useState([])
  useEffect(() =>{
    const getAlluser = async() =>{
      try {
        const response = await axios.get('http://localhost:8080/all')
        console.log(response.data.users)

        setData(response.data.users)
      } catch (error) {
        console.error(error);
      }
    }
    getAlluser()
  },[])

  const [LabExams] = useState([
    {
      Name: "John Doe",
      Role: "Doctor",
      email: "email@gmail.com",
    },
    {
      Name: "John Doe",
      Role: "Doctor",
      email: "email@gmail.com",
    },
    {
      Name: "John Doe",
      Role: "Doctor",
      email: "email@gmail.com",
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
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((exam, index) => (
            <tr
              key={index}
              className={`text-[11px]  h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]  " : ""
              }`}
            >
              <td>{index + 1}</td> {/* Display index starting from 1 */}
              <td>{exam.fullName}</td>
              <td>{exam.role}</td>
              <td>{exam.email}</td>
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

export default Users;

