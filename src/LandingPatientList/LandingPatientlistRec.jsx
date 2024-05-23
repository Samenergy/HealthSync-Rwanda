import React from "react";
import DashNavbar from "../LandingDash/Dashboard/DashNavbar";
import DashbarHor from "../LandingDash/Dashboard/DashbarHor";
import Patientlist from "./PatientListReception/Patientlist";
import ReceptionDashNavbar from "../LandingDash/DashboardReception/ReceptionDashNavbar";

const LandingPatientlistRec = () => {
  return (
    <div className="flex">
      <ReceptionDashNavbar/>
      <div>
        <DashbarHor />
        <div className="bg-[#DDF4FC] py-5 px-20 min-h-screen">
          <h1 className="font-bold text-4xl">Patient List</h1>
          <Patientlist />
        </div>
      </div>
    </div>
  );
};

export default LandingPatientlistRec;
