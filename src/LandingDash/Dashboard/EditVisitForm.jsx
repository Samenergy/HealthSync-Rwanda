import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const EditVisitForm = ({ visit, onClose }) => {
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
    images: [],
  });

  useEffect(() => {
    setFormData(visit);
  }, [visit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/user/records/${visit.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error updating visit:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
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
          {/* Add additional fields similarly */}
          {/* Example field */}
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
              <option value="Done">Done</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

EditVisitForm.propTypes = {
  visit: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditVisitForm;
