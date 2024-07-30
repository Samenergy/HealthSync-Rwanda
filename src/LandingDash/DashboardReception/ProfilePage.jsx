import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "https://healthsync.up.railway.app/api/user/data",
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
    <div className="p-6 bg-[#DDF4FC] min-h-screen ml-16">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        {userProfile ? (
          <div>
            <div className="flex items-center mb-4">
              <img
                src={
                  userProfile.picture
                    ? `https://healthsync.up.railway.app/${userProfile.picture}`
                    : ""
                }
                alt="User Avatar"
                className="w-16 h-16 rounded-full mr-4"
              />

              <div>
                <p>
                  <strong>Name:</strong> {userProfile.name}
                </p>
                <p>
                  <strong>Email:</strong> {userProfile.email}
                </p>
                <p></p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user profile...</p>
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
              <strong>Facility Type:</strong>{" "}
              {hospitalProfile.facilityType || "N/A"}
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
