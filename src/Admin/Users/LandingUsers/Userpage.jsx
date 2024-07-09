import React, { useState } from 'react';
import AdminDashNavbar from '../../Dashboard/AdminDashNavbar';
import Users from './Users';

const Userpage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      <AdminDashNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex-1 ${sidebarOpen ? "ml-32" : "-ml-24"} p-6 pt-20 transition-all duration-300 ease-in-out`}
      >
        <Users />
      </div>
    </div>
  );
};

export default Userpage;
