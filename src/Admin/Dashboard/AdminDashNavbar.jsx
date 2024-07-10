import React, { useState, Fragment, useEffect } from "react";
import {
  FaBars,
  FaRegUser,
  FaRegCalendarAlt,
  FaRegEnvelope,
  FaRegCreditCard,
} from "react-icons/fa";
import { RiDashboard3Line, RiBarChartFill } from "react-icons/ri";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

// Admin profile
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AdminDashNavbar({ sidebarOpen, setSidebarOpen }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [adminProfile, setAdminProfile] = useState(null);
  const [hospitalProfile, setHospitalProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/admin-data",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Token handling
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }

        const data = await response.json();
        setAdminProfile(data.admin);
        setHospitalProfile(data.hospital);
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Fetch both profiles
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/admin-data", {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your token handling logic
          },
        });
        const data = await response.json();
        setAdminProfile(data.admin);
        setHospitalProfile(data.hospital);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const formattedDateTime = format(
    currentDateTime,
    "EEEE, MMMM d, yyyy h:mm:ss a"
  );

  return (
    <div className="flex h-screen bg-[#DDF4FC]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen border border-[#ffffff] shadow-xl rounded-lg transition-all duration-500 ease-in-out ${
          sidebarOpen ? "w-1/6" : "w-20"
        } bg-[#F9F8F4] p-5 pt-8`}
      >
        <div>
          <img
            src={
              sidebarOpen
                ? "./src/assets/logo.JPG"
                : "./src/assets/logo (2).JPG"
            }
            className="w-[170px]"
            alt="Medical Center Clinic Logo"
          />
        </div>
        <div>{/* hospital profile */}</div>
        <div
          className={`pt-[50px] px-2 font-bold text-md flex flex-col  justify-between ${
            !sidebarOpen ? "items-center" : "items-left"
          } text-[16px]`}
        >
          <a href="/admin">
            <div className="pb-[20px] flex items-center hover:text-[#00AFEE]">
              <RiDashboard3Line className="text-3xl w-auto mr-2.5" />
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Dashboard</h1>
            </div>
          </a>
          <a href="/Users">
            <div className="pb-[20px] flex items-center hover:text-[#00AFEE]">
              <FaRegUser className="text-3xl w-auto mr-4" />
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Users</h1>
            </div>
          </a>
          <a href="/admin">
            <div className="pb-[20px] flex items-center hover:text-[#00AFEE]">
              <FaRegCalendarAlt className="text-3xl w-auto mr-4" />
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Scheduling</h1>
            </div>
          </a>
          <a href="">
            <div className="pb-[20px] flex items-center hover:text-[#00AFEE]">
              <RiBarChartFill className="text-3xl w-auto mr-4" />
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Reports</h1>
            </div>
          </a>
          <a href="">
            <div className="pb-[20px] flex items-center hover:text-[#00AFEE]">
              <FaRegCreditCard className="text-3xl w-auto mr-4" />
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Billing</h1>
            </div>
          </a>
          <a href="">
            <div className="pb-[20px] flex items-center hover:text-[#00AFEE]">
              <FaRegEnvelope className="text-3xl w-auto mr-4" />
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Messages</h1>
            </div>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 ml-${
          sidebarOpen ? "1/6" : "20"
        } flex flex-col transition-all duration-500 ease-in-out`}
      >
        {/* Top Navbar */}
        <header
          className={`fixed top-0 left-0 right-0  h-16 bg-[#F9F8F4] z-20 flex items-center justify-between px-4 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-[16.7%]" : "ml-[5.7%]"
          }`}
        >
          <FaBars
            className="text-[#4e4c61] text-3xl cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          />
          <div className="text-gray-800">{formattedDateTime}</div>
          <Disclosure as="nav" className="bg-[#F9F8F4]">
            {({ open }) => (
              <div className="flex items-center space-x-4 px-10">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-[#00afee] hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00afee]"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-8 w-8" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={adminProfile?.imageUrl || "/assets/default.png"}
                        alt={`${
                          adminProfile?.name || "Admin"
                        }'s profile picture`}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-[#00afee] ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-950"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </Disclosure>
        </header>
        <main className="flex-1 pt-16 pb-6 px-4 bg-[#DDF4FC]">
        </main>
      </div>
    </div>
  );
}

export default AdminDashNavbar;
