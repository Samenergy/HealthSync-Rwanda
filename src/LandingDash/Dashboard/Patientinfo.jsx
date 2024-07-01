import React from "react";
import { TbPointFilled } from "react-icons/tb";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightScale } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdBloodtype } from "react-icons/md";
import { FaAllergies } from "react-icons/fa";
const PatientInfo = ({ patient }) => {
  return (
    <div>
      <div className="flex  justify-between w-3/4">
        <h1>
          <p className="font-bold text-4xl">Patients - {patient.name}</p>
        </h1>
        <div className=" flex items-center gap-5 font-bold text-md shadow-lg rounded-lg bg-white p-3 -mt-5">
          <div className="text-4xl">
            <img
              src={patient.image}
              alt=""
              className="rounded-full w-20 h-auto"
            />
          </div>
          <div>
            <p className="flex items-center -ml-2 ">
              <TbPointFilled className="text-[#00aeee] text-3xl" />{" "}
              {patient.name}
            </p>
            <p className="text-xs font-semibold">
              {patient.age}, {patient.gender}
            </p>

            <p className="text-xs font-semibold">{patient.contact}</p>
            <p className="text-xs font-semibold"> {patient.dob}</p>
          </div>
        </div>
      </div>
      <div className="max-w-md  bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-[#c0c3c9] flex items-center justify-between text-md font-light">
                <th className="flex items-center gap-2">
                  <GiBodyHeight className="text-2xl" /> Height
                </th>
                <th className="flex items-center gap-2">
                  <FaWeightScale className="text-2xl" /> Weight
                </th>
                <th className="flex items-center gap-2">
                  <IoDocumentTextSharp className="text-2xl" /> BMI
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex justify-between items-center text-3xl mt-2 text-[#00aeee]">
                <td>{patient.height}</td>
                <td>{patient.weight}</td>
                <td>{patient.bmi}</td>
              </tr>
            </tbody>
          </table>
          {/* <table className="min-w-full mt-5">
            <thead>
              <tr className="text-[#c0c3c9] flex items-center justify-between text-sm font-light">
                <th className="flex items-center gap-2">
                  <img src="./src/assets/icons8-blood-pressure-64.png" alt="" 
                  className="w-7 h-auto" /> Blood Pressure
                </th>
                <th className="flex items-center gap-2">
                  <MdBloodtype className="text-2xl" /> Blood type
                </th>
                <th className="flex items-center gap-2">
                  <FaAllergies className="text-2xl" /> Allergies
                </th>
              </tr>
              <tr>
                
              </tr>
            </thead>
            <tbody>
              <tr className="flex justify-between items-center text-3xl mt-2 text-[#00aeee]">
                <td>{patient.bloodPressure}</td>
                <td>{patient.bloodtype}</td>
                <td>{patient.bmi}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
