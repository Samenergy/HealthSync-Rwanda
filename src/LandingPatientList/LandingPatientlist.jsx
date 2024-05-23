import React from "react";
import DashNavbar from "../LandingDash/Dashboard/DashNavbar";
import DashbarHor from "../LandingDash/Dashboard/DashbarHor";
import PatientTable from "./PatientTable/PatientTable";

const LandingPatientlist = () => {
  return (
    <div className="flex">
      <DashNavbar />
      <div>
        <DashbarHor />
        <div className="bg-[#DDF4FC] py-5 px-20 min-h-screen">
          <h1 className="font-bold text-4xl">Patient List</h1>
          <PatientTable />
        </div>
      </div>
    </div>
  );
};

export default LandingPatientlist;
