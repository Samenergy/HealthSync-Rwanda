import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import servicesList from "../../Billing/services";

const NewVisitForm = ({ patientId, onAddVisit, onClose }) => {
  const token = localStorage.getItem("token");

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [disease, setDisease] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBmi] = useState();
  const [bloodPressure, setBloodPressure] = useState("");
  const [immunizations, setImmunizations] = useState("");
  const [insurance, setInsurance] = useState(""); // This will be populated automatically
  const [socialHistory, setSocialHistory] = useState("");
  const [medication, setMedication] = useState("");
  const [images, setImages] = useState([]);
  const [doctorId, setDoctorId] = useState(""); // Doctor ID state
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [showServicePopup, setShowServicePopup] = useState(false); // State to handle service popup
  const [selectedServices, setSelectedServices] = useState([]); // State to handle selected services
  const [queueId, setQueueId] = useState(null);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);

    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          "https://healthsync.up.railway.app/api/user/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctorId(response.data.user.id); // Set doctor ID
        setDoctorName(response.data.user.name);
        setHospitalName(response.data.hospital.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch user data",
        });
      }
    };

    const fetchInsurance = async () => {
      try {
        const response = await axios.get(
          `https://healthsync.up.railway.app/api/queue/assurance/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInsurance(response.data.assurance);
      } catch (error) {
        console.error("Error fetching assurance:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch insurance",
        });
      }
    };

    const fetchQueueId = async () => {
      try {
        const response = await axios.get(
          `https://healthsync.up.railway.app/api/queue/patient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQueueId(response.data.id);
      } catch (error) {
        console.error("Error fetching queue ID:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch queue ID",
        });
      }
    };

    fetchDetails();
    fetchInsurance();
    fetchQueueId();
  }, [token, patientId]);

  const handleDone = async () => {
    if (window.confirm("Are you sure you are done?")) {
      setShowServicePopup(true); // Show service popup
    }
  };

  const handleConfirmServices = async () => {
    if (!queueId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Queue ID not found",
      });
      return;
    }

    const newVisit = {
      patientId,
      date,
      description,
      status: "Done",
      disease,
      details,
      notes,
      height,
      weight,
      bmi,
      bloodPressure,
      immunizations,
      insurance,
      socialHistory,
      doctorId, // Include doctor ID
      doctorname,
      HospitalName,
      medications: medication
        .split(",")
        .map((med) => ({ medication: med.trim() })),
      images: images.map((file) => ({ image: URL.createObjectURL(file) })),
      services: selectedServices,
    };

    try {
      const response = await axios.post(
        "https://healthsync.up.railway.app/api/user/records",
        newVisit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the queue with selected services and doctor ID
      await axios.put(
        `https://healthsync.up.railway.app/api/queue/edit/${queueId}`,
        { services: selectedServices, doctorId }, // Include doctor ID in the payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Patient has been signed off successfully",
      });
      onAddVisit(response.data);
      onClose();
    } catch (error) {
      console.error("Error posting visit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save visit data",
      });
    }
  };

  const handleInProgress = async () => {
    const newVisit = {
      patientId,
      date,
      description,
      status: "In Progress",
      disease,
      details,
      notes,
      height,
      weight,
      bmi,
      bloodPressure,
      immunizations,
      insurance,
      socialHistory,
      doctorId, // Use fetched doctor ID here
      doctorname,
      Hospitalname,
      medications: medication
        .split(",")
        .map((med) => ({ medication: med.trim() })),
      images: images.map((file) => ({ image: URL.createObjectURL(file) })),
    };

    try {
      const response = await axios.post(
        "https://healthsync.up.railway.app/api/user/records",
        newVisit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Visit saved as 'In Progress'",
      });
      onAddVisit(response.data);
    } catch (error) {
      console.error("Error posting visit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save visit data",
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleServicePopupClose = () => {
    setShowServicePopup(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">New Visit</h3>
        <form>
          {/* Form fields */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="disease">
              Disease
            </label>
            <input
              type="text"
              id="disease"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="height">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="weight">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="bmi">
              BMI
            </label>
            <input
              type="number"
              id="bmi"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="bloodPressure"
            >
              Blood Pressure
            </label>
            <input
              type="text"
              id="bloodPressure"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="immunizations"
            >
              Immunizations
            </label>
            <input
              type="text"
              id="immunizations"
              value={immunizations}
              onChange={(e) => setImmunizations(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="socialHistory"
            >
              Social History
            </label>
            <input
              type="text"
              id="socialHistory"
              value={socialHistory}
              onChange={(e) => setSocialHistory(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="medication"
            >
              Medications (comma separated)
            </label>
            <input
              type="text"
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="images">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleInProgress}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Done
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      {showServicePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Select Services</h3>
            <div className="mb-4">
              {servicesList.map((service) => (
                <div key={service.name} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={service.name}
                    checked={selectedServices.includes(service.name)}
                    onChange={() => handleServiceChange(service.name)}
                    className="mr-2"
                  />
                  <label htmlFor={service.name} className="text-sm font-medium">
                    {service.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleConfirmServices}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={handleServicePopupClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewVisitForm;
