import React, { useState, useRef, useEffect } from "react";
import servicesList from "./services";
import axios from "axios";
import Swal from "sweetalert2";

function ServiceDetailsModal({ patient, services, queueId, isOpen, onClose }) {
  const [percentPaidByPatient, setPercentPaidByPatient] = useState(100);
  const [amounts, setAmounts] = useState({ Patient: "", Assurance: "" }); // Initialize with empty amounts
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleDoneClick = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `https://healthsync.up.railway.app/api/queue/${queueId}/done`,
        {
          amounts: {
            Patient: patientAmount.toFixed(2),
            Assurance: assuranceAmount.toFixed(2),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update amounts with the response data
      setAmounts(response.data.queueItem.amounts);

      Swal.fire({
        title: "Success!",
        text: "Queue item status updated to completed",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        onClose(); // Close the modal after updating
      });
    } catch (error) {
      console.error("Error updating queue status:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update status",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Fetch the queue item on open
      const fetchQueueItem = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://healthsync.up.railway.app/api/queue/${queueId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAmounts(response.data.queueItem.amounts);
        } catch (error) {
          console.error("Error fetching queue item:", error);
        }
      };
      fetchQueueItem();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, queueId]);

  if (!isOpen) return null;

  const totalAmount = services.reduce((acc, service) => {
    const foundService = servicesList.find((item) => item.name === service);
    return acc + (foundService ? foundService.cost : 0);
  }, 0);

  const patientAmount = (percentPaidByPatient / 100) * totalAmount;
  const assuranceAmount = totalAmount - patientAmount;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto z-50"
      >
        <h2 className="text-3xl font-bold mb-4">{patient.name}</h2>
        <table className="min-w-full bg-white text-left mb-4">
          <thead>
            <tr>
              <th className="py-2">Service</th>
              <th className="py-2">Cost</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {services.map((service, index) => {
              const foundService = servicesList.find(
                (item) => item.name === service
              );
              return (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-[#ddf4fc]" : ""}`}
                >
                  <td className="py-2 px-4">{service}</td>
                  <td className="py-2 px-4">
                    ${foundService ? foundService.cost : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-3 flex flex-col items-center justify-center">
          <label
            htmlFor="percentPaidByPatient"
            className="font-bold text-lg text-center"
          >
            Percentage paid by patient
          </label>
          <div className="flex items-center justify-center mt-3">
            <input
              type="number"
              id="percentPaidByPatient"
              value={percentPaidByPatient}
              onChange={(e) => setPercentPaidByPatient(Number(e.target.value))}
              className="border w-24 text-4xl px-2 text-center"
            />
            <div className="ml-2 text-4xl">%</div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <p className="text-center font-bold text-lg">
            Total Amount{" "}
            <p className="text-4xl font-light text-[#00afee]">
              ${totalAmount.toFixed(2)}
            </p>{" "}
          </p>
          <div className="flex gap-10 items-center mt-3">
            <p className="text-center font-bold text-lg">
              Amount For Assurance{" "}
              <p className="text-4xl font-light text-[#00afee] ">
                ${amounts.Assurance || assuranceAmount.toFixed(2)}
              </p>{" "}
            </p>
            <p className="text-center font-bold text-lg">
              Amount For Patient{" "}
              <p className="text-4xl font-light text-[#00afee]">
                ${amounts.Patient || patientAmount.toFixed(2)}
              </p>{" "}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-16 bg-blue-500 text-white p-2 rounded-lg"
        >
          Close
        </button>
        <button
          onClick={handleDoneClick}
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          Mark as Done
        </button>
      </div>
    </div>
  );
}

export default ServiceDetailsModal;
