import React from 'react';
import { GrStorage } from 'react-icons/gr';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { FaChartSimple } from 'react-icons/fa6';

const Features = () => {
  return (
    <div className="relative isolate overflow-hidden bg-[#011C36] py-20 sm:py-16">
      <h2 className="text-center font-bold uppercase text-2xl md:text-3xl p-10 text-white underline underline-offset-8">
        Our Features
      </h2>

      <div className="flex flex-col md:flex-row gap-8 px-5 md:px-10 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="max-w-xs mx-auto bg-black shadow-lg p-6 text-center transition-transform transform group hover:bg-[#00afee] hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <img
              className="h-12 w-12 text-[#abd498] group-hover:text-white transition-colors duration-300"
              src="/nurse.svg"
              alt="Patient Care"
            />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300">
            Patient Care
          </h2>
          <p className="text-gray-50 group-hover:text-white transition-colors duration-300">
            Simplify patient check-in, access medical history securely, and stay
            organized with appointment scheduling and reminders.
          </p>
        </div>

        {/* Card 2 */}
        <div className="max-w-xs mx-auto bg-black shadow-lg p-6 text-center transition-transform transform group hover:bg-[#00afee] hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <GrStorage className="h-12 w-12 text-[#fff] group-hover:text-white transition-colors duration-300" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300">
            Patient Data Storage
          </h2>
          <p className="text-gray-50 group-hover:text-white transition-colors duration-300">
            Digitize patient records for easy access and ensure HIPAA-compliant
            data security measures are in place.
          </p>
        </div>

        {/* Card 3 */}
        <div className="max-w-xs mx-auto bg-black shadow-lg p-6 text-center transition-transform transform group hover:bg-[#00afee] hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <MdOutlineHealthAndSafety className="h-12 w-12 text-[#fff] group-hover:text-white transition-colors duration-300" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300">
            Automated Insurance Claims
          </h2>
          <p className="text-gray-50 group-hover:text-white transition-colors duration-300">
            Submit claims in real-time and integrate seamlessly with insurance
            providers for faster reimbursement.
          </p>
        </div>

        {/* Card 4 */}
        <div className="max-w-xs mx-auto bg-black shadow-lg p-6 text-center transition-transform transform group hover:bg-[#00afee] hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <FaChartSimple className="h-12 w-12 text-[#fff] group-hover:text-white transition-colors duration-300" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300">
            Data Reports
          </h2>
          <p className="text-gray-50 group-hover:text-white transition-colors duration-300">
            Generate customizable reports for insights into patient demographics
            and trends, enabling informed decision-making.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
