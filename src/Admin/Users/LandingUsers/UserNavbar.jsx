import React, { useState } from "react";

const UserNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="flex h-auto w-1/2 bg-white shadow-lg rounded-lg justify-between md:h-16">
        <div className="flex w-full justify-between">
          {/* Desktop Menu */}
          <div className="hidden w-4/5 items-center justify-evenly font-semibold md:flex">
            <a href="/">Doctors</a>
            <a href="/">Nurses</a>
            <a href="/">Other</a>
            <a href="/">Contact</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;
