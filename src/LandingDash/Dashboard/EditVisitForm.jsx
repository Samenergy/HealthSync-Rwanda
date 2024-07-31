import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import servicesList from "../../Billing/services";

const EditVisitForm = ({ recordId, onUpdateVisit, onClose }) => {
  const token = localStorage.getItem("token");

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
  const [insurance, setInsurance] = useState("");
  const [socialHistory, setSocialHistory] = useState("");
  const [medication, setMedication] = useState("");
  const [images, setImages] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [showServicePopup, setShowServicePopup] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const fetchRecordId = async () => {
    try {
      const response = await axios.get(
        "https://healthsyncrwanda.vercel.app/api/in-progress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecordId(response.data.id);
    } catch (error) {
      console.error(
        "Error fetching record IDs:",
        error.response ? error.response.data : error.message
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch record IDs",
      });
    }
  };
  fetchRecordId();

  useEffect(() => {
    if (recordId) {
      const fetchRecordDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/records/${recordId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const record = response.data;
          setDate(record.date);
          setDescription(record.description);
          setDisease(record.disease);
          setDetails(record.details);
          setNotes(record.notes);
          setHeight(record.height);
          setWeight(record.weight);
          setBmi(record.bmi);
          setBloodPressure(record.bloodPressure);
          setImmunizations(record.immunizations);
          setInsurance(record.insurance);
          setSocialHistory(record.socialHistory);
          setMedication(
            record.medications.map((med) => med.medication).join(", ")
          );
          setImages(
            record.images.map((img) => ({
              ...img,
              url: img.url, // Assuming img.url is a valid URL
            }))
          );
          setSelectedServices(record.services);

          const userResponse = await axios.get(
            "http://localhost:5000/api/user/data",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDoctorId(userResponse.data.user.id);
          setDoctorName(userResponse.data.user.name);
          setHospitalName(userResponse.data.hospital.name);
        } catch (error) {
          console.error("Error fetching record details:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch record details",
          });
        }
      };

      fetchRecordDetails();
    }
  }, [token, recordId]);

  const handleDone = () => {
    if (window.confirm("Are you sure you are done?")) {
      setShowServicePopup(true);
    }
  };

  const handleConfirmServices = async () => {
    const updatedRecord = {
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
      doctorName,
      hospitalName,
      medications: medication
        .split(",")
        .map((med) => ({ medication: med.trim() })),
      images,
      services: selectedServices,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/records/${recordId}`,
        updatedRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Medical record updated successfully",
      });
      onUpdateVisit(updatedRecord);
      onClose();
    } catch (error) {
      console.error("Error updating record:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update medical record",
      });
    }
  };

  const handleInProgress = async () => {
    const updatedRecord = {
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
      doctorId,
      doctorName,
      hospitalName,
      medications: medication
        .split(",")
        .map((med) => ({ medication: med.trim() })),
      images,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/records/${recordId}`,
        updatedRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Record updated as 'In Progress'",
      });
      onUpdateVisit(updatedRecord);
    } catch (error) {
      console.error("Error updating record:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update record",
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map((file) => ({ file, url: URL.createObjectURL(file) })));
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
        <h3 className="text-2xl font-bold mb-4">Edit Visit</h3>
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
              Height
            </label>
            <input
              type="text"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="weight">
              Weight
            </label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="bmi">
              BMI
            </label>
            <input
              type="text"
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
              htmlFor="insurance"
            >
              Insurance
            </label>
            <input
              type="text"
              id="insurance"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
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
            <textarea
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
              Medications
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
              Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
            <div className="mt-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Preview ${index}`}
                  className="w-32 h-32 object-cover mt-2"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleInProgress}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Save as In Progress
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Mark as Done
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
        {showServicePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-lg font-bold mb-4">Select Services</h3>
              <div className="mb-4">
                {servicesList.map((service, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={service}
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="mr-2"
                    />
                    <label htmlFor={service}>{service}</label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
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
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditVisitForm;
