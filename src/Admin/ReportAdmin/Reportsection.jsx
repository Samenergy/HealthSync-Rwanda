import React, { useState } from "react";

import AdminDashNavbar from "../Dashboard/AdminDashNavbar";
import AllReports from "./Reports";

const Reportsection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <AdminDashNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className={`flex-1 transition-all duration-500 ${
          sidebarOpen ? "ml-56" : "ml-1/6"
        } p-6 pt-20`}
      >
        <h1 className="font-bold text-4xl mb-4">Report </h1>
        <AllReports/>
      </div>
    </div>
  );
};

export default Reportsection;
