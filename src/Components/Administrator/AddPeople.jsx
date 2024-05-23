import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import GeneralForm from "./GeneralForm"; 

export default function Doctorform() {
  const [showModal, setShowModal] = useState(false);
  const [practiceInfo, setPracticeInfo] = useState({
    specialist: "",
    doctorName: "",
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPracticeInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
  
    console.log("Practice Info:", practiceInfo);
    setPracticeInfo({
      specialist: "",
      doctorName: "",
      // Reset other fields as needed
    });
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg ml-20 w-[300px] px-4 py-5 flex items-center flex-col mt-5">
      <FaRegUser className="text-7xl text-[#00afee]" />
      <h1 className="text-2xl font-bold mt-5 text-[#00afee]">Add People</h1>

      <button
        className="bg-[#00afee] mt-5 p-2 rounded-lg px-7 text-sm text-white hover:bg-[#002e6d] "
        onClick={() => setShowModal(true)}
      >
        New People
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="relative bg-white rounded-lg mx-auto max-w-lg p-6">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
              >
                Close
              </button>

              <GeneralForm userType="doctor" onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
