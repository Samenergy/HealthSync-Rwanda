import React, { useState, useEffect } from "react";
import {
  fetchDailyReport,
  fetchDoctorPerformanceReport,
  fetchServiceUtilizationReport,
  fetchFinancialReport,
  fetchQueueManagementReport,
  fetchPatientDemographicsReport,
} from "./Api";
import { FaMale, FaFemale } from "react-icons/fa";
// Utility function to fetch data based on report type
const fetchReportData = async (reportType) => {
  switch (reportType) {
    case "daily":
      return fetchDailyReport();
    case "doctor-performance":
      return fetchDoctorPerformanceReport();
    case "service-utilization":
      return fetchServiceUtilizationReport();
    case "financial":
      return fetchFinancialReport();
    case "queue-management":
      return fetchQueueManagementReport();
    case "patient-demographics":
      return fetchPatientDemographicsReport();
    default:
      throw new Error("Invalid report type");
  }
};

const Reports = () => {
  const [reportType, setReportType] = useState("daily");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReportData = async () => {
      setLoading(true);
      try {
        const response = await fetchReportData(reportType);
        console.log(response.data); // Log the response to check the data structure
        setReportData(response.data);
      } catch (err) {
        console.error("Failed to fetch report data:", err);
        setError("Failed to fetch report data");
      } finally {
        setLoading(false);
      }
    };

    getReportData();
  }, [reportType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderReportData = () => {
    switch (reportType) {
      case "daily":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Daily Report</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-2 px-4 border-b">Patient Name</th>
                  <th className="py-2 px-4 border-b">Doctor Name</th>
                  <th className="py-2 px-4 border-b">Hospital</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(reportData.dailyReport) &&
                  reportData.dailyReport.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        {item.Patient.name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.Doctor?.name || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.Hospital.hospitalName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>

              <h3 className="text-xl font-semibold mb-2 mt-5">Weekly Report</h3>

              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-2 px-4 border-b">Patient Name</th>
                  <th className="py-2 px-4 border-b">Doctor Name</th>
                  <th className="py-2 px-4 border-b">Hospital</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(reportData.dailyReport) &&
                  reportData.weeklyReport.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        {item.Patient.name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.Doctor?.name || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.Hospital.hospitalName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      case "doctor-performance":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Doctor Performance Report
            </h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-2 px-4 border-b">Doctor Name</th>
                  <th className="py-2 px-4 border-b">Specialization</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone Number</th>
                  <th className="py-2 px-4 border-b">Patient Count</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(reportData) &&
                  reportData.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">
                        {item.specialization}
                      </td>
                      <td className="py-2 px-4 border-b">{item.email}</td>
                      <td className="py-2 px-4 border-b">{item.phoneNumber}</td>
                      <td className="py-2 px-4 border-b">
                        {item.patientCount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      case "service-utilization":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Service Utilization Report
            </h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-2 px-4 border-b">Service</th>
                  <th className="py-2 px-4 border-b">Count</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(reportData) &&
                  reportData.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{item.service}</td>
                      <td className="py-2 px-4 border-b">
                        {item.serviceCount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      case "financial":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Financial Report</h3>

            <div className="p-4 ">
              <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
                <div className="flex flex-col bg-white items-center py-5 px-4 shadow-lg rounded-lg">
                  <span className="font-bold text-gray-700 text-2xl">
                    Total Patient Amount
                  </span>
                  <span className="text-gray-900 font-light text-5xl">
                    $ {reportData[0]?.totalPatientAmount || 0}
                  </span>
                </div>
                <div className="flex flex-col bg-white items-center py-5 px-4 shadow-lg rounded-lg">
                  <span className="font-bold text-gray-700 text-2xl">
                    Total Assurance Amount
                  </span>
                  <span className="text-gray-900 font-light text-5xl">
                    $ {reportData[0]?.totalAssuranceAmount || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "patient-demographics":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Patient Demographics Report
            </h3>

            <div className=" ">
              <div className="grid grid-cols-2 gap-4">
                {Array.isArray(reportData) && reportData.length > 0 ? (
                  reportData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center py-5 px-4 shadow-lg rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {item.gender === "Male" && (
                          <FaMale className="text-blue-500 text-3xl" />
                        )}
                        {item.gender === "Female" && (
                          <FaFemale className="text-pink-500 text-3xl" />
                        )}
                        <span className="font-bold text-gray-700 text-2xl">
                          {item.gender}
                        </span>
                      </div>
                      <span className="text-gray-900 font-light text-5xl">
                        {item.genderCount}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4 col-span-2">
                    No data available
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a report type</div>;
    }
  };

  return (
    <div className="text-sm">
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setReportType("daily")}
          className={`btn transition-colors duration-300 ease-in-out ${
            reportType === "daily"
              ? "bg-[#00afee] text-white px-4 py-2 rounded-lg shadow-md"
              : "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          }`}
        >
          Daily Report
        </button>
        <button
          onClick={() => setReportType("doctor-performance")}
          className={`btn transition-colors duration-300 ease-in-out ${
            reportType === "doctor-performance"
              ? "bg-[#00afee] text-white px-4 py-2 rounded-lg shadow-md"
              : "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          }`}
        >
          Doctor Performance
        </button>
        <button
          onClick={() => setReportType("service-utilization")}
          className={`btn transition-colors duration-300 ease-in-out ${
            reportType === "service-utilization"
              ? "bg-[#00afee] text-white px-4 py-2 rounded-lg shadow-md"
              : "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          }`}
        >
          Service Utilization
        </button>
        <button
          onClick={() => setReportType("financial")}
          className={`btn transition-colors duration-300 ease-in-out ${
            reportType === "financial"
              ? "bg-[#00afee] text-white px-4 py-2 rounded-lg shadow-md"
              : "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          }`}
        >
          Financial
        </button>

        <button
          onClick={() => setReportType("patient-demographics")}
          className={`btn transition-colors duration-300 ease-in-out ${
            reportType === "patient-demographics"
              ? "bg-[#00afee] text-white px-4 py-2 rounded-lg shadow-md"
              : "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          }`}
        >
          Patient Demographics
        </button>
      </div>
      {renderReportData()}
    </div>
  );
};

export default Reports;
