import React, { useState } from "react";
import ReceptionDashNavbar from "../DashboardReception/ReceptionDashNavbar";
import Receptionpatienttable from "../DashboardReception/Receptionpatienttable";
import AddPatient from "../DashboardReception/AddPatient";

const LandingRecdash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <ReceptionDashNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className={`flex-1 transition-all duration-500 ${
          sidebarOpen ? "ml-10" : "ml-1/6"
        } p-6 pt-20`}
      >
        <h1 className="font-bold text-4xl mb-4">All Patients</h1>
        <Receptionpatienttable />
        <AddPatient/>
      </div>
    </div>
  );
};

export default LandingRecdash;
