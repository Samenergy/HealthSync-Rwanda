import React, { useState } from "react";
import DashNavbar from "../LandingDash/Dashboard/DashNavbar";
import Scheduling from "./Scheduling";

const LandingPatientlist = () => {
  // Manage the sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <DashNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 ml-${sidebarOpen ? '52' : '1/6'} p-6 pt-20 transition-all duration-500`}>
        <div className="bg-[#DDF4FC] py-5  min-h-screen">
          <h1 className="font-bold text-4xl">Appointments</h1>
          <Scheduling />
        </div>
      </div>
    </div>
  );
};

export default LandingPatientlist;
