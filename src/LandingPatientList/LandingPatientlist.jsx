import React, { useState } from "react";
import DashNavbar from "../LandingDash/Dashboard/DashNavbar";
import PatientTable from "./PatientTable/PatientTable";

const LandingPatientlist = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <DashNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex-1 ml-${
          sidebarOpen ? "52" : "1/6"
        } p-6 pt-20 transition-all duration-500`}
      >
        <div className="flex flex-col ustify-between mb-6">
          <h1 className="font-bold text-4xl">Patient List</h1>
          <PatientTable />
        </div>
      </div>
    </div>
  );
};

export default LandingPatientlist;
