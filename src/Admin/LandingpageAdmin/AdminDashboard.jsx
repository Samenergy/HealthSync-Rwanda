import React from "react";
import AdminDashNavbar from "../Dashboard/AdminDashNavbar";
import AdminDashbarHor from "../Dashboard/AdminDashbarHor";
import PracticeForm from "../../Components/Administrator/Practiceform";
import Doctorform from "../../Components/Administrator/AddPeople";
import Labform from "../../Components/Administrator/Labform";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminDashNavbar />
      <div className="bg-[#DDF4FC] py-5 px-2 min-h-screen">
        <AdminDashbarHor />
        <h1 className="font-bold text-4xl px-20 mt-2">Dashboard</h1>
        <div className="flex w-[1000px] gap-10  ">
          <Doctorform />
          <PracticeForm />
          <Labform />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
