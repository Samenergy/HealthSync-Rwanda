import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function EditProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [adminPicture, setAdminPicture] = useState(null);
  const [hospitalLogo, setHospitalLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserProfile(data.user);
        setHospitalProfile(data.hospital);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [token]);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHospitalInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "user_picture" && files[0]) {
      setAdminPicture(files[0]);
    } else if (name === "hospital_logo" && files[0]) {
      setHospitalLogo(files[0]);
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!userProfile.name) errors.user_name = "Name is required";
    if (!userProfile.email) errors.user_email = "Email is required";
    if (userProfile.role === "administrator") {
      if (!hospitalProfile.name)
        errors.hospital_name = "Hospital name is required";
      if (!hospitalProfile.address)
        errors.hospital_address = "Address is required";
      if (!hospitalProfile.phoneNumber)
        errors.hospital_phoneNumber = "Phone number is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (newPassword !== confirmNewPassword) {
      errors.newPassword = "New password and confirm password must match";
    }
    if (newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;

    try {
      const formData = new FormData();
      formData.append("user", JSON.stringify(userProfile));
      if (adminPicture) formData.append("user_picture", adminPicture);
      if (hospitalLogo && userProfile.role === "administrator") {
        formData.append("hospital_logo", hospitalLogo);
        formData.append("hospital", JSON.stringify(hospitalProfile));
      }

      const response = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/change-password",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Swal.fire({
        title: "Success",
        text: "Password changed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear the password fields
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to change password: ${error.message}`,
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
    <div className="p-8 bg-[#DDF4FC] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {/* Edit User Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Edit User Profile</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userProfile.name || ""}
              onChange={handleProfileInputChange}
              className={`w-full border rounded px-3 py-2 ${
                formErrors.user_name ? "border-red-500" : ""
              }`}
            />
            {formErrors.user_name && (
              <p className="text-red-500 text-xs">{formErrors.user_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userProfile.email || ""}
              onChange={handleProfileInputChange}
              className={`w-full border rounded px-3 py-2 ${
                formErrors.user_email ? "border-red-500" : ""
              }`}
            />
            {formErrors.user_email && (
              <p className="text-red-500 text-xs">{formErrors.user_email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              name="user_picture"
              onChange={handleFileChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Hospital Profile Fields */}
          {userProfile.role === "administrator" && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">
                Hospital Profile
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={hospitalProfile.name || ""}
                  onChange={handleHospitalInputChange}
                  className={`w-full border rounded px-3 py-2 ${
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
                  name="address"
                  value={hospitalProfile.address || ""}
                  onChange={handleHospitalInputChange}
                  className={`w-full border rounded px-3 py-2 ${
                    formErrors.hospital_address ? "border-red-500" : ""
                  }`}
                />
                {formErrors.hospital_address && (
                  <p className="text-red-500 text-xs">{formErrors.hospital_address}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={hospitalProfile.phoneNumber || ""}
                  onChange={handleHospitalInputChange}
                  className={`w-full border rounded px-3 py-2 ${
                    formErrors.hospital_phoneNumber ? "border-red-500" : ""
                  }`}
                />
                {formErrors.hospital_phoneNumber && (
                  <p className="text-red-500 text-xs">{formErrors.hospital_phoneNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Logo
                </label>
                <input
                  type="file"
                  name="hospital_logo"
                  onChange={handleFileChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                formErrors.oldPassword ? "border-red-500" : ""
              }`}
            />
            {formErrors.oldPassword && (
              <p className="text-red-500 text-xs">{formErrors.oldPassword}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                formErrors.newPassword ? "border-red-500" : ""
              }`}
            />
            {formErrors.newPassword && (
              <p className="text-red-500 text-xs">{formErrors.newPassword}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                formErrors.confirmNewPassword ? "border-red-500" : ""
              }`}
            />
            {formErrors.confirmNewPassword && (
              <p className="text-red-500 text-xs">{formErrors.confirmNewPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
