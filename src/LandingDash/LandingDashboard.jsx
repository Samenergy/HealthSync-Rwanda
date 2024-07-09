import React, { useState } from "react";
import DashNavbar from "./Dashboard/DashNavbar";
import DocDashboard from "./Dashboard/DocDashboard";

const Landingpage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <DashNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex-1 ml-${
          sidebarOpen ? "52" : "1/6"
        } p-6 pt-20 transition-all duration-500`}
      >
        <DocDashboard />
      </div>
    </div>
  );
};

export default Landingpage;
