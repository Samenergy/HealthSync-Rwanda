import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";

const EditVisitForm = ({ visit, patientId, onClose, onSave  }) => {
  const [insurance, setInsurance] = useState(""); 
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    disease: "",
    status: "",
    details: "",
    notes: "",
    height: "",
    weight: "",
    bmi: "",
    bloodPressure: "",
    immunizations: "",
    insurance: "",
    socialHistory: "",
    doctorName: "",
    hospitalName: "",
    medications: "",
    images: [], // Updated to handle file objects
  });

  useEffect(() => {
    setFormData(visit);
  }, [visit]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://healthsync.up.railway.app/api/user/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData((prev) => ({
          ...prev,
          doctorName: response.data.user.name,
          hospitalName: response.data.hospital.name,
        }));
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
        const token = localStorage.getItem("token");
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

    fetchDetails();
    fetchInsurance();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Prepare form data for submission
      const submitData = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file, index) => {
            submitData.append(`${key}[${index}]`, file);
          });
        } else {
          submitData.append(key, formData[key]);
        }
      }

      await axios.put(
        `https://healthsync.up.railway.app/api/user/records/${visit.id}`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Visit record updated successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error updating visit:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update visit record",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Visit</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="description">
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
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
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
            <label className="block text-sm font-medium mb-2" htmlFor="bloodPressure">
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
            <label className="block text-sm font-medium mb-2" htmlFor="immunizations">
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
            <label className="block text-sm font-medium mb-2" htmlFor="insurance">
              Insurance
            </label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={insurance} // Set insurance from state
              onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              readOnly // Set to readOnly if you don't want it editable
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="socialHistory">
              Social History
            </label>
            <textarea
              id="socialHistory"
              name="socialHistory"
              value={formData.socialHistory}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="medications">
              Medications
            </label>
            <textarea
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
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditVisitForm.propTypes = {
  patientId: PropTypes.string.isRequired,
  visit: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    disease: PropTypes.string,
    status: PropTypes.string,
    details: PropTypes.string,
    notes: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    bmi: PropTypes.string,
    bloodPressure: PropTypes.string,
    immunizations: PropTypes.string,
    insurance: PropTypes.string,
    socialHistory: PropTypes.string,
    doctorName: PropTypes.string,
    hospitalName: PropTypes.string,
    medications: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditVisitForm;
