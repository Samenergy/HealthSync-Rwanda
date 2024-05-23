import React from "react";
import ReceptionistDashboard from "../DashboardReception/ReceptionDashNavbar";
import DashNavbarHor from "../DashboardReception/DashNavbarHor";
import Receptionpatienttable from "../DashboardReception/Receptionpatienttable";

const LandingRecdash = () => {
  return (
    <div className="flex">
      <ReceptionistDashboard />
      <div className="bg-[#DDF4FC] py-5 px-20 min-h-screen">
        <DashNavbarHor />
        <h1 className="font-bold text-4xl mt-20">Patient List</h1>
        <Receptionpatienttable />
      </div>
    </div>
  );
};

export default LandingRecdash;
