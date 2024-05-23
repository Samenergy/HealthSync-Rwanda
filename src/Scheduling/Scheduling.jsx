import React, { useState } from "react";

function Scheduling() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("Select..");
  const [appointments, setAppointments] = useState([
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

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    type: "",
    appointmentDate: "",
    account: "",
    status: "",
  });

  const addAppointment = () => {
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({
      patientName: "",
      type: "",
      appointmentDate: "",
      account: "",
      status: "",
    });
    setShowModal(false); // Close the modal after adding appointment
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    const today = new Date();
    const thisWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (filter === "Today") {
      return appointmentDate.toDateString() === today.toDateString();
    } else if (filter === "Week") {
      const nextSaturday = new Date(thisWeek);
      nextSaturday.setDate(thisWeek.getDate() + 6);
      return appointmentDate >= thisWeek && appointmentDate <= nextSaturday;
    } else if (filter === "Month") {
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      return appointmentDate >= thisMonth && appointmentDate <= lastDayOfMonth;
    } else {
      return true;
    }
  });
  const [editAppointment, setEditAppointment] = useState(null);

  const handleEdit = (appointment) => {
    setEditAppointment(appointment);
    // Open edit modal or form with appointment details populated
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((app) => app.id !== appointmentId));
    }
  };


  return (
    <div>
      <div className="flex items-center justify-between w-[970px] pt-5 px-5 bg-white mt-5 shadow-lg rounded-t-lg">
        <div className="flex mb-4 items-center">
          <label htmlFor="filter" className="mr-2">
            Filter by
          </label>
          <select
            id="filter"
            name="filter"
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-1"
          >
            <option value="Select" unselectable="off">
              Select...
            </option>
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00afee] w-[150px] text-[11px] h-[30px] hover:bg-[#00306a] text-white font-bold py-2 px-4 rounded"
        >
          Add Appointment
        </button>
      </div>

      {showModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Add Appointment
                    </h3>
                    <div className="mt-2">
                      <div className="flex mb-4">
                        <label htmlFor="patientName" className="mr-2">
                          Patient Name:
                        </label>
                        <input
                          id="patientName"
                          name="patientName"
                          value={newAppointment.patientName}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </div>
                      <div className="flex mb-4">
                        <label htmlFor="type" className="mr-2">
                          Type:
                        </label>
                        <input
                          id="type"
                          name="type"
                          value={newAppointment.type}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </div>
                      <div className="flex mb-4">
                        <label htmlFor="appointmentDate" className="mr-2">
                          Appointment Date:
                        </label>
                        <input
                          id="appointmentDate"
                          name="appointmentDate"
                          value={newAppointment.appointmentDate}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </div>
                      <div className="flex mb-4">
                        <label htmlFor="account" className="mr-2">
                          Account:
                        </label>
                        <input
                          id="account"
                          name="account"
                          value={newAppointment.account}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </div>
                      <div className="flex mb-4">
                        <label htmlFor="status" className="mr-2">
                          Status:
                        </label>
                        <input
                          id="status"
                          name="status"
                          value={newAppointment.status}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={addAppointment}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-black shadow-sm px-4 py-2 bg-blue-50 text-base font-medium text-black hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <table className="w-[970px] ">
        <thead className="text=[11px] bg-white text-black">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Patient Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Appointment Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Account
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {appointment.patientName}
                </div>
              </td>
              <td className="px-6 py-4 ">
                <div className="text-sm text-gray-900">{appointment.type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {appointment.appointmentDate}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-950">
                  {appointment.account}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                    appointment.status === "Booked" ? "green" : "red"
                  }-100 text-${
                    appointment.status === "Booked" ? "green" : "red"
                  }-800`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="text-[15px] flex items-center justify-between w-20 pt-4">
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Scheduling;
