import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [adminProfile, setAdminProfile] = useState(null);
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);  // Added error state
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/admin-data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,  // Token handling
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);  // Handle HTTP errors
        }

        const data = await response.json();
        setAdminProfile(data.admin);
        setHospitalProfile(data.hospital);
      } catch (error) {
        setError(error.message);  // Set error message
      } finally {
        setLoading(false);  
      }
    };

    fetchProfiles();
  }, [token]);  

  if (loading) {
    return (
      <div className="p-6 bg-[#DDF4FC] min-h-screen flex items-center justify-center">
        <p>Loading...</p>  {/* Loading indicator */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#DDF4FC] min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>  {/* Display error message */}
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#DDF4FC] min-h-screen ml-16">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
        {adminProfile ? (
          <div>
            <div className="flex items-center mb-4">
              <img
                src={adminProfile.picture || "/default-avatar.png"}
                alt="Admin Avatar"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p>
                  <strong>Name:</strong> {adminProfile.name}
                </p>
                <p>
                  <strong>Email:</strong> {adminProfile.email}
                </p>
                <p>
                  <strong>Role:</strong> {adminProfile.role || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading admin profile...</p>
        )}
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Hospital Profile</h2>
        {hospitalProfile ? (
          <div>
            <p>
              <strong>Name:</strong> {hospitalProfile.name}
            </p>
            <p>
              <strong>Facility Type:</strong> {hospitalProfile.facilityType || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {hospitalProfile.address}
            </p>
            <p>
              <strong>Phone:</strong> {hospitalProfile.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {hospitalProfile.email}
            </p>
            <p>
              <strong>Tax ID Number:</strong> {hospitalProfile.taxIdNumber || "N/A"}
            </p>
            <p>
              <strong>Business Registration Number:</strong> {hospitalProfile.businessRegistrationNumber || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {hospitalProfile.country}
            </p>
            <p>
              <strong>Province:</strong> {hospitalProfile.province}
            </p>
            <p>
              <strong>District:</strong> {hospitalProfile.district}
            </p>
            <p>
              <strong>Sector:</strong> {hospitalProfile.sector}
            </p>
            {hospitalProfile.logo ? (
              <img
                src={hospitalProfile.logo}
                alt="Hospital Logo"
                className="mt-4 w-32 h-32 object-contain"
              />
            ) : (
              <p className="mt-4">No logo available</p>
            )}
          </div>
        ) : (
          <p>Loading hospital profile...</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
