import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

function Users() {
  const [data, setData] = useState([
    { id: 1, Name: "John Doe", Role: "Doctor", email: "john.doe@example.com" },
    { id: 2, Name: "Jane Smith", Role: "Nurse", email: "jane.smith@example.com" },
    { id: 3, Name: "Bob Johnson", Role: "Reception", email: "bob.johnson@example.com" },
  ]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/all');
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={user.id}
              className={`text-[11px] h-[34px] ${index % 2 === 0 ? "bg-[#ddf4fc]" : ""}`}
            >
              <td>{index + 1}</td> {/* Display index starting from 1 */}
              <td>{user.Name}</td>
              <td>{user.Role}</td>
              <td>{user.email}</td>
              <td>
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
    </div>
  );
}

export default Users;
