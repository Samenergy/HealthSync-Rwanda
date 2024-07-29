import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import UserFilter from "./FilterAndSort";

const Users = () => {
  const [data, setData] = useState([
    {
      id: 1,
      Name: "Samuel Dushime",
      Role: "Administrator",
      email: "riral180@gmail.com",
      Speciality: "Administrator",
      PracticeTime: {
        Mon: "9 AM - 6 PM",
        Tue: "9 AM - 6 PM",
        Wed: "9 AM - 6 PM",
        Thu: "9 AM - 6 PM",
        Fri: "9 AM - 6 PM",
        Sat: "9 AM - 6 PM",
        Sun: "Off",
      },
    },
    {
      id: 2,
      Name: "Jean Claude Nshimiyimana",
      Role: "Doctor",
      email: "hahimo7243@modotso.com",
      Speciality: "Neurology",
      PracticeTime: {
        Mon: "9 AM - 5 PM",
        Tue: "9 AM - 5 PM",
        Wed: "Off",
        Thu: "9 AM - 5 PM",
        Fri: "9 AM - 5 PM",
        Sat: "Off",
        Sun: "Off",
      },
    },
    {
      id: 3,
      Name: "Serge Karenzi",
      Role: "Receptionists",
      email: "sdushime38@gmail.com",
      Speciality: "Office Managment",
      PracticeTime: {
        Mon: "8 AM - 4 PM",
        Tue: "8 AM - 4 PM",
        Wed: "8 AM - 4 PM",
        Thu: "8 AM - 4 PM",
        Fri: "8 AM - 4 PM",
        Sat: "Off",
        Sun: "Off",
      },
    },
    
  ]);

  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    role: "",
    email: "",
    speciality: "",
  });

  useEffect(() => {
    applyFilters();
  }, [filter]);

  const applyFilters = () => {
    let filteredUsers = data.filter((user) => {
      return (
        user.Name.toLowerCase().includes(filter.name.toLowerCase()) &&
        user.Role.toLowerCase().includes(filter.role.toLowerCase()) &&
        user.email.toLowerCase().includes(filter.email.toLowerCase()) &&
        user.Speciality.toLowerCase().includes(filter.speciality.toLowerCase())
      );
    });
    setFilteredData(filteredUsers);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/all");
        console.log(response.data.users);
        setData(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsers();
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setData(data.filter((user) => user.id !== userId));
    }
  };

  const handleDayClick = (user, day) => {
    setSelectedUser(user);
    setSelectedDay(day);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSelectedDay(null);
  };

  const handleView = (user) => {
    setViewUser(user);
  };

  const closeViewModal = () => {
    setViewUser(null);
  };

  const handleMessage = (user) => {
    alert(`Messaging ${user.Name}`);
  };

  const handleEdit = (user) => {
    alert(`Editing details for ${user.Name}`);
  };

  return (
    <div className="w-[970px] bg-white ml-20 px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3"></div>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Speciality</th>
            <th>Practice Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={user.id}
              className={`text-[11px] h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]" : ""
              }`}
            >
              <td>{index + 1}</td> {/* Display index starting from 1 */}
              <td>{user.Name}</td>
              <td>{user.Role}</td>
              <td>{user.email}</td>
              <td>{user.Speciality}</td>
              <td>
                {Object.entries(user.PracticeTime).map(([day, time]) => (
                  <span
                    key={day}
                    className={`mr-2 cursor-pointer ${
                      time !== "Off" ? "text-blue-500" : "text-gray-500"
                    }`}
                    onClick={() => time !== "Off" && handleDayClick(user, day)}
                  >
                    {day}
                  </span>
                ))}
              </td>
              <td>
                <button
                  className="text-[20px] mr-2 "
                  onClick={() => handleView(user)}
                >
                  <FaEye />
                </button>
                <button
                  className="text-[20px] mr-2"
                  onClick={() => handleMessage(user)}
                >
                  <IoIosMail />
                </button>
                <button
                  className="text-[20px] mr-2"
                  onClick={() => handleEdit(user)}
                >
                  <MdEdit />
                </button>
                <button
                  className="text-[20px]"
                  onClick={() => handleDelete(user.id)}
                >
                  <MdDelete className="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for showing practice time details */}
      {selectedUser && selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
            <p>
              <strong>{selectedUser.Name}</strong> works on{" "}
              <strong>{selectedDay}</strong> from{" "}
              <strong>{selectedUser.PracticeTime[selectedDay]}</strong>.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for viewing user details */}
      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {viewUser.Name}
            </p>
            <p>
              <strong>Role:</strong> {viewUser.Role}
            </p>
            <p>
              <strong>Email:</strong> {viewUser.email}
            </p>
            <p>
              <strong>Speciality:</strong> {viewUser.Speciality}
            </p>
            <h3 className="mt-4 font-semibold">Practice Time:</h3>
            <ul>
              {Object.entries(viewUser.PracticeTime).map(([day, time]) => (
                <li key={day}>
                  <strong>{day}:</strong> {time}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeViewModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;