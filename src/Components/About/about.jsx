import React from "react";
import { FaEye } from "react-icons/fa";
import "./About.css";
import { GiArcheryTarget } from "react-icons/gi";

const About = () => {
  return (
    <div className="bg-[#f4f4f4] py-12 about-bg p-4">
      <div className="flex flex-col md:flex-row justify-center md:justify-end gap-8 px-4 md:px-12 lg:px-52">
        <div className="flex flex-col items-center md:items-end gap-8">
          {/* Mission Card */}
          <div className="max-w-xs bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform group hover:bg-[#00aeef] hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
            <div className="flex justify-center mb-4">
              <GiArcheryTarget className="h-16 w-16 md:h-20 md:w-20 text-[#00aeef] group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">
              Mission
            </h2>
            <p className="text-sm md:text-base text-gray-600 group-hover:text-white transition-colors duration-300">
              At HealthSync Rwanda, we aim to transform healthcare records with
              innovative, user-friendly solutions that enhance efficiency,
              accuracy, and patient care.
            </p>
          </div>

          {/* Vision Card */}
          <div className="max-w-xs bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform group hover:bg-[#00aeef] hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
            <div className="flex justify-center mb-4">
              <FaEye className="h-16 w-16 md:h-20 md:w-20 text-[#00aeef] group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">
              Vision
            </h2>
            <p className="text-sm md:text-base text-gray-600 group-hover:text-white transition-colors duration-300">
              Our vision is to establish HealthSync Rwanda as a leading provider
              of EHR systems, enabling seamless digital record management for
              better healthcare delivery and outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
