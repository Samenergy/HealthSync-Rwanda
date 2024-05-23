import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiDashboard3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiBarChartFill } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";


function DashNavbar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex border border-[#00AFEE]  shadow-xl rounded-lg ">
      <div
        className={`bg-[#F9F8F4] h-screen p-5 pt-8 ${
          open ? "w-[220px]" : "w-[70px]"
        } duration-500 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-[#00AFEE] text-3xl rounded-full absolute top-8 ${
            open ? "left-[200px] duration-300" : "left-[50px] duration-500"
          } border border-[#00AFEE]  cursor-pointer ${!open ? "rotate-180" : ""}`}
          onClick={() => setOpen(!open)}
        />
        <div>
          <img
            src={open ? "./src/assets/logo.JPG" : "./src/assets/logo (2).JPG"}
            className="w-[170px]"
          />
        </div>
        <div className="pt-[50px] px-8 font-bold text-md flex flex-col justify-between items-left text-[16px]">
          <a href="/Dashboard">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE]">
              <div className={`${!open && "-ml-4"}`}>
                <RiDashboard3Line className="text-4xl w-auto mr-2.5" />
              </div>
              <h1 className={` ${!open && "scale-0"} `}>Dashboard</h1>
            </div>
          </a>
          <a href="/PatientList">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE] ">
              <div className={`${!open && "-ml-4"}`}>
                <FaRegUser className="text-3xl w-auto mr-4" />
              </div>
              <h1 className={` ${!open && "scale-0"} `}>Patient List</h1>
            </div>
          </a>
          <a href="/Scheduling">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE]  ">
              <div className={`${!open && "-ml-4"}`}>
                <FaRegCalendarAlt className="text-3xl w-auto mr-4" />
              </div>
              <h1 className={` ${!open && "scale-0"} `}>Appointments</h1>
            </div>
          </a>
          <a href="">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE] ">
              <div className={`${!open && "-ml-4"}`}>
                <RiBarChartFill className="text-3xl w-auto mr-4" />
              </div>
              <h1 className={` ${!open && "scale-0"} `}>Reports</h1>
            </div>
          </a>
          <a href="">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE]">
              <div className={`${!open && "-ml-4"}`}>
                <FaRegMessage className="text-3xl w-auto mr-4" />
              </div>
              <h1 className={` ${!open && "scale-0"} `}>Messages</h1>
            </div>
          </a>
        </div>
      </div>
      
    </div>
  );
}

export default DashNavbar;
