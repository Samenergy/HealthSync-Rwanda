import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import { addDays, startOfWeek, startOfMonth, isSameDay, isWithinInterval } from 'date-fns';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

function Billingpage() {
  const [queue, setQueue] = useState([]);
  const [filterDateType, setFilterDateType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [hospitalId, setHospitalId] = useState(null);

  useEffect(() => {
    const fetchHospitalId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedHospitalId = response.data.hospital.id; // Adjust based on your response structure
        setHospitalId(fetchedHospitalId);
      } catch (error) {
        setError("Failed to fetch hospital data");
        console.error("Failed to fetch hospital data:", error);
      }
    };

    if (token) {
      fetchHospitalId();
    } else {
      setError("No token found");
    }
  }, [token]);

  // Fetch queue data from the backend once hospitalId is available
  useEffect(() => {
    if (hospitalId) {
      const fetchQueue = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/queue/completed/${hospitalId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const sortedQueue = response.data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setQueue(sortedQueue);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch queue data");
          setLoading(false);
          console.error("Failed to fetch queue data:", error);
        }
      };

      fetchQueue();
    }
  }, [hospitalId, token]);

  // Define date filters
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);
  const startOfCurrentMonth = startOfMonth(today);

  // Filter the queue data
  const filteredQueue = queue.filter((item) => {
    const itemDate = new Date(item.createdAt);
    if (filterDateType === "today") {
      return isSameDay(itemDate, today);
    } else if (filterDateType === "thisWeek") {
      return isWithinInterval(itemDate, {
        start: startOfCurrentWeek,
        end: addDays(startOfCurrentWeek, 6),
      });
    } else if (filterDateType === "thisMonth") {
      return isWithinInterval(itemDate, {
        start: startOfCurrentMonth,
        end: addDays(startOfCurrentMonth, 30),
      });
    } else {
      return true; // No filter applied
    }
  });

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this patient from the queue?"
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/queue/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQueue(queue.filter((entry) => entry.id !== id));
      } catch (error) {
        setError("Failed to delete queue entry");
        console.error("Failed to delete queue entry:", error);
      }
    }
  };

  const openModal = (patient) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  // Handle token change, e.g., during login
  const handleTokenChange = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Save token in localStorage
  };

  return (
    <div className="w-[900px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <div className="flex items-center space-x-2">
          <span>Filter by Date:</span>
          <select
            className="border rounded p-1"
            onChange={(e) => setFilterDateType(e.target.value)}
            value={filterDateType}
          >
            <option value="">All</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
          </select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-[11px] font-sans">
            <th>No</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Date</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQueue.map((entry, index) => (
            <tr
              key={entry.id}
              className={`text-[11px] h-[34px] ${
                index % 2 === 0 ? "bg-[#ddf4fc]" : ""
              }`}
            >
              <td>{index + 1}</td>
              <td>{entry.Patient.name}</td>
              <td>{entry.Patient.gender}</td>
              <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
              <td>{entry.Patient.contact}</td>
              <td className="flex items-center gap-1 text-green-600 mt-2 "><MdVerified />{entry.status}</td>
              <td>
                <button
                  className="text-[20px] ml-2"
                  onClick={() => openModal(entry)}
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onRequestClose={closeModal}
          contentLabel="Patient Details"
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h2 className="text-xl font-bold mb-4">Patient Details</h2>
            <p><strong>Name:</strong> {selectedPatient.Patient.name}</p>
            <p><strong>Gender:</strong> {selectedPatient.Patient.gender}</p>
            <p><strong>Date:</strong> {new Date(selectedPatient.createdAt).toLocaleDateString()}</p>
            <p><strong>Phone Number:</strong> {selectedPatient.Patient.contact}</p>
            <p><strong>Status:</strong> {selectedPatient.status}</p>
            <p><strong>Services:</strong> {selectedPatient.services.join(', ')}</p>
            {/* Add more details as needed */}
            <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Billingpage;
