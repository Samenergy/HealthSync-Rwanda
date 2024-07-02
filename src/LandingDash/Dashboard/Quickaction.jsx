import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "./Modal";
import { FaRadiation, FaHeartbeat, FaMicroscope, FaCogs } from 'react-icons/fa'; // Import icons
import { PiTestTubeFill } from "react-icons/pi";

const testCategories = {
  "Blood Tests": {
    icon: <PiTestTubeFill className="text-red-600 " />, 
    tests: [
      "Complete Blood Count (CBC)",
      "Basic Metabolic Panel (BMP)",
      "Lipid Panel",
      "Liver Function Tests",
      "Thyroid Function Tests",
      "HCG blood tests (qualitative and quantitative)",
      "Urinalysis",
      "Urine culture",
      "HCG in urine",
      "Skin allergy tests",
      "Skin biopsy",
      "Bone marrow biopsy",
    ],
  },
  "Imaging Tests": {
    icon: <FaRadiation className="text-yellow-600 " />, 
    tests: ["X-rays", "CT Scans", "MRI", "Ultrasound", "Mammography"],
  },
  "Cardiovascular Tests": {
    icon: <FaHeartbeat className="text-red-600 " />, 
    tests: [
      "Electrocardiogram (ECG or EKG)",
      "Echocardiogram",
      "Cardiac Catheterization",
    ],
  },
  "Endoscopic Procedures": {
    icon: <FaMicroscope className="text-green-600 " />, 
    tests: ["Colonoscopy", "Endoscopy", "Bronchoscopy"],
  },
  
};

const Quickaction = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);

  const openModal = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory("");
    setModalOpen(false);
  };

  const addTestToList = (test) => {
    setSelectedTests((prevTests) => [...prevTests, test]);
    Swal.fire({
      title: "Test Added",
      text: `${test} has been added to your list.`,
      icon: "success",
      confirmButtonText: "Close",
    });
  };

  const showSelectedTests = () => {
    Swal.fire({
      title: "Selected Tests",
      html: `<ul>${selectedTests
        .map((test) => `<li>${test}</li>`)
        .join("")}</ul>`,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  return (
    <div className=" max-w-screen-lg mx-auto -ml-20">
      <h1 className="text-2xl font-bold mb-6 text-left">Quick Actions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {Object.keys(testCategories).map((category, index) => (
          <button
            key={index}
            onClick={() => openModal(category)}
            className="flex flex-col items-center bg-blue-50 text-black py-8  rounded-lg shadow-lg hover:bg-[#00afee] transition duration-300"
          >
            <span className="mr-2 text-2xl mb-5">{testCategories[category].icon}</span>
            {category}
          </button>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-xl font-semibold mb-4 text-center">
          {selectedCategory}
        </h1>
        <ul className="space-y-2 mb-4">
          {testCategories[selectedCategory]?.tests.map((test, index) => (
            <li
              key={index}
              onClick={() => addTestToList(test)}
              className="bg-blue-100 text-blue-800 p-2 rounded-md shadow-sm hover:bg-blue-200 cursor-pointer transition duration-300"
            >
              {test}
            </li>
          ))}
        </ul>
        <button
          onClick={showSelectedTests}
          className="bg-green-500 text-white p-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 w-full"
        >
          Show Selected Tests
        </button>
      </Modal>
    </div>
  );
};

export default Quickaction;
