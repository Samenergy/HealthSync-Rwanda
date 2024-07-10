import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function EditProfilePage() {
  const [adminProfile, setAdminProfile] = useState(null);
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [adminPicture, setAdminPicture] = useState(null);
  const [hospitalLogo, setHospitalLogo] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/admin-data",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAdminProfile(data.admin);
        setHospitalProfile(data.hospital);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("admin")) {
      setAdminProfile((prev) => ({
        ...prev,
        [name.replace("admin_", "")]: value,
      }));
    } else if (name.startsWith("hospital")) {
      setHospitalProfile((prev) => ({
        ...prev,
        [name.replace("hospital_", "")]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "admin_picture" && files[0]) {
      setAdminPicture(files[0]);
    } else if (name === "hospital_logo" && files[0]) {
      setHospitalLogo(files[0]);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!adminProfile.name) errors.admin_name = "Name is required";
    if (!adminProfile.email) errors.admin_email = "Email is required";
    if (!hospitalProfile.name)
      errors.hospital_name = "Hospital name is required";
    if (!hospitalProfile.address)
      errors.hospital_address = "Address is required";
    if (!hospitalProfile.phoneNumber)
      errors.hospital_phoneNumber = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("admin", JSON.stringify(adminProfile));
      formData.append("hospital", JSON.stringify(hospitalProfile));
      if (adminPicture) formData.append("admin_picture", adminPicture);
      if (hospitalLogo) formData.append("hospital_logo", hospitalLogo);

      const response = await fetch(
        "http://localhost:5000/api/admin/admin-data",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Swal.fire({
        title: "Success",
        text: "Profile updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to update profile: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#DDF4FC] min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#DDF4FC] min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#DDF4FC] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Admin Profile Fields */}
        <h2 className="text-xl font-semibold mb-4">Edit Admin Profile</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="admin_name"
            value={adminProfile.name || ""}
            onChange={handleInputChange}
            className={`form-input ${
              formErrors.admin_name ? "border-red-500" : ""
            }`}
          />
          {formErrors.admin_name && (
            <p className="text-red-500 text-xs">{formErrors.admin_name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="admin_email"
            value={adminProfile.email || ""}
            onChange={handleInputChange}
            className={`form-input ${
              formErrors.admin_email ? "border-red-500" : ""
            }`}
          />
          {formErrors.admin_email && (
            <p className="text-red-500 text-xs">{formErrors.admin_email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            name="admin_picture"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
        {/* Add more fields as needed for the admin profile */}

        {/* Hospital Profile Fields */}
        <h2 className="text-xl font-semibold mb-4">Edit Hospital Profile</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Name
          </label>
          <input
            type="text"
            name="hospital_name"
            value={hospitalProfile.name || ""}
            onChange={handleInputChange}
            className={`form-input ${
              formErrors.hospital_name ? "border-red-500" : ""
            }`}
          />
          {formErrors.hospital_name && (
            <p className="text-red-500 text-xs">{formErrors.hospital_name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="hospital_address"
            value={hospitalProfile.address || ""}
            onChange={handleInputChange}
            className={`form-input ${
              formErrors.hospital_address ? "border-red-500" : ""
            }`}
          />
          {formErrors.hospital_address && (
            <p className="text-red-500 text-xs">
              {formErrors.hospital_address}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="hospital_phoneNumber"
            value={hospitalProfile.phoneNumber || ""}
            onChange={handleInputChange}
            className={`form-input ${
              formErrors.hospital_phoneNumber ? "border-red-500" : ""
            }`}
          />
          {formErrors.hospital_phoneNumber && (
            <p className="text-red-500 text-xs">
              {formErrors.hospital_phoneNumber}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo
          </label>
          <input
            type="file"
            name="hospital_logo"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
        {/* Add more fields as needed for the hospital profile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facility Type
          </label>
          <input
            type="text"
            name="hospital_facilityType"
            value={hospitalProfile.facilityType || ""}
            onChange={handleInputChange}
            className="form-input"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax ID Number
          </label>
          <input
            type="text"
            name="hospital_taxIdNumber"
            value={hospitalProfile.taxIdNumber || ""}
            onChange={handleInputChange}
            className="form-input"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Registration Number
          </label>
          <input
            type="text"
            name="hospital_businessRegistrationNumber"
            value={hospitalProfile.businessRegistrationNumber || ""}
            onChange={handleInputChange}
            className="form-input"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            name="hospital_country"
            value={hospitalProfile.country || ""}
            onChange={handleInputChange}
            className="form-input"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Province
          </label>
          <input
            type="text"
            name="hospital_province"
            value={hospitalProfile.province || ""}
            onChange={handleInputChange}
            className="form-input"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District
          </label>
          <input
            type="text"
            name="hospital_district"
            value={hospitalProfile.district || ""}
            onChange={handleInputChange}
            className="form-input"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sector
          </label>
          <input
            type="text"
            name="hospital_sector"
            value={hospitalProfile.sector || ""}
            onChange={handleInputChange}
            className="form-input"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
