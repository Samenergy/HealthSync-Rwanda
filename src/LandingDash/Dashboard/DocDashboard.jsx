import React from "react";
import AppointmentTable from "./AppointmentTable";
import Labtable from "./Labtable";
import Graphtable from "./Graphtable";
import Billing from "./Billing";

function DocDashboard() {
  return (
    <div className="bg-[#DDF4FC] py-5 px-20 min-h-screen">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <div>
        <div className="flex gap-20">
          <AppointmentTable />
          <Graphtable />
        </div>
        <div className="flex gap-20">
          <Labtable />
          <Billing />
        </div>
      </div>
    </div>
  );
}

export default DocDashboard;
