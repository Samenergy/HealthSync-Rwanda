import React, { useState } from "react";

const SignupHospital = ({ prevStep, adminData, submitData }) => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    facilityType: "",
    phoneNumber: "",
    taxIdNumber: "",
    businessRegistrationNumber: "",
    country: "",
    province: "",
    district: "",
    sector: "",
  });

  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitData({ ...adminData, ...formData, logo }); // Combine admin and hospital data
  };

  const facilityTypes = [
    "General Hospitals",
    "Specialty Hospitals",
    "Teaching Hospitals",
    "Children's Hospitals",
    "Psychiatric Hospitals",
    "Rehabilitation Hospitals",
    "Trauma Centers",
    "Military Hospitals",
    "Government Hospitals",
    "Community Hospitals",
    "Rural Hospitals",
    "Academic Medical Centers",
    "Critical Access Hospitals",
    "Long-Term Acute Care Hospitals (LTACHs)",
    "Hospice and Palliative Care Hospitals",
    "Outpatient Clinics",
  ];

  return (
    <div className="bg-[#011e3c] ">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto px-20 p-8 bg-[#011e3c] shadow-lg shadow-[#00aeee] rounded-lg text-white"
      >
        <h2 className="text-xl font-light mb-4 text-center">
          Please provide hospital information
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-50">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Facility Type</label>
          <select
            name="facilityType"
            value={formData.facilityType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          >
            <option value="">Select Facility Type</option>
            {facilityTypes.map((type) => (
              <option key={type} value={type.toLowerCase().replace(/ /g, "-")}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Tax ID Number</label>
          <input
            type="text"
            name="taxIdNumber"
            value={formData.taxIdNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">
            Business Registration Number
          </label>
          <input
            type="text"
            name="businessRegistrationNumber"
            value={formData.businessRegistrationNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Province</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Sector</label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-50">Health Facility Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <button
          type="button"
          onClick={prevStep}
          className="w-full bg-gray-500 text-white py-2 rounded mb-4"
        >
          Previous
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupHospital;
