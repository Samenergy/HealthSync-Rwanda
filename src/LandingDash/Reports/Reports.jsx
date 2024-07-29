import React, { useState } from "react";
import DashNavbar from "../Dashboard/DashNavbar";
import Reportpage from "./Reportpage";


const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <DashNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-52" : "-ml-5"
        } p-6 pt-20 transition-all duration-500`}
      >
        <h1 className="font-bold text-4xl">Reports</h1>
        <Reportpage/>
      </div>
    </div>
  );
};

export default Reports;
