import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import servicesList from "../../Billing/services";

const EditVisitForm = ({ visitId, onUpdateVisit, onClose }) => {
  const token = localStorage.getItem("token");

  // Initialize state with default values
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [disease, setDisease] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [immunizations, setImmunizations] = useState("");
  const [insurance, setInsurance] = useState(""); // This will be populated automatically
  const [socialHistory, setSocialHistory] = useState("");
  const [medication, setMedication] = useState("");
  const [images, setImages] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [doctorname, setdoctorname] = useState("");
  const [Hospitalname, setHospitalname] = useState("");
  const [showServicePopup, setShowServicePopup] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [queueId, setQueueId] = useState(null);

  // Fetch visit data on component mount
  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await axios.get(
          `https://healthsync.up.railway.app/api/user/records/${visitId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const visit = response.data;

        setDate(visit.date);
        setDescription(visit.description);
        setDisease(visit.disease);
        setDetails(visit.details);
        setNotes(visit.notes);
        setHeight(visit.height);
        setWeight(visit.weight);
        setBmi(visit.bmi);
        setBloodPressure(visit.bloodPressure);
        setImmunizations(visit.immunizations);
        setInsurance(visit.insurance);
        setSocialHistory(visit.socialHistory);
        setMedication(visit.medications.map((m) => m.medication).join(", "));
        setImages(visit.images.map((img) => img.image)); // Assume images are URLs
        setSelectedServices(visit.services || []);

        const doctorResponse = await axios.get(
          "https://healthsync.up.railway.app/api/user/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctorId(doctorResponse.data.user.id);
        setdoctorname(doctorResponse.data.user.name);
        setHospitalname(doctorResponse.data.hospital.name);

        const queueResponse = await axios.get(
          `https://healthsync.up.railway.app/api/queue/patient/${visit.patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQueueId(queueResponse.data.id);
      } catch (error) {
        console.error("Error fetching visit data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch visit data",
        });
      }
    };

    fetchVisitData();
  }, [token, visitId]);

  const handleUpdate = async () => {
    if (window.confirm("Are you sure you want to update this visit?")) {
      setShowServicePopup(true);
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

    const updatedVisit = {
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
      doctorId,
      doctorname,
      Hospitalname,
      medications: medication
        .split(",")
        .map((med) => ({ medication: med.trim() })),
      images: images.map((file) => ({ image: URL.createObjectURL(file) })),
      services: selectedServices,
    };

    try {
      await axios.put(
        `https://healthsync.up.railway.app/api/user/records/${visitId}`,
        updatedVisit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.put(
        `https://healthsync.up.railway.app/api/queue/edit/${queueId}`,
        { services: selectedServices, doctorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Visit updated successfully",
      });
      onUpdateVisit(updatedVisit);
      onClose();
    } catch (error) {
      console.error("Error updating visit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update visit data",
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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Visit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="disease">
              Disease
            </label>
            <input
              type="text"
              id="disease"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            >
              <option value="IN PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="height">
              Height
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="weight">
              Weight
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="bmi">
              BMI
            </label>
            <input
              type="text"
              id="bmi"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
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
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
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
              name="immunizations"
              value={formData.immunizations}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
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
              name="socialHistory"
              value={formData.socialHistory}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="medications"
            >
              Medications
            </label>
            <input
              type="text"
              id="medications"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="images">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update
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

EditVisitForm.propTypes = {
  visit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    disease: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    bmi: PropTypes.string.isRequired,
    bloodPressure: PropTypes.string.isRequired,
    immunizations: PropTypes.string.isRequired,
    socialHistory: PropTypes.string.isRequired,
    medications: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    patientId: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditVisitForm;
