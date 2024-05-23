import React from "react";
import DashNavbar from "./Dashboard/DashNavbar";
import DocDashboard from "./Dashboard/DocDashboard";
import DashbarHor from "./Dashboard/DashbarHor";

function Landingpage() {
  return (
    <div className="flex">
      <DashNavbar />
      <div>
        <DashbarHor />
        <DocDashboard />
      </div>
    </div>
  );
}

export default Landingpage;
