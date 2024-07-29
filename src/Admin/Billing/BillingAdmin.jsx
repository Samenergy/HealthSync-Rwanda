import React, { useState } from "react";
import Billingpage from './Billingpage';
import AdminDashNavbar from '../Dashboard/AdminDashNavbar';

const BillingAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <AdminDashNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className={`flex-1 transition-all duration-500 ${
          sidebarOpen ? "ml-10" : "ml-1/6"
        } p-6 pt-20`}
      >
        <h1 className="font-bold text-4xl mb-4">Billing </h1>
        <Billingpage />
      </div>
    </div>
  );
};

export default BillingAdmin;
