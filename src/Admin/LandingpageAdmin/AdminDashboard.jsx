import React, { useState } from "react";
import AdminDashNavbar from "../Dashboard/AdminDashNavbar";
import PracticeForm from "../../Components/Administrator/Practiceform";
import Doctorform from "../../Components/Administrator/AddPeople";
import Labform from "../../Components/Administrator/Labform";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <AdminDashNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className={`flex-1 ml-${
          sidebarOpen ? "52" : "1/6"
        } p-6 pt-20 transition-all duration-500`}
      >
        <h1 className="font-bold text-4xl mb-6">Dashboard</h1>

        <div className="flex gap-10 -ml-20">
          <Doctorform />
          <PracticeForm />
          <Labform />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
