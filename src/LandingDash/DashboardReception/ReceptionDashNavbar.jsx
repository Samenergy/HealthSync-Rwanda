import React, { useState, useEffect, Fragment } from "react";
import {
  FaBars,
  FaRegUser,
  FaRegCreditCard,
  FaRegEnvelope,
} from "react-icons/fa";
import { RiDashboard3Line, RiBarChartFill } from "react-icons/ri";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

const user = {
  name: "Receptionist",
  email: "receptionist@example.com",
  imageUrl: "/assets/download.png",
};

const userNavigation = [
  { name: "Your Profile", href: "/Reception/info" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const handleSignOut = async () => {
  try {
    // Make a POST request to the logout route
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Clear the token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
};
function ReceptionDashNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDateTime = format(
    currentDateTime,
    "EEEE, MMMM d, yyyy h:mm:ss a"
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen border border-[#ffffff] shadow-xl rounded-lg transition-all duration-500 ${
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
        <div
          className={`pt-[50px] px-8 font-bold text-md flex flex-col justify-between ${
            !sidebarOpen ? "items-center" : "items-left"
          } text-[16px]`}
        >
          <a href="/Reception">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE]">
              <div className={` ${!sidebarOpen && "flex items-center"} `}>
                <RiDashboard3Line className="text-4xl w-auto mr-2.5" />
              </div>
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Reception</h1>
            </div>
          </a>
          <a href="/PatientlistReception">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE] ">
              <div className={`${!open && "-ml-4"}`}>
                <FaRegUser className="text-3xl w-auto mr-4" />
              </div>
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Patient</h1>
            </div>
          </a>
          <a href="/billing">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE] ">
              <div className={`${!open && "-ml-4"}`}>
                <FaRegCreditCard className="text-3xl w-auto mr-4" />
              </div>
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Billing</h1>
            </div>
          </a>
          <a href="">
            <div className="pb-[20px] flex items-center -ml-5 hover:text-[#00AFEE]">
              <div className={`${!open && "-ml-4"}`}>
                <FaRegEnvelope className="text-3xl w-auto mr-4" />
              </div>
              <h1 className={` ${!sidebarOpen && "hidden"} `}>Messages</h1>
            </div>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-52" : "ml-10"
        } flex flex-col transition-all duration-500`}
      >
        {/* Top Navbar */}
        <header
          className={`fixed top-0 left-0 right-0 h-16 bg-[#F9F8F4]  z-20 flex items-center justify-between p-4 transition-all duration-500 ${
            sidebarOpen ? "ml-[16.7%]" : "ml-[5.7%]"
          }`}
        >
          <FaBars
            className="text-[#4e4c61] text-3xl cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          />
          <div className="ml-4 text-gray-800">{formattedDateTime}</div>
          <Disclosure as="nav" className="bg-[#F9F8F4]">
            {({ open }) => (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 mr-5 text-[#00afee] hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00afee]"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-10 w-10" aria-hidden="true" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt={`${user.name}'s profile picture`}
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
                          {({ active }) =>
                            item.name === "Sign out" ? (
                              <button
                                onClick={handleSignOut}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-950 w-full text-left"
                                )}
                              >
                                {item.name}
                              </button>
                            ) : (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-950"
                                )}
                              >
                                {item.name}
                              </a>
                            )
                          }
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </Disclosure>
        </header>
        <main className="flex-1 pt-20 p-6 bg-[#DDF4FC]">
          {/* Placeholder for main content */}
        </main>
      </div>
    </div>
  );
}

export default ReceptionDashNavbar;
