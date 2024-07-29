import React, { useState } from "react";
import AdminDashNavbar from "../../Dashboard/AdminDashNavbar";
import Users from "./Users";

const Userpage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <AdminDashNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-40" : "ml-0"
        } p-6 pt-20 transition-all duration-300 ease-in-out`}
      >
        <h1 className="font-bold text-4xl mb-4 ml-20">All Users for Hospital</h1>
        <Users />
      </div>
    </div>
  );
};

export default Userpage;
