import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import servicesList from "../../Billing/services";
import PropTypes from "prop-types";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "date":
        setDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "disease":
        setDisease(value);
        break;
      case "details":
        setDetails(value);
        break;
      case "notes":
        setNotes(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "bmi":
        setBmi(value);
        break;
      case "bloodPressure":
        setBloodPressure(value);
        break;
      case "immunizations":
        setImmunizations(value);
        break;
      case "socialHistory":
        setSocialHistory(value);
        break;
      case "medications":
        setMedication(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = () => {
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
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
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
              value={description}
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
              value={disease}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              value={details}
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
              value={notes}
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
              value={height}
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
              value={weight}
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
              value={bmi}
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
              value={bloodPressure}
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
            <textarea
              id="immunizations"
              name="immunizations"
              value={immunizations}
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
            <textarea
              id="socialHistory"
              name="socialHistory"
              value={socialHistory}
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
              value={medication}
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
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
        {showServicePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-lg font-semibold mb-4">Select Services</h3>
              {servicesList.map((service) => (
                <div key={service} className="mb-2">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceChange(service)}
                  />
                  <label className="ml-2">{service}</label>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleConfirmServices}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={handleServicePopupClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

EditVisitForm.propTypes = {
  visitId: PropTypes.string.isRequired,
  onUpdateVisit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditVisitForm;
