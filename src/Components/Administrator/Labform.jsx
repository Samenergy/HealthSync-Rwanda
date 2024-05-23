import React, { useState } from "react";
import { LuFlaskConical } from "react-icons/lu";

export default function Labform() {
  const [showModal, setShowModal] = useState(false);
  const [practiceInfo, setPracticeInfo] = useState({
    specialist: "",
    doctorName: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPracticeInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Send practiceInfo to the server here
    // You can use fetch or any other method to send data to the server
    // Reset practiceInfo after submission if needed
    console.log("Practice Info:", practiceInfo);
    setPracticeInfo({
      specialist: "",
      doctorName: "",
      // Reset other fields as needed
    });
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg  w-[300px] px-4 py-5 flex items-center flex-col mt-5">
      <LuFlaskConical className="text-7xl text-[#00afee]" />
      <h1 className="text-2xl mt-5 font-bold text-[#00afee]">Lab</h1>

      <button
        className="bg-[#00afee] mt-5 p-2 rounded-lg px-7 text-sm text-white hover:bg-[#002e6d] "
        onClick={() => setShowModal(true)}
      >
        New Lab
      </button>

      {/* Modal for adding new practice */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Practice</h2>
            <input
              type="text"
              name="specialist"
              value={practiceInfo.specialist}
              onChange={handleInputChange}
              placeholder="Name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-3"
            />
            <input
              type="text"
              name="doctorName"
              value={practiceInfo.doctorName}
              onChange={handleInputChange}
              placeholder="Nursing License Number"
              className="border border-gray-300 rounded-md px-3 py-2 mb-3"
            />
            {/* Add more input fields for other information */}
            <div className="flex justify-end">
              <button
                className="bg-[#00afee] text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
