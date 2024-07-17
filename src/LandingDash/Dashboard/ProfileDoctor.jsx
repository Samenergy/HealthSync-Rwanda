import React, { useState } from "react";
import ProfilePage from "./ProfilePage";
import EditProfilePage from "../../Admin/Dashboard/EditProfilePage";
import DashNavbar from "./DashNavbar";

const ProfileDoctor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <DashNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className={`flex-1 ml-${
          sidebarOpen ? "52" : "1/6"
        } p-6 pt-20 transition-all duration-500`}
      >
        <h1 className="font-bold text-4xl mb-6">Profile</h1>

        <div className="flex gap-10 -ml-20">
          <ProfilePage />
          <EditProfilePage />
        </div>
      </div>
    </div>
  );
};

export default ProfileDoctor;
